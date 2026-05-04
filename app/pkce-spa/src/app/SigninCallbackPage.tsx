import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Alert, Card, PageHeader, Shell, Text } from '@org/ui';

import { useAuth } from '../auth/AuthProvider';
import {
  completeSignInFromCurrentUrl,
  isOidcConfigured,
} from '../auth/oidc';

export function SigninCallbackPage() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOidcConfigured()) {
      setMessage('Missing VITE_OIDC_CLIENT_ID. Configure pkce-spa/.env first.');
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        await completeSignInFromCurrentUrl();
        await refreshUser();
        if (!cancelled) {
          navigate('/', { replace: true });
        }
      } catch (e) {
        if (!cancelled) {
          setMessage(
            e instanceof Error ? e.message : 'Sign-in callback failed',
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate, refreshUser]);

  return (
    <Shell>
      <PageHeader title="Sign-in" />
      <Card>
        {message ? (
          <Alert variant="error">{message}</Alert>
        ) : (
          <Text variant="muted">Completing sign-in…</Text>
        )}
      </Card>
    </Shell>
  );
}
