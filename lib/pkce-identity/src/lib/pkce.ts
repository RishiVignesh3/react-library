import { base64UrlEncode } from './base64url';

/**
 * Per RFC 7636: `code_verifier` is 43–128 characters from the
 * `[A-Z] / [a-z] / [0-9] / "-" / "." / "_" / "~"` set.
 *
 * This implementation uses 32 random bytes encoded as base64url (no padding),
 * which produces a 43‑character string (the minimum length allowed).
 */
export function generateCodeVerifier(entropyBytes = 32): string {
  if (entropyBytes < 1) {
    throw new RangeError('entropyBytes must be at least 1');
  }
  const bytes = new Uint8Array(entropyBytes);
  getCrypto().getRandomValues(bytes);
  return base64UrlEncode(bytes);
}

/**
 * `code_challenge` = BASE64URL( SHA256( ASCII( code_verifier ) ) ) (RFC 7636, `S256`).
 */
export async function createS256CodeChallenge(
  codeVerifier: string,
): Promise<string> {
  const digest = await getCrypto().subtle.digest(
    'SHA-256',
    new TextEncoder().encode(codeVerifier),
  );
  return base64UrlEncode(new Uint8Array(digest));
}

/**
 * One-step helper: new verifier + S256 challenge for the authorization request.
 */
export async function createPkcePair(entropyBytes?: number): Promise<{
  codeVerifier: string;
  codeChallenge: string;
  codeChallengeMethod: 'S256';
}> {
  const codeVerifier = generateCodeVerifier(entropyBytes);
  const codeChallenge = await createS256CodeChallenge(codeVerifier);
  return {
    codeVerifier,
    codeChallenge,
    codeChallengeMethod: 'S256',
  };
}

function getCrypto() {
  if (typeof globalThis.crypto === 'undefined' || !globalThis.crypto.subtle) {
    throw new Error(
      'Web Crypto API (globalThis.crypto.subtle) is required for PKCE S256. Use a modern browser or Node.js 20+ with global crypto.',
    );
  }
  return globalThis.crypto;
}

export const PKCE_CODE_CHALLENGE_METHOD_S256 = 'S256' as const;
