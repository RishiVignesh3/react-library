import { createGooglePkceOauthSession } from '@org/oauth-session';

const oauth = createGooglePkceOauthSession({
  storageKeyPrefix: 'pkce-spa',
  getClientId: () => import.meta.env.VITE_OIDC_CLIENT_ID,
  getClientSecret: () => import.meta.env.VITE_OIDC_CLIENT_SECRET,
  getOidcPrompt: () => import.meta.env.VITE_OIDC_PROMPT,
  getTokenRefreshBufferSecRaw: () => import.meta.env.VITE_TOKEN_REFRESH_BUFFER_SEC,
  missingClientIdMessage:
    'Set VITE_OIDC_CLIENT_ID in pkce-spa/.env (Google OAuth 2.0 client ID).',
});

export const AUTH_SESSION_STORAGE_KEY = oauth.AUTH_SESSION_STORAGE_KEY;
export const GOOGLE_OAUTH = oauth.GOOGLE_OAUTH;
export const isOidcConfigured = oauth.isOidcConfigured;
export const getStoredSession = oauth.getStoredSession;
export const clearStoredSession = oauth.clearStoredSession;
export const persistSession = oauth.persistSession;
export const getTokenRefreshBufferSeconds = oauth.getTokenRefreshBufferSeconds;
export const refreshAccessTokenCoordinated = oauth.refreshAccessTokenCoordinated;
export const startSignInRedirect = oauth.startSignInRedirect;
export const completeSignInFromCurrentUrl = oauth.completeSignInFromCurrentUrl;
export const refreshAccessToken = oauth.refreshAccessToken;
export const revokeAndClearSession = oauth.revokeAndClearSession;

export type { AuthSession, AuthUserProfile } from '@org/oauth-session';
