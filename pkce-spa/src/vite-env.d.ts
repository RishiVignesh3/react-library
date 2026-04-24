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
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
