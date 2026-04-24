export type PKCEAuthorizationParams = {
  /** Usually `"code"` for the authorization code flow. */
  responseType: 'code' | string;
  clientId: string;
  redirectUri: string;
  scope: string;
  /**
   * Opaque value to correlate the callback; store alongside `code_verifier` so you can
   * look up the verifier on token exchange.
   */
  state: string;
  codeChallenge: string;
  codeChallengeMethod: 'S256' | string;
  /** OIDC: optional, bound into the `id_token`. */
  nonce?: string;
};

export type TokenAuthorizationCodeRequest = {
  grantType: 'authorization_code';
  code: string;
  redirectUri: string;
  clientId: string;
  /** The **same** `code_verifier` that produced `code_challenge` in the auth request. */
  codeVerifier: string;
  /**
   * Only for **confidential** clients; not used for pure public PKCE.
   * Some providers still require it for “Web” OAuth clients.
   */
  clientSecret?: string;
  extraFormFields?: Readonly<Record<string, string>>;
};
