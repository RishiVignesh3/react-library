import type { User } from 'oidc-client-ts';

import { useAuth } from '../auth/AuthProvider';

function formatProfileName(user: User) {
  const p = user.profile;
  if (p && typeof p === 'object') {
    if ('email' in p && typeof p['email'] === 'string' && p['email']) {
      return p['email'];
    }
    if ('name' in p && typeof p['name'] === 'string' && p['name']) {
      return p['name'];
    }
  }
  if (p && typeof p === 'object' && 'sub' in p && typeof p['sub'] === 'string') {
    return p['sub'];
  }
  return 'Signed in';
}

export function HomePage() {
  const { user, isLoading, signIn, signOut, error, configured } = useAuth();

  if (!configured) {
    return (
      <div>
        <h1>pkce-spa</h1>
        <p>
          Add <code>pkce-spa/.env</code> with{' '}
          <code>VITE_OIDC_CLIENT_ID=…</code> (from Google Cloud OAuth client).
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <p>Loading session…</p>;
  }

  return (
    <div>
      <h1>pkce-spa</h1>
      {error ? (
        <p role="alert" style={{ color: 'var(--ifm-color-danger, #b91c1c)' }}>
          {error}
        </p>
      ) : null}
      {user ? (
        <>
          <p>
            Signed in as{' '}
            <strong>{formatProfileName(user)}</strong>
          </p>
          <button type="button" onClick={() => void signOut()}>
            Sign out
          </button>
        </>
      ) : (
        <button type="button" onClick={() => void signIn()}>
          Sign in with Google
        </button>
      )}
    </div>
  );
}
