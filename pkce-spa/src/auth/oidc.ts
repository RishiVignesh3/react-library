import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

let userManager: UserManager | null = null;

export function isOidcConfigured(): boolean {
  return Boolean(import.meta.env.VITE_OIDC_CLIENT_ID?.trim());
}

/**
 * UserManager for Google (OIDC). Redirect URIs use `window.location.origin` so
 * they match what you list in Google Cloud → Credentials (e.g. http://localhost:4201/signin-callback).
 */
export function getUserManager(): UserManager {
  if (userManager) {
    return userManager;
  }

  const clientId = import.meta.env.VITE_OIDC_CLIENT_ID;
  if (!clientId) {
    throw new Error(
      'Set VITE_OIDC_CLIENT_ID in pkce-spa/.env (Google OAuth 2.0 client ID).',
    );
  }

  // Google "Web application" OAuth clients often still expect `client_secret` on the
  // token endpoint even with PKCE. Copy the secret from Google Cloud Console
  // (Credentials → your client). Prefer leaving this unset if you use a client
  // type that is public-only (e.g. some Desktop/SPA registrations).
  const clientSecret = import.meta.env.VITE_OIDC_CLIENT_SECRET?.trim();

  userManager = new UserManager({
    authority: 'https://accounts.google.com',
    client_id: clientId,
    ...(clientSecret ? { client_secret: clientSecret } : {}),
    redirect_uri: `${window.location.origin}/signin-callback`,
    post_logout_redirect_uri: `${window.location.origin}/`,
    response_type: 'code',
    scope: 'openid profile email',
    userStore: new WebStorageStateStore({ store: window.sessionStorage }),
    automaticSilentRenew: false,
  });

  return userManager;
}
