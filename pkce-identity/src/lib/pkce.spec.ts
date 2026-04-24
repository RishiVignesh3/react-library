import { describe, expect, it } from 'vitest';

import { base64UrlEncode } from './base64url';
import {
  createPkcePair,
  createS256CodeChallenge,
  generateCodeVerifier,
  PKCE_CODE_CHALLENGE_METHOD_S256,
} from './pkce';

describe('PKCE (RFC 7636)', () => {
  /**
   * Appendix B example — code_challenge for S256 with a fixed verifier.
   * @see https://www.rfc-editor.org/rfc/rfc7636#appendix-B
   */
  it('S256 challenge matches RFC 7636 appendix B', async () => {
    const verifier =
      'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk';
    const challenge = await createS256CodeChallenge(verifier);
    expect(challenge).toBe('E9Melhoa2OwvFrEMTJguCHfzKCDoUALLwsrLbLSaYnS');
  });

  it('generates verifier in allowed length (43 chars for 32 bytes b64url)', () => {
    const v = generateCodeVerifier(32);
    expect(v.length).toBe(43);
    expect(/^[A-Za-z0-9\-._~]+$/.test(v)).toBe(true);
  });

  it('createPkcePair returns S256 method constant', async () => {
    const pair = await createPkcePair();
    expect(pair.codeChallengeMethod).toBe(PKCE_CODE_CHALLENGE_METHOD_S256);
    expect(pair.codeVerifier.length).toBeGreaterThanOrEqual(43);
    expect(
      await createS256CodeChallenge(pair.codeVerifier),
    ).toBe(pair.codeChallenge);
  });

  it('base64UrlEncode for ASCII "abc"', () => {
    expect(base64UrlEncode(new TextEncoder().encode('abc'))).toBe('YWJj');
  });
});
