import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import {
  AUTH_SESSION_STORAGE_KEY,
  getStoredSession,
  isOidcConfigured,
  revokeAndClearSession,
  startSignInRedirect,
  type AuthSession,
} from './oidc';

type AuthValue = {
  user: AuthSession | null;
  isLoading: boolean;
  /** Re-reads the session from storage (e.g. after `completeSignInFromCurrentUrl`). */
  refreshUser: () => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
  configured: boolean;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const configured = isOidcConfigured();

  const loadUser = useCallback(() => {
    setUser(getStoredSession());
  }, []);

  useEffect(() => {
    if (!configured) {
      setIsLoading(false);
      return;
    }
    loadUser();
    setIsLoading(false);
  }, [configured, loadUser]);

  useEffect(() => {
    if (!configured || typeof window === 'undefined') {
      return;
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key !== AUTH_SESSION_STORAGE_KEY && e.key !== null) {
        return;
      }
      loadUser();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [configured, loadUser]);

  const refreshUser = useCallback(async () => {
    setError(null);
    loadUser();
  }, [loadUser]);

  const signIn = useCallback(async () => {
    if (!configured) {
      return;
    }
    setError(null);
    await startSignInRedirect();
  }, [configured]);

  const signOut = useCallback(async () => {
    if (!configured) {
      return;
    }
    setError(null);
    setUser(null);
    try {
      await revokeAndClearSession();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sign out failed');
    }
  }, [configured]);

  const value: AuthValue = {
    user,
    isLoading,
    refreshUser,
    signIn,
    signOut,
    error,
    configured,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
