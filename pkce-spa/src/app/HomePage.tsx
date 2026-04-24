import { useCallback, useState } from 'react';

import {
  Alert,
  Badge,
  Button,
  ButtonGrid,
  ButtonGridCell,
  Card,
  Code,
  Divider,
  EndpointBlock,
  PageHeader,
  ResultCallout,
  Section,
  Shell,
  SplitRow,
  Text,
  type ResultCalloutTone,
} from '@org/ui';

import type { AuthSession } from '../auth/oidc';
import { GOOGLE_OAUTH, refreshAccessTokenCoordinated } from '../auth/oidc';
import { useAuth } from '../auth/AuthProvider';
import {
  DUMMY_BEARER_TOKEN,
  fetchUserinfoWithToken,
  type UserinfoCheckResult,
} from '../lib/userinfo-check';

function formatProfileName(session: AuthSession) {
  const p = session.profile;
  if (p.email) {
    return p.email;
  }
  if (p.name) {
    return p.name;
  }
  return p.sub || 'Signed in';
}

function userinfoToCallout(
  label: string,
  result: UserinfoCheckResult,
  expectRejection: boolean,
): {
  title: string;
  summary: string;
  tone: ResultCalloutTone;
  body: string;
} {
  const rejectedAsExpected = expectRejection && !result.ok;
  const passed = expectRejection ? rejectedAsExpected : result.ok;
  let summary: string;
  let tone: ResultCalloutTone;
  if (expectRejection) {
    summary = rejectedAsExpected
      ? `Rejected as expected — ${result.status} ${result.statusText}`
      : result.ok
        ? 'Unexpected: server accepted the dummy token'
        : `Rejected (${result.status}) — see response below`;
    tone = passed ? 'success' : result.ok ? 'danger' : 'warning';
  } else {
    summary = result.ok
      ? `Success — ${result.status} ${result.statusText}`
      : `Failed — ${result.status} ${result.statusText}`;
    tone = result.ok ? 'success' : 'danger';
  }
  return { title: label, summary, tone, body: result.bodyPreview };
}

export function HomePage() {
  const { user, isLoading, signIn, signOut, error, configured, refreshUser } =
    useAuth();
  const [realResult, setRealResult] = useState<UserinfoCheckResult | null>(
    null,
  );
  const [dummyResult, setDummyResult] = useState<UserinfoCheckResult | null>(
    null,
  );
  const [pendingReal, setPendingReal] = useState(false);
  const [pendingDummy, setPendingDummy] = useState(false);
  const [pendingRefresh, setPendingRefresh] = useState(false);
  const [refreshError, setRefreshError] = useState<string | null>(null);

  const runValidTokenCheck = useCallback(async () => {
    if (!user?.accessToken) {
      return;
    }
    setRealResult(null);
    setPendingReal(true);
    try {
      setRealResult(await fetchUserinfoWithToken(user.accessToken));
    } finally {
      setPendingReal(false);
    }
  }, [user?.accessToken]);

  const runDummyTokenCheck = useCallback(async () => {
    setDummyResult(null);
    setPendingDummy(true);
    try {
      setDummyResult(await fetchUserinfoWithToken(DUMMY_BEARER_TOKEN));
    } finally {
      setPendingDummy(false);
    }
  }, []);

  const runRefreshToken = useCallback(async () => {
    setRefreshError(null);
    setPendingRefresh(true);
    try {
      const next = await refreshAccessTokenCoordinated({ force: true });
      if (!next) {
        setRefreshError(
          'No refresh token stored. Sign in again with offline access.',
        );
        return;
      }
      await refreshUser();
    } catch (e) {
      setRefreshError(
        e instanceof Error ? e.message : 'Could not refresh access token',
      );
    } finally {
      setPendingRefresh(false);
    }
  }, [refreshUser]);

  if (!configured) {
    return (
      <Shell>
        <PageHeader
          title="pkce-spa"
          badge={<Badge tone="accent">OAuth · PKCE</Badge>}
        />
        <Card>
          <Text variant="muted">
            Add <Code>pkce-spa/.env</Code> with{' '}
            <Code>VITE_OIDC_CLIENT_ID=…</Code> (Google Cloud OAuth client).
          </Text>
        </Card>
      </Shell>
    );
  }

  if (isLoading) {
    return (
      <Shell>
        <PageHeader
          title="pkce-spa"
          badge={<Badge tone="accent">OAuth · PKCE</Badge>}
        />
        <Card>
          <Text variant="muted">Loading session…</Text>
        </Card>
      </Shell>
    );
  }

  return (
    <Shell>
      <PageHeader
        title="pkce-spa"
        badge={<Badge tone="accent">OAuth · PKCE</Badge>}
      />
      <Card>
        {error ? <Alert variant="error">{error}</Alert> : null}
        {refreshError ? (
          <Alert variant="error">{refreshError}</Alert>
        ) : null}
        {user ? (
          <>
            <SplitRow
              main={
                <div>
                  <Text variant="label">Signed in</Text>
                  <Text variant="lead">{formatProfileName(user)}</Text>
                </div>
              }
              actions={
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    variant="secondary"
                    disabled={!user.refreshToken || pendingRefresh}
                    title={
                      user.refreshToken
                        ? 'Request new access token from Google'
                        : 'No refresh token — sign in again with offline access'
                    }
                    onClick={() => void runRefreshToken()}
                  >
                    {pendingRefresh ? 'Refreshing…' : 'Refresh access token'}
                  </Button>
                  <Button variant="danger" onClick={() => void signOut()}>
                    Sign out
                  </Button>
                </div>
              }
            />
            {!user.refreshToken ? (
              <Text variant="small">
                Refresh is unavailable until you sign in with a refresh token
                (offline access / consent).
              </Text>
            ) : null}

            <Divider />

            <Section
              title="Token vs API"
              description="Calls Google OIDC userinfo — the same endpoint used after login. Your access token should return profile JSON; a fake token should be rejected."
              headingLevel={2}
            >
              <EndpointBlock url={GOOGLE_OAUTH.userinfoEndpoint} />

              <ButtonGrid>
                <ButtonGridCell>
                  <Button
                    variant="positive"
                    fullWidth
                    disabled={pendingReal}
                    onClick={() => void runValidTokenCheck()}
                  >
                    {pendingReal ? 'Calling…' : 'Call API with your access token'}
                  </Button>
                  {pendingReal ? (
                    <Text variant="small">Request in flight…</Text>
                  ) : null}
                </ButtonGridCell>
                <ButtonGridCell>
                  <Button
                    variant="caution"
                    fullWidth
                    disabled={pendingDummy}
                    onClick={() => void runDummyTokenCheck()}
                  >
                    {pendingDummy ? 'Calling…' : 'Call API with invalid token'}
                  </Button>
                  {pendingDummy ? (
                    <Text variant="small">Request in flight…</Text>
                  ) : null}
                </ButtonGridCell>
              </ButtonGrid>

              {realResult ? (
                <ResultCallout
                  {...userinfoToCallout(
                    'Your access token',
                    realResult,
                    false,
                  )}
                />
              ) : null}
              {dummyResult ? (
                <ResultCallout
                  {...userinfoToCallout(
                    'Dummy token (expect rejection)',
                    dummyResult,
                    true,
                  )}
                />
              ) : null}
            </Section>
          </>
        ) : (
          <>
            <Text variant="muted">
              Sign in to store an access token, then verify it against Google
              userinfo.
            </Text>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <Button variant="primary" size="lg" onClick={() => void signIn()}>
                Sign in with Google
              </Button>
            </div>

            <Divider />

            <Section
              title="Reject invalid token"
              description="You can test the API without signing in — the dummy bearer token should be rejected."
              headingLevel={2}
            >
              <EndpointBlock url={GOOGLE_OAUTH.userinfoEndpoint} />
              <Button
                variant="caution"
                fullWidth
                disabled={pendingDummy}
                onClick={() => void runDummyTokenCheck()}
              >
                {pendingDummy ? 'Calling…' : 'Call API with invalid token'}
              </Button>
              {pendingDummy ? (
                <Text variant="small">Request in flight…</Text>
              ) : null}
              {dummyResult ? (
                <ResultCallout
                  {...userinfoToCallout(
                    'Dummy token (expect rejection)',
                    dummyResult,
                    true,
                  )}
                />
              ) : null}
            </Section>
          </>
        )}
      </Card>
    </Shell>
  );
}
