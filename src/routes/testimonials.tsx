import { createFileRoute } from "@tanstack/react-router";
import { Quote, Star } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/site/motion-kit";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — What Doctors & Patients Say About MediVerse AI" },
      {
        name: "description",
        content:
          "Reviews from doctors, patients, medical students and hospital administrators using MediVerse AI every day.",
      },
      { property: "og:title", content: "Testimonials — MediVerse AI" },
      {
        property: "og:description",
        content: "Doctor, patient, student and hospital reviews of MediVerse AI.",
      },
    ],
  }),
  component: Testimonials,
});

const reviews = [
  {
    name: "Dr. Meera Iyer",
    role: "Cardiologist, Apollo Hospitals",
    initials: "MI",
    text: "The report analyzer cut my chart-prep time in half. Every summary cites the underlying values, so I can verify in seconds instead of scrolling PDFs.",
  },
  {
    name: "Rahul Verma",
    role: "Patient, Type 2 Diabetes",
    initials: "RV",
    text: "My HbA1c dropped from 8.1 to 6.6 in nine months. The reminders and weekly AI check-ins kept me honest without feeling nagged.",
  },
  {
    name: "Dr. Samuel Okoye",
    role: "Chief Medical Officer, Lagos General",
    initials: "SO",
    text: "We deployed across four wards in twelve days. Triage wait times fell 38% and the audit trail satisfied our compliance board on the first pass.",
  },
  {
    name: "Aisha Khan",
    role: "MBBS Final Year, AIIMS",
    initials: "AK",
    text: "I use the differential explanations as a study partner. It shows reasoning, not just answers, which is exactly what exams test.",
  },
  {
    name: "Priya Nair",
    role: "Caregiver",
    initials: "PN",
    text: "The SOS feature sent my father's location and medication list to the ambulance before we even reached the hospital. That saved real minutes.",
  },
  {
    name: "Dr. Lena Fischer",
    role: "Research Lead, Charité Berlin",
    initials: "LF",
    text: "The cohort API is the cleanest research interface we've worked with. De-identification is handled upstream and the schemas are stable.",
  },
];

function Testimonials() {
  return (
    <div className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Trusted by clinicians and <span className="gradient-text">the people they treat</span>
            </>
          }
          subtitle="4.9 average rating across 3,200 verified reviews."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 0.08}>
              <div className="glass-card flex h-full flex-col p-7">
                <Quote className="h-6 w-6 text-primary/60" />
                <p className="mt-4 flex-1 text-sm text-muted-foreground">{r.text}</p>
                <div className="mt-5 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <div className="mt-5 flex min-w-0 items-center gap-3 border-t border-border/60 pt-5">
                  <span className="gradient-surface grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold text-primary-foreground">
                    {r.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{r.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{r.role}</p>
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
