import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Github, Linkedin, Mail, MapPin, Phone, Send, Twitter, Youtube } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/site/motion-kit";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact MediVerse AI — Sales, Support & Partnerships" },
      {
        name: "description",
        content:
          "Reach the MediVerse AI team by form, phone or email, find us on the map, or subscribe to the health-AI newsletter.",
      },
      { property: "og:title", content: "Contact MediVerse AI" },
      {
        property: "og:description",
        content: "Talk to sales, support or partnerships — we reply within one business day.",
      },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(120),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setForm({ name: "", email: "", subject: "", message: "" });
    toast.success("Message sent — we'll reply within one business day.");
  };

  const field =
    "glass w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Let's build better <span className="gradient-text">care together</span>
            </>
          }
          subtitle="Sales, support, research partnerships or press — we route your note to the right team."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <form onSubmit={submit} className="glass-card h-full space-y-4 p-8" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    className={`mt-1.5 ${field}`}
                    value={form.name}
                    maxLength={100}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  {errors['name'] ? (
                    <p className="mt-1 text-xs text-destructive">{errors['name']}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`mt-1.5 ${field}`}
                    value={form.email}
                    maxLength={255}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  {errors['email'] ? (
                    <p className="mt-1 text-xs text-destructive">{errors['email']}</p>
                  ) : null}
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <input
                  id="subject"
                  className={`mt-1.5 ${field}`}
                  value={form.subject}
                  maxLength={120}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
                {errors['subject'] ? (
                  <p className="mt-1 text-xs text-destructive">{errors['subject']}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className={`mt-1.5 resize-none ${field}`}
                  value={form.message}
                  maxLength={1000}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                {errors['message'] ? (
                  <p className="mt-1 text-xs text-destructive">{errors['message']}</p>
                ) : null}
              </div>
              <button className="gradient-surface inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground">
                <Send className="h-4 w-4" /> Send message
              </button>
            </form>
          </Reveal>

          <div className="grid gap-5">
            <Reveal delay={0.1}>
              <div className="glass-card space-y-4 p-7">
                {[
                  [Phone, "+91 80 4718 2200", "Mon–Sat, 9am–8pm IST"],
                  [Mail, "hello@mediverse.ai", "Replies within 1 business day"],
                  [MapPin, "Prestige Tech Park, Bengaluru", "560103, India"],
                ].map(([Icon, main, sub]) => {
                  const IconC = Icon as typeof Phone;
                  return (
                    <div key={main as string} className="flex min-w-0 items-start gap-3">
                      <span className="gradient-surface grid h-9 w-9 shrink-0 place-items-center rounded-xl text-primary-foreground">
                        <IconC className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{main as string}</p>
                        <p className="truncate text-xs text-muted-foreground">{sub as string}</p>
                      </div>
                    </div>
                  );
                })}
                <div className="flex gap-2 border-t border-border/60 pt-4">
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
            </Reveal>

            <Reveal delay={0.2}>
              <div className="glass-card overflow-hidden">
                <iframe
                  title="MediVerse AI headquarters map"
                  src="https://www.google.com/maps?q=Prestige%20Tech%20Park%20Bengaluru&output=embed"
                  className="h-64 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="glass-card p-7">
                <h3 className="font-semibold">Newsletter</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Monthly briefing on clinical AI. No spam.
                </p>
                <form
                  className="mt-4 flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const ok = z.string().email().safeParse(email.trim()).success;
                    if (!ok) {
                      toast.error("Enter a valid email address.");
                      return;
                    }
                    setEmail("");
                    toast.success("Subscribed. Welcome aboard!");
                  }}
                >
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@hospital.org"
                    aria-label="Email address"
                    maxLength={255}
                    className="glass min-w-0 flex-1 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button className="gradient-surface rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                    Subscribe
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
