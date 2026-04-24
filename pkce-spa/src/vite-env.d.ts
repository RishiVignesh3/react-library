/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Google OAuth 2.0 Web client ID (e.g. xxx.apps.googleusercontent.com).
   */
  readonly VITE_OIDC_CLIENT_ID: string;
  /**
   * Optional. Google "Web application" clients may require this on the token
   * request even with PKCE. From Google Cloud → Credentials → client → Client secret.
   */
  readonly VITE_OIDC_CLIENT_SECRET?: string;
  /**
   * OAuth `prompt` param (e.g. `consent`, `select_account`). Defaults to `consent`
   * so Google returns `refresh_token` on repeat sign-ins.
   */
  readonly VITE_OIDC_PROMPT?: string;
  /**
   * Seconds before `expiresAt` to trigger proactive token refresh (default 300).
   */
  readonly VITE_TOKEN_REFRESH_BUFFER_SEC?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
