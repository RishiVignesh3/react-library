import {
  buildAuthorizationCodeTokenBody,
  buildAuthorizationUrl,
  buildRefreshTokenBody,
  createPkcePair,
} from '@org/pkce-identity';

import { GOOGLE_OAUTH } from './google-oauth';
import type { AuthSession, AuthUserProfile } from './types';

type PendingPkce = {
  state: string;
  codeVerifier: string;
  nonce: string;
};

const STORAGE_LOCK_TTL_MS = 60_000;
const STORAGE_LOCK_POLL_MS = 80;

export type CreateGooglePkceOauthSessionOptions = {
  /** e.g. `pkce-spa` → `pkce-spa:session`, `pkce-spa:pkce-pending`, … */
  storageKeyPrefix: string;
  getClientId: () => string | undefined;
  getClientSecret: () => string | undefined;
  getOidcPrompt: () => string | undefined;
  getTokenRefreshBufferSecRaw: () => string | undefined;
  /** Default `openid profile email`. */
  scope?: string;
  /** Path for `redirect_uri` callback; default `/signin-callback`. */
  redirectCallbackPath?: string;
  /** Error message when client id is missing; default generic env hint. */
  missingClientIdMessage?: string;
};

export type GooglePkceOauthSession = {
  /** Shared across tabs (see `storage` listener in the host app). */
  AUTH_SESSION_STORAGE_KEY: string;
  GOOGLE_OAUTH: typeof GOOGLE_OAUTH;
  isOidcConfigured: () => boolean;
  getStoredSession: () => AuthSession | null;
  clearStoredSession: () => void;
  persistSession: (session: AuthSession) => void;
  getTokenRefreshBufferSeconds: () => number;
  refreshAccessTokenCoordinated: (options?: {
    force?: boolean;
  }) => Promise<AuthSession | null>;
  startSignInRedirect: () => Promise<void>;
  completeSignInFromCurrentUrl: () => Promise<AuthSession>;
  refreshAccessToken: () => Promise<AuthSession>;
  revokeAndClearSession: () => Promise<void>;
};

function storageKeys(prefix: string) {
  const p = prefix.trim();
  if (!p) {
    throw new Error('storageKeyPrefix must be a non-empty string.');
  }
  return {
    session: `${p}:session`,
    pending: `${p}:pkce-pending`,
    refreshInFlight: `${p}:refresh-in-flight`,
    webLock: `${p}/oauth-token-refresh`,
  };
}

function sessionNeedsProactiveRefresh(
  session: AuthSession,
  bufferSec: number,
): boolean {
  if (!session.refreshToken) {
    return false;
  }
  const now = Math.floor(Date.now() / 1000);
  return session.expiresAt <= now + bufferSec;
}

function parseTokenError(tokenText: string): string | undefined {
  try {
    const j = JSON.parse(tokenText) as { error?: string };
    return typeof j.error === 'string' ? j.error : undefined;
  } catch {
    return undefined;
  }
}

export function createGooglePkceOauthSession(
  options: CreateGooglePkceOauthSessionOptions,
): GooglePkceOauthSession {
  const keys = storageKeys(options.storageKeyPrefix);
  const scope = options.scope ?? 'openid profile email';
  const redirectCallbackPath = options.redirectCallbackPath ?? '/signin-callback';
  const missingClientIdMessage =
    options.missingClientIdMessage ??
    'Set OIDC client ID in your application environment (e.g. VITE_OIDC_CLIENT_ID).';

  const getClientIdTrimmed = () => options.getClientId()?.trim();
  const getClientSecretTrimmed = () => options.getClientSecret()?.trim() || undefined;

  function requireClientId(): string {
    const id = getClientIdTrimmed();
    if (!id) {
      throw new Error(missingClientIdMessage);
    }
    return id;
  }

  function redirectUri(): string {
    return `${window.location.origin}${redirectCallbackPath}`;
  }

  function getStoredSession(): AuthSession | null {
    let raw = localStorage.getItem(keys.session);
    if (!raw) {
      const legacy = sessionStorage.getItem(keys.session);
      if (legacy) {
        sessionStorage.removeItem(keys.session);
        localStorage.setItem(keys.session, legacy);
        raw = legacy;
      }
    }
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      localStorage.removeItem(keys.session);
      return null;
    }
  }

  function clearStoredSession(): void {
    localStorage.removeItem(keys.session);
  }

  function persistSession(session: AuthSession): void {
    localStorage.setItem(keys.session, JSON.stringify(session));
  }

  function getTokenRefreshBufferSeconds(): number {
    const raw = options.getTokenRefreshBufferSecRaw()?.trim();
    if (!raw) {
      return 300;
    }
    const n = Number.parseInt(raw, 10);
    return Number.isFinite(n) && n >= 0 ? n : 300;
  }

  async function performRefreshTokenRequest(
    session: AuthSession,
  ): Promise<AuthSession> {
    const body = buildRefreshTokenBody({
      grantType: 'refresh_token',
      clientId: requireClientId(),
      refreshToken: session.refreshToken as string,
      clientSecret: getClientSecretTrimmed(),
    });

    const tokenRes = await fetch(GOOGLE_OAUTH.tokenEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    const tokenText = await tokenRes.text();
    if (!tokenRes.ok) {
      const oauthErr = parseTokenError(tokenText);
      if (oauthErr === 'invalid_grant') {
        clearStoredSession();
        throw new Error('Session expired or was revoked. Sign in again.');
      }
      throw new Error(
        `Token refresh failed (${tokenRes.status}): ${tokenText || tokenRes.statusText}`,
      );
    }

    let tokens: {
      access_token: string;
      id_token?: string;
      refresh_token?: string;
      expires_in: number;
    };
    try {
      tokens = JSON.parse(tokenText) as typeof tokens;
    } catch {
      throw new Error('Token response was not JSON.');
    }

    const next: AuthSession = {
      accessToken: tokens.access_token,
      idToken: tokens.id_token ?? session.idToken,
      refreshToken: tokens.refresh_token ?? session.refreshToken,
      expiresAt: Math.floor(Date.now() / 1000) + (tokens.expires_in ?? 3600),
      profile: session.profile,
    };
    persistSession(next);
    return next;
  }

  async function runAfterRefreshLock<T>(fn: () => Promise<T>): Promise<T> {
    if (typeof navigator !== 'undefined' && navigator.locks?.request) {
      return navigator.locks.request(keys.webLock, { mode: 'exclusive' }, fn);
    }

    const myId = crypto.randomUUID();
    const deadline = Date.now() + STORAGE_LOCK_TTL_MS * 3;

    while (Date.now() < deadline) {
      const raw = localStorage.getItem(keys.refreshInFlight);
      if (raw) {
        let until = 0;
        try {
          until = (JSON.parse(raw) as { until?: number }).until ?? 0;
        } catch {
          localStorage.removeItem(keys.refreshInFlight);
        }
        if (until > Date.now()) {
          await new Promise((r) => setTimeout(r, STORAGE_LOCK_POLL_MS));
          continue;
        }
        localStorage.removeItem(keys.refreshInFlight);
      }

      const lease = JSON.stringify({
        owner: myId,
        until: Date.now() + STORAGE_LOCK_TTL_MS,
      });
      localStorage.setItem(keys.refreshInFlight, lease);
      if (localStorage.getItem(keys.refreshInFlight) === lease) {
        try {
          return await fn();
        } finally {
          const cur = localStorage.getItem(keys.refreshInFlight);
          if (cur === lease) {
            localStorage.removeItem(keys.refreshInFlight);
          }
        }
      }
      await new Promise((r) => setTimeout(r, STORAGE_LOCK_POLL_MS));
    }

    throw new Error('Could not acquire token refresh lock (timeout).');
  }

  async function refreshInsideLock(opts: {
    force: boolean;
  }): Promise<AuthSession | null> {
    const bufferSec = getTokenRefreshBufferSeconds();
    const session = getStoredSession();
    if (!session?.refreshToken) {
      return null;
    }
    if (!opts.force && !sessionNeedsProactiveRefresh(session, bufferSec)) {
      return session;
    }
    return performRefreshTokenRequest(session);
  }

  async function refreshAccessTokenCoordinated(opts?: {
    force?: boolean;
  }): Promise<AuthSession | null> {
    const force = opts?.force ?? false;
    return runAfterRefreshLock(() => refreshInsideLock({ force }));
  }

  async function startSignInRedirect(): Promise<void> {
    const pair = await createPkcePair();
    const state = crypto.randomUUID();
    const nonce = crypto.randomUUID();
    const pending: PendingPkce = { state, codeVerifier: pair.codeVerifier, nonce };
    sessionStorage.setItem(keys.pending, JSON.stringify(pending));

    const url = buildAuthorizationUrl(
      GOOGLE_OAUTH.authorizationEndpoint,
      {
        responseType: 'code',
        clientId: requireClientId(),
        redirectUri: redirectUri(),
        scope,
        state,
        codeChallenge: pair.codeChallenge,
        codeChallengeMethod: 'S256',
        nonce,
      },
      {
        access_type: 'offline',
        prompt: options.getOidcPrompt()?.trim() || 'consent',
      },
    );
    window.location.assign(url);
  }

  async function completeSignInFromCurrentUrl(): Promise<AuthSession> {
    const params = new URLSearchParams(window.location.search);
    const oauthError = params.get('error');
    if (oauthError) {
      throw new Error(params.get('error_description') ?? oauthError);
    }
    const code = params.get('code');
    const state = params.get('state');
    if (!code || !state) {
      throw new Error('Missing authorization code or state.');
    }

    const raw = sessionStorage.getItem(keys.pending);
    if (!raw) {
      throw new Error('No PKCE state found; start sign-in again.');
    }
    let pending: PendingPkce;
    try {
      pending = JSON.parse(raw) as PendingPkce;
    } catch {
      sessionStorage.removeItem(keys.pending);
      throw new Error('Invalid PKCE state; start sign-in again.');
    }
    if (pending.state !== state) {
      throw new Error('OAuth state mismatch; start sign-in again.');
    }
    sessionStorage.removeItem(keys.pending);

    const body = buildAuthorizationCodeTokenBody({
      grantType: 'authorization_code',
      code,
      redirectUri: redirectUri(),
      clientId: requireClientId(),
      codeVerifier: pending.codeVerifier,
      clientSecret: getClientSecretTrimmed(),
    });

    const tokenRes = await fetch(GOOGLE_OAUTH.tokenEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    const tokenText = await tokenRes.text();
    if (!tokenRes.ok) {
      throw new Error(
        `Token exchange failed (${tokenRes.status}): ${tokenText || tokenRes.statusText}`,
      );
    }
    let tokens: {
      access_token: string;
      id_token?: string;
      refresh_token?: string;
      expires_in: number;
    };
    try {
      tokens = JSON.parse(tokenText) as typeof tokens;
    } catch {
      throw new Error('Token response was not JSON.');
    }

    const userinfoRes = await fetch(GOOGLE_OAUTH.userinfoEndpoint, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (!userinfoRes.ok) {
      throw new Error(
        `Userinfo request failed (${userinfoRes.status}): ${await userinfoRes.text()}`,
      );
    }
    const profile = (await userinfoRes.json()) as AuthUserProfile;

    const session: AuthSession = {
      accessToken: tokens.access_token,
      idToken: tokens.id_token,
      ...(tokens.refresh_token ? { refreshToken: tokens.refresh_token } : {}),
      expiresAt: Math.floor(Date.now() / 1000) + (tokens.expires_in ?? 3600),
      profile,
    };
    persistSession(session);
    return session;
  }

  async function refreshAccessToken(): Promise<AuthSession> {
    const next = await refreshAccessTokenCoordinated({ force: true });
    if (!next) {
      throw new Error(
        'No refresh token stored. Sign in again with offline access (consent).',
      );
    }
    return next;
  }

  async function revokeAndClearSession(): Promise<void> {
    const session = getStoredSession();
    clearStoredSession();
    const token = session?.refreshToken ?? session?.accessToken;
    if (!token) {
      return;
    }
    try {
      await fetch(GOOGLE_OAUTH.revokeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ token }).toString(),
      });
    } catch {
      // ignore network errors after local session is cleared
    }
  }

  return {
    AUTH_SESSION_STORAGE_KEY: keys.session,
    GOOGLE_OAUTH,
    isOidcConfigured: () => Boolean(getClientIdTrimmed()),
    getStoredSession,
    clearStoredSession,
    persistSession,
    getTokenRefreshBufferSeconds,
    refreshAccessTokenCoordinated,
    startSignInRedirect,
    completeSignInFromCurrentUrl,
    refreshAccessToken,
    revokeAndClearSession,
  };
}
