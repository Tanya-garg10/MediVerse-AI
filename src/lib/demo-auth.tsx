import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type DemoUser = { name: string; email: string };

const STORAGE_KEY = "mediverse.demo.user";

/** Demo credentials — no backend, purely client-side for the product demo. */
export const DEMO_CREDENTIALS = { email: "demo@mediverse.ai", password: "demo1234" };

type AuthValue = {
  user: DemoUser | null;
  ready: boolean;
  signIn: (email: string, password: string) => { ok: boolean; error?: string };
  signUp: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  signInAsDemo: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

function nameFromEmail(email: string) {
  const raw = email.split("@")[0] ?? "Clinician";
  return raw.replace(/[._-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as DemoUser);
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: DemoUser | null) => {
    setUser(next);
    try {
      if (next) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      user,
      ready,
      signIn: (email, password) => {
        if (!email.trim() || !password) return { ok: false, error: "Enter your email and password." };
        if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
        persist({ name: nameFromEmail(email.trim()), email: email.trim() });
        return { ok: true };
      },
      signUp: (name, email, password) => {
        if (!name.trim()) return { ok: false, error: "Enter your full name." };
        if (!email.trim()) return { ok: false, error: "Enter your email." };
        if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
        persist({ name: name.trim(), email: email.trim() });
        return { ok: true };
      },
      signInAsDemo: () => persist({ name: "Dr. Demo User", email: DEMO_CREDENTIALS.email }),
      signOut: () => persist(null),
    }),
    [user, ready, persist],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useDemoAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useDemoAuth must be used inside DemoAuthProvider");
  return ctx;
}
