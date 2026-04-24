import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../auth/AuthProvider';
import { getUserManager, isOidcConfigured } from '../auth/oidc';

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
        const manager = getUserManager();
        await manager.signinRedirectCallback();
        // Session is stored by the client; re-fetch so AuthContext gets `user` before we navigate
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

  if (message) {
    return (
      <p role="alert" style={{ color: 'var(--ifm-color-danger, #b91c1c)' }}>
        {message}
      </p>
    );
  }

  return <p>Completing sign-in…</p>;
}
