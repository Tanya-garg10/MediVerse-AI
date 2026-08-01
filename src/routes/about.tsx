import { createFileRoute } from "@tanstack/react-router";
import { Compass, Flag, HeartHandshake, Rocket, ShieldCheck, Users } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/site/motion-kit";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About MediVerse AI — Our Vision, Mission & Story" },
      {
        name: "description",
        content:
          "MediVerse AI is an AI-powered healthcare platform helping patients, doctors, hospitals and researchers with intelligent healthcare solutions.",
      },
      { property: "og:title", content: "About MediVerse AI" },
      {
        property: "og:description",
        content: "The vision, mission, timeline and core values behind MediVerse AI.",
      },
    ],
  }),
  component: About,
});

const timeline = [
  ["2021", "Founded", "Three clinicians and two ML researchers start MediVerse in a Bengaluru hospital lab."],
  ["2022", "First model", "Symptom triage model reaches 94% top-3 accuracy on internal validation."],
  ["2023", "Hospital rollout", "12 partner hospitals go live with the report analyzer."],
  ["2024", "Series A", "$18M raised to scale continuous monitoring and edge inference."],
  ["2025", "Global launch", "Multi-language support ships across 9 languages and 40 countries."],
  ["2026", "Today", "50,000+ users, 120 hospitals, 99.8% accuracy on the benchmark suite."],
] as const;

function About() {
  return (
    <div className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="About us"
          title={
            <>
              Intelligent healthcare, <span className="gradient-text">for everyone</span>
            </>
          }
          subtitle="MediVerse AI is an AI-powered healthcare platform helping patients, doctors, hospitals and researchers with intelligent healthcare solutions."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {[
            {
              icon: Compass,
              title: "Our Vision",
              body: "A world where a first-rate clinical opinion is available to every person within seconds, regardless of geography or income.",
            },
            {
              icon: Flag,
              title: "Our Mission",
              body: "Build safe, explainable AI that augments clinicians — never replaces them — and returns time back to patient care.",
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div className="glass-card h-full p-8">
                <span className="gradient-surface grid h-11 w-11 place-items-center rounded-xl text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-muted-foreground">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <SectionHeading eyebrow="Timeline" title="How we got here" align="left" />
          <div className="relative mt-10 space-y-6 border-l border-border pl-6">
            {timeline.map(([year, title, body], i) => (
              <Reveal key={year} delay={i * 0.06}>
                <div className="relative">
                  <span className="gradient-surface absolute top-2 -left-[31px] h-3 w-3 rounded-full ring-4 ring-background" />
                  <div className="glass-card p-5">
                    <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                      {year}
                    </p>
                    <h4 className="mt-1 font-semibold">{title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <SectionHeading eyebrow="Core values" title="What we hold ourselves to" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [ShieldCheck, "Safety first", "Every model ships with guardrails, uncertainty and human escalation."],
              [Users, "Patient dignity", "Data belongs to the patient. Consent is explicit and revocable."],
              [Rocket, "Clinical rigour", "Peer-reviewed validation before any feature reaches a bedside."],
              [HeartHandshake, "Equity", "Free tier forever, and pricing that scales down for public hospitals."],
            ].map(([Icon, title, body], i) => {
              const IconC = Icon as typeof ShieldCheck;
              return (
                <Reveal key={title as string} delay={i * 0.08}>
                  <div className="glass-card h-full p-6">
                    <IconC className="h-5 w-5 text-primary" />
                    <h4 className="mt-4 font-semibold">{title as string}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">{body as string}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
