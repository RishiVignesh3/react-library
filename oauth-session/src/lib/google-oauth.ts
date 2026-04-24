/** Google OAuth 2.0 / OIDC (authorization code + PKCE). */
export const GOOGLE_OAUTH = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  userinfoEndpoint: 'https://openidconnect.googleapis.com/v1/userinfo',
  revokeEndpoint: 'https://oauth2.googleapis.com/revoke',
} as const;
