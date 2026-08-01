import { createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/site/motion-kit";

export const Route = createFileRoute("/why-us")({
  head: () => ({
    meta: [
      { title: "Why Choose MediVerse AI — Traditional Care vs AI Care" },
      {
        name: "description",
        content:
          "Compare traditional healthcare with MediVerse AI: faster diagnosis, AI assistance, secure data, real-time monitoring, smart reports and affordability.",
      },
      { property: "og:title", content: "Why Choose MediVerse AI" },
      {
        property: "og:description",
        content: "Traditional healthcare vs MediVerse AI, compared line by line.",
      },
    ],
  }),
  component: WhyUs,
});

const rows = [
  ["Faster Diagnosis", "3–7 day turnaround for specialist review", "Ranked differential in under 30 seconds"],
  ["AI Assistance", "No decision support at the point of care", "Explainable AI copilot with citations"],
  ["Secure Data", "Paper files and unencrypted email", "AES-256 at rest, consent-gated sharing"],
  ["Real-Time Monitoring", "Vitals only during visits", "Continuous device streams with alerting"],
  ["Smart Reports", "Dense jargon, no context", "Plain-language summaries with flagged values"],
  ["Affordable Healthcare", "High per-consult cost", "Free tier + $19/mo unlimited AI diagnostics"],
] as const;

function WhyUs() {
  return (
    <div className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Why choose us"
          title={
            <>
              Traditional care vs <span className="gradient-text">MediVerse AI</span>
            </>
          }
          subtitle="Same clinicians, radically better instrumentation around them."
        />

        <div className="mt-12 space-y-4">
          {rows.map(([label, before, after], i) => (
            <Reveal key={label} delay={i * 0.06}>
              <div className="grid gap-4 md:grid-cols-[220px_1fr_1fr] md:items-stretch">
                <div className="glass flex items-center rounded-2xl px-5 py-4 font-semibold">
                  {label}
                </div>
                <div className="glass-card flex items-start gap-3 p-5 opacity-70">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-destructive/20 text-destructive">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="text-xs tracking-wide text-muted-foreground uppercase">
                      Traditional
                    </p>
                    <p className="mt-1 text-sm">{before}</p>
                  </div>
                </div>
                <div className="glass-card flex items-start gap-3 p-5">
                  <span className="gradient-surface mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-primary-foreground">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="text-xs tracking-wide text-primary uppercase">MediVerse AI</p>
                    <p className="mt-1 text-sm">{after}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
