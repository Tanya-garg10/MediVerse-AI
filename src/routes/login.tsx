import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Fingerprint, Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/motion-kit";
import { DEMO_CREDENTIALS, useDemoAuth } from "@/lib/demo-auth";


export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — MediVerse AI Secure Access" },
      {
        name: "description",
        content:
          "Secure sign-in to the MediVerse AI health workspace with encrypted sessions and two-factor protection.",
      },
      { property: "og:title", content: "Sign In — MediVerse AI" },
      { property: "og:description", content: "Secure access to your MediVerse AI workspace." },
    ],
  }),
  component: Login,
});

function Login() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, ready, signIn, signUp, signInAsDemo } = useDemoAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && user) navigate({ to: "/dashboard", replace: true });
  }, [ready, user, navigate]);

  const field =
    "glass w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring";

  const finish = (label: string) => {
    toast.success(`${label} — welcome to the MediVerse AI demo workspace.`);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="shell relative grid min-h-[calc(100vh-4rem)] place-items-center py-16">
        <Reveal className="w-full max-w-md">
          <div className="glass-card p-8">
            <div className="gradient-surface grid h-12 w-12 place-items-center rounded-2xl text-primary-foreground">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="mt-5 text-2xl font-bold">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Encrypted sessions · 2FA ready · HIPAA-aligned
            </p>

            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const res =
                  mode === "signin" ? signIn(email, password) : signUp(name, email, password);
                if (!res.ok) {
                  toast.error(res.error ?? "Please check your details.");
                  return;
                }
                finish(mode === "signin" ? "Signed in" : "Account created");
              }}
            >
              {mode === "signup" ? (
                <div>
                  <label htmlFor="fullname" className="text-sm font-medium">
                    Full name
                  </label>
                  <input
                    id="fullname"
                    className={`mt-1.5 ${field}`}
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              ) : null}
              <div>
                <label htmlFor="loginEmail" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative mt-1.5">
                  <Mail className="pointer-events-none absolute top-3.5 left-4 h-4 w-4 text-muted-foreground" />
                  <input
                    id="loginEmail"
                    type="email"
                    className={`${field} pl-11`}
                    placeholder="you@hospital.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute top-3.5 left-4 h-4 w-4 text-muted-foreground" />
                  <input
                    id="password"
                    type="password"
                    className={`${field} pl-11`}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button className="gradient-surface w-full rounded-full py-3 text-sm font-semibold text-primary-foreground">
                {mode === "signin" ? "Sign in securely" : "Create account"}
              </button>
              <button
                type="button"
                className="glass flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold"
                onClick={() => {
                  signInAsDemo();
                  finish("Demo access granted");
                }}
              >
                <Sparkles className="h-4 w-4" /> Continue with demo account
              </button>
              <button
                type="button"
                className="glass flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold"
                onClick={() => {
                  signInAsDemo();
                  finish("Biometric match verified");
                }}
              >
                <Fingerprint className="h-4 w-4" /> Continue with biometrics
              </button>
            </form>

            <p className="mt-5 rounded-xl border border-border/60 bg-muted/30 p-3 text-center text-xs text-muted-foreground">
              Demo credentials — {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}. This is a
              front-end demo; no real accounts are created.
            </p>


            <p className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "signin" ? "New to MediVerse?" : "Already have an account?"}{" "}
              <button
                className="font-semibold text-primary"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              >
                {mode === "signin" ? "Create an account" : "Sign in"}
              </button>
            </p>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              By continuing you agree to our{" "}
              <Link to="/terms" className="underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
