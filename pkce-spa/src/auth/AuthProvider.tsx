import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { User, UserManager } from 'oidc-client-ts';

import { getUserManager, isOidcConfigured } from './oidc';

type AuthValue = {
  user: User | null;
  isLoading: boolean;
  /** Re-reads the session from the UserManager (e.g. after `signinRedirectCallback`). */
  refreshUser: () => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
  configured: boolean;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const configured = isOidcConfigured();
  const manager = useMemo(
    () => (configured ? getUserManager() : null),
    [configured],
  );

  const loadUser = useCallback(async (um: UserManager) => {
    const u = await um.getUser();
    setUser(u);
  }, []);

  // Keep React state in sync when UserManager updates storage (e.g. sign-out calls removeUser).
  useEffect(() => {
    if (!manager) {
      return;
    }
    const unsubLoad = manager.events.addUserLoaded((u) => {
      setUser(u);
    });
    const unsubUnload = manager.events.addUserUnloaded(() => {
      setUser(null);
    });
    return () => {
      unsubLoad();
      unsubUnload();
    };
  }, [manager]);

  useEffect(() => {
    if (!manager) {
      setIsLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        if (!cancelled) {
          await loadUser(manager);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load session');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [manager, loadUser]);

  const refreshUser = useCallback(async () => {
    if (!manager) {
      return;
    }
    setError(null);
    try {
      await loadUser(manager);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load session');
    }
  }, [manager, loadUser]);

  const signIn = useCallback(async () => {
    if (!manager) {
      return;
    }
    setError(null);
    await manager.signinRedirect();
  }, [manager]);

  const signOut = useCallback(async () => {
    if (!manager) {
      return;
    }
    setError(null);
    // Update UI immediately; UserManager will also fire userUnloaded when storage clears
    setUser(null);
    try {
      // Redirects to Google (or) ends session, then may return to post_logout_redirect_uri
      await manager.signoutRedirect();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sign out failed');
      // Storage may be cleared already or not — sync with UserManager
      try {
        await loadUser(manager);
      } catch {
        // ignore
      }
    }
  }, [manager, loadUser]);

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
