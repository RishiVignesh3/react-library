import type {
  TokenAuthorizationCodeRequest,
  TokenRefreshRequest,
} from './types';

/**
 * `application/x-www-form-urlencoded` body for the token endpoint
 * (`grant_type=authorization_code` + PKCE `code_verifier`).
 */
export function buildAuthorizationCodeTokenBody(
  request: TokenAuthorizationCodeRequest,
): string {
  const params = new URLSearchParams();
  params.set('grant_type', request.grantType);
  params.set('code', request.code);
  params.set('redirect_uri', request.redirectUri);
  params.set('client_id', request.clientId);
  params.set('code_verifier', request.codeVerifier);
  if (request.clientSecret !== undefined && request.clientSecret !== '') {
    params.set('client_secret', request.clientSecret);
  }
  if (request.extraFormFields) {
    for (const [k, v] of Object.entries(request.extraFormFields)) {
      params.set(k, v);
    }
  }
  return params.toString();
}

/**
 * `application/x-www-form-urlencoded` body for `grant_type=refresh_token`.
 */
export function buildRefreshTokenBody(request: TokenRefreshRequest): string {
  const params = new URLSearchParams();
  params.set('grant_type', request.grantType);
  params.set('client_id', request.clientId);
  params.set('refresh_token', request.refreshToken);
  if (request.clientSecret !== undefined && request.clientSecret !== '') {
    params.set('client_secret', request.clientSecret);
  }
  if (request.extraFormFields) {
    for (const [k, v] of Object.entries(request.extraFormFields)) {
      params.set(k, v);
    }
  }
  return params.toString();
}
