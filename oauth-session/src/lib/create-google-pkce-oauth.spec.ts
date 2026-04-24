import { describe, expect, it } from 'vitest';

import { GOOGLE_OAUTH } from './google-oauth';
import { createGooglePkceOauthSession } from './create-google-pkce-oauth';

const baseOptions = () =>
  ({
    storageKeyPrefix: 'test-app',
    getClientId: () => undefined as string | undefined,
    getClientSecret: () => undefined as string | undefined,
    getOidcPrompt: () => undefined as string | undefined,
    getTokenRefreshBufferSecRaw: () => undefined as string | undefined,
  }) as const;

describe('createGooglePkceOauthSession', () => {
  it('exposes stable Google endpoints on the instance', () => {
    const api = createGooglePkceOauthSession(baseOptions());
    expect(api.GOOGLE_OAUTH).toBe(GOOGLE_OAUTH);
    expect(api.GOOGLE_OAUTH.tokenEndpoint).toContain('googleapis');
  });

  it('derives AUTH_SESSION_STORAGE_KEY from prefix', () => {
    const api = createGooglePkceOauthSession(baseOptions());
    expect(api.AUTH_SESSION_STORAGE_KEY).toBe('test-app:session');
  });

  it('reports not configured when client id is absent', () => {
    const api = createGooglePkceOauthSession(baseOptions());
    expect(api.isOidcConfigured()).toBe(false);
  });

  it('reports configured when client id is present', () => {
    const api = createGooglePkceOauthSession({
      ...baseOptions(),
      getClientId: () => '  id  ',
    });
    expect(api.isOidcConfigured()).toBe(true);
  });

  it('defaults token refresh buffer to 300s', () => {
    const api = createGooglePkceOauthSession(baseOptions());
    expect(api.getTokenRefreshBufferSeconds()).toBe(300);
  });

  it('parses token refresh buffer from raw getter', () => {
    const api = createGooglePkceOauthSession({
      ...baseOptions(),
      getTokenRefreshBufferSecRaw: () => '120',
    });
    expect(api.getTokenRefreshBufferSeconds()).toBe(120);
  });

  it('falls back to 300 when buffer raw is invalid', () => {
    const api = createGooglePkceOauthSession({
      ...baseOptions(),
      getTokenRefreshBufferSecRaw: () => 'nope',
    });
    expect(api.getTokenRefreshBufferSeconds()).toBe(300);
  });
});
