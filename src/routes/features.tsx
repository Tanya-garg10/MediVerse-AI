import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Activity,
  AlarmClock,
  Bell,
  BellRing,
  Bot,
  BrainCircuit,
  CalendarCheck,
  FileScan,
  Globe,
  IdCard,
  LayoutDashboard,
  Loader2,
  MapPin,
  Mic,
  Search,
  Siren,
  Stethoscope,
} from "lucide-react";
import { Reveal, SectionHeading } from "@/components/site/motion-kit";
import { askAssistant, predictDisease, type Prediction } from "@/lib/ai.functions";
import { renderMarkdown } from "@/lib/render-md";


export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "AI Features — MediVerse AI Healthcare Platform" },
      {
        name: "description",
        content:
          "Symptom checker, report analyzer, AI chat, disease prediction, voice search, SOS, hospital locator and more — 12 AI modules in one platform.",
      },
      { property: "og:title", content: "AI Features — MediVerse AI" },
      {
        property: "og:description",
        content: "Twelve production AI modules built for patients and clinical teams.",
      },
    ],
  }),
  component: Features,
});

const features = [
  [Stethoscope, "AI Symptom Checker", "Conversational triage that maps symptoms to a ranked differential in seconds."],
  [FileScan, "Medical Report Analyzer", "Upload labs, scans or discharge notes and get a plain-language summary."],
  [Bot, "AI Chat Assistant", "24/7 clinical companion with memory of your full health timeline."],
  [AlarmClock, "Medicine Reminder", "Adaptive dosing reminders that learn your routine and adherence patterns."],
  [LayoutDashboard, "Health Dashboard", "Vitals, trends, risks and next actions on one live surface."],
  [Siren, "Emergency SOS", "One tap shares location, vitals and allergies with responders."],
  [MapPin, "Hospital Locator", "Live bed and speciality availability within your radius."],
  [CalendarCheck, "Appointment Booking", "Match to the right specialist and confirm a slot instantly."],
  [BrainCircuit, "AI Disease Prediction", "Risk scoring across 60+ chronic conditions from your longitudinal data."],
  [Mic, "Voice Assistant", "Hands-free logging and queries in nine languages."],
  [BellRing, "Smart Notifications", "Signal-only alerts, tuned to avoid alarm fatigue."],
  [IdCard, "Health Passport", "A portable, consent-gated record you can share with any provider."],
] as const;

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
};

function getRecognition(): SpeechRecognitionLike | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike };
  const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  return Ctor ? new Ctor() : null;
}

function Features() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState<Prediction | null>(null);
  const [predicting, setPredicting] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [voiceAnswer, setVoiceAnswer] = useState("");
  const [voiceBusy, setVoiceBusy] = useState(false);
  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const predict = useServerFn(predictDisease);
  const ask = useServerFn(askAssistant);

  const runPredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim() || predicting) return;
    setPredicting(true);
    try {
      setResult(await predict({ data: { symptoms: symptoms.trim() } }));
    } catch {
      toast.error("Prediction failed. Please try again.");
    } finally {
      setPredicting(false);
    }
  };

  const answerVoice = async (text: string) => {
    setVoiceBusy(true);
    try {
      const res = await ask({ data: { messages: [{ role: "user" as const, text }] } });
      setVoiceAnswer(res.text);
    } catch {
      toast.error("Voice query failed.");
    } finally {
      setVoiceBusy(false);
    }
  };

  const toggleVoice = () => {
    if (listening) {
      recRef.current?.stop();
      setListening(false);
      return;
    }
    const rec = getRecognition();
    if (!rec) {
      toast.error("Voice input isn't supported in this browser — try Chrome.");
      return;
    }
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.onresult = (e) => {
      const said = e.results[0]?.[0]?.transcript ?? "";
      setTranscript(said);
      if (said) void answerVoice(said);
    };
    rec.onend = () => setListening(false);
    recRef.current = rec;
    rec.start();
    setListening(true);
  };


  return (
    <div className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="AI Features"
          title={
            <>
              Twelve modules. <span className="gradient-text">One care graph.</span>
            </>
          }
          subtitle="Each module is independently deployable and shares the same patient context, so nothing gets lost between steps."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([Icon, title, body], i) => (
            <Reveal key={title} delay={(i % 3) * 0.08}>
              <div className="glass-card group h-full p-7">
                <span className="gradient-surface grid h-11 w-11 place-items-center rounded-xl text-primary-foreground transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="glass-card h-full p-8">
              <div className="flex items-center gap-2 text-primary">
                <BrainCircuit className="h-5 w-5" />
                <h3 className="text-lg font-semibold text-foreground">
                  Disease Prediction Demo
                </h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Live AI triage grounded with web search. Not a medical diagnosis.
              </p>
              <form className="mt-5 flex gap-2" onSubmit={runPredict}>
                <input
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="fever, cough, body ache…"
                  aria-label="Symptoms"
                  className="glass min-w-0 flex-1 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  disabled={predicting}
                  className="gradient-surface flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
                >
                  {predicting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {predicting ? "Analyzing" : "Predict"}
                </button>
              </form>
              <div className="mt-6 space-y-3">
                {(result?.conditions ?? []).map((c) => (
                  <div key={c.name}>
                    <div className="flex justify-between text-sm">
                      <span>{c.name}</span>
                      <span className="text-muted-foreground">{c.risk}%</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="gradient-surface h-full rounded-full transition-all duration-700"
                        style={{ width: `${c.risk}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{renderMarkdown(c.why)}</p>
                  </div>
                ))}
                {result ? (
                  <>
                    <p className="text-sm text-muted-foreground">{renderMarkdown(result.advice)}</p>
                    {result.sources.length ? (
                      <ul className="space-y-1 text-xs">
                        {result.sources.map((s) => (
                          <li key={s.url} className="truncate">
                            <a
                              href={s.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary hover:underline"
                            >
                              {s.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {result.demo ? (
                      <p className="text-xs text-muted-foreground">Demo mode output.</p>
                    ) : null}
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Results appear here. Not a medical diagnosis.
                  </p>
                )}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5">
            <Reveal delay={0.1}>
              <div className="glass-card p-8">
                <div className="flex items-center gap-2 text-primary">
                  <Mic className="h-5 w-5" />
                  <h3 className="text-lg font-semibold text-foreground">Voice Search</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try “what are early symptoms of dengue?”
                </p>
                <div className="mt-5 flex items-center gap-4">
                  <button
                    onClick={toggleVoice}
                    aria-label="Toggle voice search"
                    className={`gradient-surface grid h-14 w-14 place-items-center rounded-full text-primary-foreground ${listening ? "animate-pulse" : ""}`}
                  >
                    <Mic className="h-6 w-6" />
                  </button>
                  <div className="glass flex-1 rounded-full px-4 py-2.5 text-sm text-muted-foreground">
                    {listening ? "Listening…" : transcript || "Tap the mic to start"}
                  </div>
                </div>
                {voiceBusy ? (
                  <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> Searching…
                  </p>
                ) : voiceAnswer ? (
                  <p className="glass mt-4 rounded-2xl p-4 text-sm whitespace-pre-wrap">
                    {renderMarkdown(voiceAnswer)}
                  </p>
                ) : null}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="glass-card p-8">
                <div className="flex items-center gap-2 text-primary">
                  <Globe className="h-5 w-5" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Multi-language Support
                  </h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["English", "हिन्दी", "Español", "Français", "العربية", "中文", "Deutsch", "বাংলা", "Português"].map(
                    (l) => (
                      <span key={l} className="glass rounded-full px-3 py-1 text-xs">
                        {l}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {[
            [Search, "AI Report Summarizer", "12-page discharge summary → 6 bullet points."],
            [Activity, "Health Analytics", "Cohort-level insights for hospital admins."],
            [Bell, "Care Alerts", "Escalation rules per care team and severity."],
          ].map(([Icon, title, body], i) => {
            const IconC = Icon as typeof Search;
            return (
              <Reveal key={title as string} delay={i * 0.08}>
                <div className="glass-card h-full p-6">
                  <IconC className="h-5 w-5 text-primary" />
                  <h4 className="mt-4 font-semibold">{title as string}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{body as string}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
