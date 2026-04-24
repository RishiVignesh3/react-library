import type { PKCEAuthorizationParams } from './types';

/**
 * Build the authorization endpoint URL (GET) for the OAuth 2.0
 * **authorization code** grant with PKCE.
 *
 * Typical `response_type` is `code` (Auth Code flow). The server should return
 * an authorization `code` in the query string on the `redirect_uri`.
 */
export function buildAuthorizationUrl(
  authorizationEndpoint: string,
  params: PKCEAuthorizationParams,
  extraQuery?: Readonly<Record<string, string>>,
): string {
  const url = new URL(authorizationEndpoint);
  const q = url.searchParams;
  q.set('response_type', params.responseType);
  q.set('client_id', params.clientId);
  q.set('redirect_uri', params.redirectUri);
  q.set('scope', params.scope);
  q.set('state', params.state);
  q.set('code_challenge', params.codeChallenge);
  q.set('code_challenge_method', params.codeChallengeMethod);
  if (params.nonce !== undefined) {
    q.set('nonce', params.nonce);
  }
  if (extraQuery) {
    for (const [k, v] of Object.entries(extraQuery)) {
      q.set(k, v);
    }
  }
  return url.toString();
}
