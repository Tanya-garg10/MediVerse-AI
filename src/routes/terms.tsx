import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/motion-kit";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — MediVerse AI" },
      {
        name: "description",
        content:
          "The terms governing use of MediVerse AI, including clinical scope, acceptable use, billing and liability.",
      },
      { property: "og:title", content: "Terms of Service — MediVerse AI" },
      { property: "og:description", content: "Clinical scope, acceptable use, billing and liability." },
    ],
  }),
  component: Terms,
});

const sections = [
  ["Clinical scope", "MediVerse AI provides clinical decision support. It does not practise medicine, issue diagnoses or prescribe treatment. Always consult a licensed clinician."],
  ["Eligibility", "You must be 16 or older, or use the service through a parent, guardian or authorised caregiver account."],
  ["Acceptable use", "No reverse engineering of models, no uploading data you lack the right to share, and no use of outputs to deny care or coverage to any individual."],
  ["Billing", "Paid plans renew monthly or annually until cancelled. Cancel any time; access continues through the end of the paid period. Enterprise terms are set by contract."],
  ["Availability", "We target 99.9% uptime on Pro and 99.99% on Enterprise. Planned maintenance is announced at least 72 hours in advance."],
  ["Liability", "To the maximum extent permitted by law, our aggregate liability is limited to the fees you paid in the preceding twelve months."],
];

function Terms() {
  return (
    <div className="section">
      <div className="shell max-w-3xl">
        <SectionHeading eyebrow="Legal" title="Terms of Service" align="left" subtitle="Last updated 1 August 2026." />
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
