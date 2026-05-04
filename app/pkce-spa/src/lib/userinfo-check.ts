import { GOOGLE_OAUTH } from '@org/oauth-session';

export type UserinfoCheckResult = {
  ok: boolean;
  status: number;
  statusText: string;
  /** Short preview of the response body (JSON or error text). */
  bodyPreview: string;
};

/** Intentionally invalid — Google rejects this at the userinfo endpoint. */
export const DUMMY_BEARER_TOKEN = 'ya29.INVALID_DUMMY_TOKEN_REJECT_ME';

export async function fetchUserinfoWithToken(
  accessToken: string,
): Promise<UserinfoCheckResult> {
  const res = await fetch(GOOGLE_OAUTH.userinfoEndpoint, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const text = await res.text();
  const bodyPreview =
    text.length > 280 ? `${text.slice(0, 280)}…` : text;
  return {
    ok: res.ok,
    status: res.status,
    statusText: res.statusText,
    bodyPreview: bodyPreview || '(empty body)',
  };
}
