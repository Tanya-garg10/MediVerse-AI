import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/site/motion-kit";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — MediVerse AI Plans for Patients & Hospitals" },
      {
        name: "description",
        content:
          "Free forever for individuals, Pro at $19/month for unlimited AI diagnostics, and custom Enterprise deployments for hospitals.",
      },
      { property: "og:title", content: "Pricing — MediVerse AI" },
      {
        property: "og:description",
        content: "Free, Pro and Enterprise plans for patients, clinicians and hospitals.",
      },
    ],
  }),
  component: Pricing,
});

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/forever",
    blurb: "For individuals starting their health journey.",
    features: [
      "AI symptom checker (5/month)",
      "Personal health dashboard",
      "Medicine reminders",
      "Health passport",
      "Community support",
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    blurb: "For patients who want the full AI care loop.",
    features: [
      "Unlimited AI symptom checks",
      "Medical report analyzer",
      "Disease risk prediction",
      "Real-time device monitoring",
      "Priority appointment booking",
      "24/7 AI chat assistant",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    blurb: "For hospitals, insurers and research groups.",
    features: [
      "Everything in Pro, org-wide",
      "EHR / HL7 FHIR integration",
      "Cohort analytics & research API",
      "On-prem or regional residency",
      "Dedicated clinical success team",
      "99.99% uptime SLA",
    ],
    featured: false,
  },
];

function Pricing() {
  return (
    <div className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Plans that scale with <span className="gradient-text">your care</span>
            </>
          }
          subtitle="No per-consult fees. Cancel anytime. Public hospitals get 60% off Enterprise."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div
                className={`glass-card relative h-full p-8 ${p.featured ? "ring-2 ring-primary" : ""}`}
              >
                {p.featured ? (
                  <span className="gradient-surface absolute -top-3 left-8 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold text-primary-foreground">
                    <Sparkles className="h-3 w-3" /> Most popular
                  </span>
                ) : null}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
                <p className="mt-6 flex items-end gap-1">
                  <span className="font-display text-4xl font-bold">{p.price}</span>
                  <span className="pb-1 text-sm text-muted-foreground">{p.period}</span>
                </p>
                <Link
                  to={p.name === "Enterprise" ? "/contact" : "/login"}
                  className={`mt-6 block rounded-full py-3 text-center text-sm font-semibold ${
                    p.featured
                      ? "gradient-surface text-primary-foreground"
                      : "glass hover:text-primary"
                  }`}
                >
                  {p.name === "Enterprise" ? "Contact sales" : "Get started"}
                </Link>
                <ul className="mt-7 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
