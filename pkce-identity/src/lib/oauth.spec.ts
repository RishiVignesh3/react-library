import { describe, expect, it } from 'vitest';

import { buildAuthorizationUrl } from './authorization';
import {
  buildAuthorizationCodeTokenBody,
  buildRefreshTokenBody,
} from './token-request';

describe('OAuth2 helpers', () => {
  it('buildAuthorizationUrl sets PKCE query parameters', () => {
    const url = buildAuthorizationUrl('https://accounts.example.com/o/oauth2/v2/auth', {
      responseType: 'code',
      clientId: 'cid',
      redirectUri: 'http://localhost/cb',
      scope: 'openid',
      state: 'st',
      codeChallenge: 'ch',
      codeChallengeMethod: 'S256',
    });
    const u = new URL(url);
    expect(u.searchParams.get('code_challenge')).toBe('ch');
    expect(u.searchParams.get('code_challenge_method')).toBe('S256');
    expect(u.searchParams.get('state')).toBe('st');
  });

  it('buildAuthorizationCodeTokenBody includes code_verifier', () => {
    const body = buildAuthorizationCodeTokenBody({
      grantType: 'authorization_code',
      code: 'authcode',
      redirectUri: 'http://localhost/cb',
      clientId: 'cid',
      codeVerifier: 'verifier',
    });
    const p = new URLSearchParams(body);
    expect(p.get('code_verifier')).toBe('verifier');
    expect(p.get('grant_type')).toBe('authorization_code');
  });

  it('buildRefreshTokenBody sets refresh grant', () => {
    const body = buildRefreshTokenBody({
      grantType: 'refresh_token',
      clientId: 'cid',
      refreshToken: 'rt',
    });
    const p = new URLSearchParams(body);
    expect(p.get('grant_type')).toBe('refresh_token');
    expect(p.get('refresh_token')).toBe('rt');
    expect(p.get('client_id')).toBe('cid');
  });
});
