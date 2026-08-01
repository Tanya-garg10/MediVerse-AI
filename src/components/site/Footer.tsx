import { Link } from "@tanstack/react-router";
import { Activity, Github, Linkedin, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border/60">
      <div className="shell grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="gradient-surface grid h-9 w-9 place-items-center rounded-xl text-primary-foreground">
              <Activity className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold">
              MediVerse <span className="gradient-text">AI</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Intelligent healthcare infrastructure for patients, doctors, hospitals and
            researchers.
          </p>
          <div className="mt-5 flex gap-2">
            {[Twitter, Linkedin, Github, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="glass grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol
          title="Quick Links"
          items={[
            ["Home", "/"],
            ["About", "/about"],
            ["Pricing", "/pricing"],
            ["FAQ", "/faq"],
          ]}
        />
        <FooterCol
          title="Services"
          items={[
            ["AI Features", "/features"],
            ["Health Dashboard", "/dashboard"],
            ["Why MediVerse", "/why-us"],
            ["Contact", "/contact"],
          ]}
        />
        <FooterCol
          title="Legal"
          items={[
            ["Privacy Policy", "/privacy"],
            ["Terms of Service", "/terms"],
            ["Sign In", "/login"],
          ]}
        />
      </div>
      <div className="border-t border-border/60">
        <div className="shell flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 MediVerse AI. All rights reserved.</p>
          <p>HIPAA-ready · ISO 27001 · Built for clinical teams</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wide uppercase">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {items.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="transition-colors hover:text-primary">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
