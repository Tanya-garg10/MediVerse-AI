import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useDemoAuth } from "@/lib/demo-auth";

export function AuthButton({ onNavigate }: { onNavigate?: () => void }) {
  const { user, ready, signOut } = useDemoAuth();
  const navigate = useNavigate();

  if (!ready || !user) {
    return (
      <Link
        to="/login"
        onClick={onNavigate}
        className="gradient-surface hidden rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] sm:inline-flex"
      >
        Sign In
      </Link>
    );
  }

  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="hidden items-center gap-2 sm:flex">
      <Link
        to="/dashboard"
        onClick={onNavigate}
        className="glass flex items-center gap-2 rounded-full py-1.5 pr-3 pl-1.5 text-sm font-semibold"
        title={user.email}
      >
        <span className="gradient-surface grid h-7 w-7 place-items-center rounded-full text-xs text-primary-foreground">
          {initials || <ShieldCheck className="h-3.5 w-3.5" />}
        </span>
        <span className="max-w-[9rem] truncate">{user.name}</span>
      </Link>
      <button
        aria-label="Sign out"
        className="glass grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
        onClick={() => {
          signOut();
          onNavigate?.();
          toast.success("Signed out of the demo workspace.");
          navigate({ to: "/" });
        }}
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}

export function MobileAuth({ onNavigate }: { onNavigate?: () => void }) {
  const { user, signOut } = useDemoAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Link
        to="/login"
        onClick={onNavigate}
        className="gradient-surface w-full rounded-xl px-3 py-2 text-center text-sm font-semibold text-primary-foreground"
      >
        Sign In
      </Link>
    );
  }

  return (
    <button
      className="glass flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold"
      onClick={() => {
        signOut();
        onNavigate?.();
        toast.success("Signed out of the demo workspace.");
        navigate({ to: "/" });
      }}
    >
      <LogOut className="h-4 w-4" /> Sign out {user.name}
    </button>
  );
}
