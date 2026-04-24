import type { AuthSession } from '../auth/oidc';
import { useAuth } from '../auth/AuthProvider';

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
