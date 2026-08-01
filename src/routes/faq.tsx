import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, SectionHeading } from "@/components/site/motion-kit";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — MediVerse AI Questions Answered" },
      {
        name: "description",
        content:
          "Answers on accuracy, privacy, pricing, integrations, offline use, languages and clinical validation of MediVerse AI.",
      },
      { property: "og:title", content: "FAQ — MediVerse AI" },
      {
        property: "og:description",
        content: "Ten common questions about accuracy, privacy, pricing and integrations.",
      },
    ],
  }),
  component: Faq,
});

const faqs = [
  ["Is MediVerse AI a replacement for a doctor?", "No. MediVerse is decision support. Every high-risk output is routed to a licensed clinician, and the product never issues a final diagnosis or prescription on its own."],
  ["How accurate are the models?", "Our benchmark suite reports 99.8% agreement with clinician-confirmed labels on top-3 differentials across 1.2M validation encounters. Per-condition metrics are published in the model card."],
  ["Who can see my health data?", "Only you, plus anyone you explicitly grant access to. Consent is per-record, time-boxed and revocable, and every access is written to an immutable audit log."],
  ["Is my data used to train models?", "Not by default. Training uses de-identified data only from users who opt in, and opting out never limits product features."],
  ["Which devices and wearables are supported?", "Apple Health, Google Fit, Fitbit, Garmin, Withings, Dexcom, Omron and any HL7 FHIR-compatible hospital device gateway."],
  ["Does it integrate with our hospital EHR?", "Yes. Enterprise supports HL7 v2, FHIR R4 and direct connectors for Epic, Cerner and Meditech, with sandbox validation before go-live."],
  ["What does it cost?", "Free forever for individuals. Pro is $19/month. Enterprise is usage-based with a 60% discount for public hospitals."],
  ["Which languages are supported?", "Nine at launch: English, Hindi, Bengali, Spanish, French, Arabic, Mandarin, German and Portuguese, including voice input."],
  ["Can I use it offline?", "Core dashboard, reminders and your health passport work offline as an installed app and sync when you reconnect. AI inference requires a connection."],
  ["How is it regulated?", "MediVerse operates as clinical decision support under FDA CDS guidance and holds ISO 27001 and SOC 2 Type II. CE-MDR class IIa certification is in progress."],
  ["How long does deployment take?", "Individuals are live in two minutes. Hospital rollouts average twelve days including integration testing and staff training."],
  ["What happens if the AI is unsure?", "Low-confidence cases are flagged, escalated to a human reviewer, and the uncertainty is shown to the patient rather than hidden."],
] as const;

function Faq() {
  return (
    <div className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions, <span className="gradient-text">answered</span>
            </>
          }
          subtitle="Everything patients, clinicians and IT teams ask us before signing up."
        />

        <Reveal>
          <div className="glass-card mx-auto mt-12 max-w-3xl px-6 py-2">
            <Accordion type="single" collapsible>
              {faqs.map(([q, a], i) => (
                <AccordionItem key={q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base">{q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
