import { Link } from "@tanstack/react-router";
import { Menu, X, Activity } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { AuthButton, MobileAuth } from "./AuthButton";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/features", label: "AI Features" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/why-us", label: "Why Us" },
  { to: "/pricing", label: "Pricing" },
  { to: "/testimonials", label: "Reviews" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-x-0 border-t-0">
        <nav className="shell flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="gradient-surface grid h-9 w-9 shrink-0 place-items-center rounded-xl text-primary-foreground">
              <Activity className="h-5 w-5" />
            </span>
            <span className="font-display truncate text-lg font-bold">
              MediVerse <span className="gradient-text">AI</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 xl:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <AuthButton />

            <button
              className="glass grid h-9 w-9 place-items-center rounded-full xl:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {open ? (
          <div className="shell grid grid-cols-2 gap-2 pb-4 xl:hidden">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="glass rounded-xl px-3 py-2 text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
            <div className="col-span-2 flex justify-center sm:hidden">
              <MobileAuth onNavigate={() => setOpen(false)} />
            </div>
          </div>

        ) : null}
      </div>
    </header>
  );
}
