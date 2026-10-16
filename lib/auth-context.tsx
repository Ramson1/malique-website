"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { auth, type AuthUser } from "./api/auth";

// Non-httpOnly routing hint readable by Next middleware on THIS frontend host.
// The real session cookie (access_token) is set by the API on the backend host
// and is httpOnly + cross-site, so middleware here can't read it. We mirror auth
// state purely for redirects; the backend still enforces auth on every request.
function setAuthMarker() {
  if (typeof document === "undefined") return;
  document.cookie = "auth_state=1; path=/; max-age=2415600; samesite=lax";
}
function clearAuthMarker() {
  if (typeof document === "undefined") return;
  document.cookie = "auth_state=; path=/; max-age=0; samesite=lax";
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const profile = await auth.getProfile();
      setUser(profile);
      setAuthMarker();
    } catch {
      setUser(null);
      clearAuthMarker();
    }
  }, []);

  useEffect(() => {
    async function checkAuth() {
      try {
        const profile = await auth.getProfile();
        setUser(profile);
        setAuthMarker();
      } catch {
        setUser(null);
        clearAuthMarker();
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      await auth.login(email, password);
      const profile = await auth.getProfile();
      setUser(profile);
      setAuthMarker();
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      await auth.logout();
    } finally {
      setUser(null);
      clearAuthMarker();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
