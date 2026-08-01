import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Activity,
  Brain,
  HeartPulse,
  MessagesSquare,
  Play,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import { Counter, Reveal, SectionHeading, TypingText } from "@/components/site/motion-kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MediVerse AI — The Future of AI-Powered Healthcare" },
      {
        name: "description",
        content:
          "MediVerse AI delivers AI symptom triage, report analysis and real-time health monitoring for 50,000+ users across 120 hospitals.",
      },
      { property: "og:title", content: "MediVerse AI — The Future of AI-Powered Healthcare" },
      {
        property: "og:description",
        content: "AI symptom triage, report analysis and real-time monitoring, in one platform.",
      },
    ],
  }),
  component: Home,
});

const stats = [
  { value: 50, suffix: "K+", label: "Active Users", icon: Users },
  { value: 120, suffix: "", label: "Partner Hospitals", icon: Stethoscope },
  { value: 99.8, suffix: "%", label: "Model Accuracy", icon: Brain, decimals: 1 },
  { value: 24, suffix: "/7", label: "AI Support", icon: MessagesSquare },
];

function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
        <motion.div
          className="gradient-surface absolute -top-40 -left-32 h-96 w-96 rounded-full opacity-30 blur-[120px]"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="gradient-surface absolute -right-32 bottom-0 h-96 w-96 rounded-full opacity-25 blur-[130px]"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="shell relative py-24 text-center sm:py-32">
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Now with multimodal clinical reasoning
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mx-auto mt-6 max-w-4xl text-4xl leading-[1.08] font-bold sm:text-6xl lg:text-7xl">
              The Future of <span className="gradient-text">AI-Powered Healthcare</span> Starts
              Here.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              MediVerse AI unifies triage, diagnostics, monitoring and care coordination for{" "}
              <TypingText
                phrases={["patients", "doctors", "hospitals", "researchers"]}
              />
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                to="/login"
                className="gradient-surface rounded-full px-7 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                to="/dashboard"
                className="glass inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-colors hover:text-primary"
              >
                <Play className="h-4 w-4" /> Live Demo
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="glass-card p-6">
                  <s.icon className="mx-auto h-5 w-5 text-primary" />
                  <p className="font-display mt-3 text-3xl font-bold">
                    <Counter to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                  </p>
                  <p className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Platform"
            title={<>One clinical brain, every touchpoint</>}
            subtitle="From the first symptom to long-term monitoring, MediVerse keeps patients and care teams on the same intelligent surface."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Brain,
                title: "Diagnostic Intelligence",
                body: "Ensemble models trained on 40M de-identified encounters return differential diagnoses with confidence ranges and citations.",
              },
              {
                icon: HeartPulse,
                title: "Continuous Monitoring",
                body: "Wearable and device streams flow into a single vitals timeline with anomaly alerts routed to the right clinician.",
              },
              {
                icon: ShieldCheck,
                title: "Compliance by Default",
                body: "End-to-end encryption, granular consent, audit trails and regional data residency out of the box.",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1}>
                <div className="glass-card h-full p-7">
                  <span className="gradient-surface grid h-11 w-11 place-items-center rounded-xl text-primary-foreground">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="shell">
          <Reveal>
            <div className="glass-card relative overflow-hidden p-10 text-center sm:p-14">
              <div className="gradient-surface absolute inset-x-0 -top-24 mx-auto h-48 w-2/3 opacity-25 blur-[90px]" />
              <Activity className="relative mx-auto h-8 w-8 text-primary" />
              <h2 className="relative mt-5 text-3xl font-bold sm:text-4xl">
                Ready to modernise your care pathway?
              </h2>
              <p className="relative mx-auto mt-3 max-w-xl text-muted-foreground">
                Deploy MediVerse AI in under two weeks with white-glove onboarding for your
                clinical and IT teams.
              </p>
              <div className="relative mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  to="/pricing"
                  className="gradient-surface rounded-full px-7 py-3 text-sm font-semibold text-primary-foreground"
                >
                  View Pricing
                </Link>
                <Link to="/contact" className="glass rounded-full px-7 py-3 text-sm font-semibold">
                  Talk to Sales
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
