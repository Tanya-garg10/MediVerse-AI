import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/motion-kit";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — MediVerse AI" },
      {
        name: "description",
        content:
          "How MediVerse AI collects, encrypts, shares and deletes your health data, and the rights you hold over it.",
      },
      { property: "og:title", content: "Privacy Policy — MediVerse AI" },
      { property: "og:description", content: "Our data handling, consent and retention practices." },
    ],
  }),
  component: Privacy,
});

const sections = [
  ["Data we collect", "Account details, health records you upload or connect, device vitals you authorise, and product usage telemetry. We never buy health data from third parties."],
  ["How we use it", "To deliver the features you request, to keep your account secure, and to meet legal record-keeping duties. Model training uses de-identified data only from users who opt in."],
  ["Sharing", "We share records only with providers you explicitly authorise, and with infrastructure processors bound by data-processing agreements. We never sell personal data."],
  ["Security", "AES-256 encryption at rest, TLS 1.3 in transit, hardware-backed key management, least-privilege access and immutable audit logs on every record access."],
  ["Your rights", "Access, export, correct, restrict or delete your data at any time from Settings, or by emailing privacy@mediverse.ai. Deletion completes within 30 days."],
  ["Retention", "Clinical records are retained for the period your jurisdiction requires, then irreversibly deleted. Telemetry is retained for 13 months."],
];

function Privacy() {
  return (
    <div className="section">
      <div className="shell max-w-3xl">
        <SectionHeading eyebrow="Legal" title="Privacy Policy" align="left" subtitle="Last updated 1 August 2026." />
        <div className="mt-10 space-y-5">
          {sections.map(([title, body]) => (
            <div key={title} className="glass-card p-7">
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
