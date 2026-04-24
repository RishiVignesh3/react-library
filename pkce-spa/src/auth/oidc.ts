import {
  buildAuthorizationCodeTokenBody,
  buildAuthorizationUrl,
  createPkcePair,
} from '@org/pkce-identity';

/** Shared across tabs (see `storage` listener in AuthProvider). */
export const AUTH_SESSION_STORAGE_KEY = 'pkce-spa:session';
const STORAGE_PENDING = 'pkce-spa:pkce-pending';

/** Google OAuth 2.0 / OIDC (authorization code + PKCE). */
export const GOOGLE_OAUTH = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  userinfoEndpoint: 'https://openidconnect.googleapis.com/v1/userinfo',
  revokeEndpoint: 'https://oauth2.googleapis.com/revoke',
} as const;

export type AuthUserProfile = {
  sub: string;
  email?: string;
  name?: string;
};

export type AuthSession = {
  accessToken: string;
  idToken?: string;
  /** Unix seconds */
  expiresAt: number;
  profile: AuthUserProfile;
};

type PendingPkce = {
  state: string;
  codeVerifier: string;
  nonce: string;
};

export function isOidcConfigured(): boolean {
  return Boolean(import.meta.env.VITE_OIDC_CLIENT_ID?.trim());
}

function redirectUri(): string {
  return `${window.location.origin}/signin-callback`;
}

function clientId(): string {
  const id = import.meta.env.VITE_OIDC_CLIENT_ID?.trim();
  if (!id) {
    throw new Error(
      'Set VITE_OIDC_CLIENT_ID in pkce-spa/.env (Google OAuth 2.0 client ID).',
    );
  }
  return id;
}

function clientSecret(): string | undefined {
  const s = import.meta.env.VITE_OIDC_CLIENT_SECRET?.trim();
  return s || undefined;
}

export function getStoredSession(): AuthSession | null {
  let raw = localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
  if (!raw) {
    const legacy = sessionStorage.getItem(AUTH_SESSION_STORAGE_KEY);
    if (legacy) {
      sessionStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
      localStorage.setItem(AUTH_SESSION_STORAGE_KEY, legacy);
      raw = legacy;
    }
  }
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    return null;
  }
}

export function clearStoredSession(): void {
  localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
}

/**
 * Starts the authorization code + PKCE redirect (stores verifier in sessionStorage).
 */
export async function startSignInRedirect(): Promise<void> {
  const pair = await createPkcePair();
  const state = crypto.randomUUID();
  const nonce = crypto.randomUUID();
  const pending: PendingPkce = { state, codeVerifier: pair.codeVerifier, nonce };
  sessionStorage.setItem(STORAGE_PENDING, JSON.stringify(pending));

  const url = buildAuthorizationUrl(
    GOOGLE_OAUTH.authorizationEndpoint,
    {
      responseType: 'code',
      clientId: clientId(),
      redirectUri: redirectUri(),
      scope: 'openid profile email',
      state,
      codeChallenge: pair.codeChallenge,
      codeChallengeMethod: 'S256',
      nonce,
    },
  );
  window.location.assign(url);
}

/**
 * Completes login from the `/signin-callback` query string; persists session.
 */
export async function completeSignInFromCurrentUrl(): Promise<AuthSession> {
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

  const raw = sessionStorage.getItem(STORAGE_PENDING);
  if (!raw) {
    throw new Error('No PKCE state found; start sign-in again.');
  }
  let pending: PendingPkce;
  try {
    pending = JSON.parse(raw) as PendingPkce;
  } catch {
    sessionStorage.removeItem(STORAGE_PENDING);
    throw new Error('Invalid PKCE state; start sign-in again.');
  }
  if (pending.state !== state) {
    throw new Error('OAuth state mismatch; start sign-in again.');
  }
  sessionStorage.removeItem(STORAGE_PENDING);

  const body = buildAuthorizationCodeTokenBody({
    grantType: 'authorization_code',
    code,
    redirectUri: redirectUri(),
    clientId: clientId(),
    codeVerifier: pending.codeVerifier,
    clientSecret: clientSecret(),
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
    expiresAt: Math.floor(Date.now() / 1000) + (tokens.expires_in ?? 3600),
    profile,
  };
  localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
  return session;
}

/**
 * Revokes the access token at Google (best effort) and clears the local session.
 */
export async function revokeAndClearSession(): Promise<void> {
  const session = getStoredSession();
  clearStoredSession();
  if (!session?.accessToken) {
    return;
  }
  try {
    await fetch(GOOGLE_OAUTH.revokeEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ token: session.accessToken }).toString(),
    });
  } catch {
    // ignore network errors after local session is cleared
  }
}
