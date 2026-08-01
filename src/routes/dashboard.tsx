import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  CalendarClock,
  Droplets,
  Gauge,
  HeartPulse,
  Lock,
  Scale,
  Sparkles,
} from "lucide-react";
import { Reveal, SectionHeading } from "@/components/site/motion-kit";
import { useDemoAuth } from "@/lib/demo-auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Health Dashboard Preview — MediVerse AI" },
      {
        name: "description",
        content:
          "Interactive preview of the MediVerse AI health dashboard: vitals, health score, trends and AI recommendations.",
      },
      { property: "og:title", content: "Health Dashboard Preview — MediVerse AI" },
      {
        property: "og:description",
        content: "Vitals, health score gauge, interactive charts and AI recommendations.",
      },
    ],
  }),
  component: Dashboard,
});

const heart = [
  { d: "Mon", bpm: 72, spo2: 97 },
  { d: "Tue", bpm: 76, spo2: 98 },
  { d: "Wed", bpm: 69, spo2: 97 },
  { d: "Thu", bpm: 81, spo2: 96 },
  { d: "Fri", bpm: 74, spo2: 98 },
  { d: "Sat", bpm: 70, spo2: 99 },
  { d: "Sun", bpm: 73, spo2: 98 },
];

const pressure = [
  { d: "W1", sys: 122, dia: 79 },
  { d: "W2", sys: 126, dia: 82 },
  { d: "W3", sys: 119, dia: 77 },
  { d: "W4", sys: 121, dia: 78 },
];

const activity = [
  { d: "Mon", steps: 6400 },
  { d: "Tue", steps: 8200 },
  { d: "Wed", steps: 5100 },
  { d: "Thu", steps: 9400 },
  { d: "Fri", steps: 7300 },
  { d: "Sat", steps: 11200 },
  { d: "Sun", steps: 4800 },
];

const score = [
  { name: "score", value: 86 },
  { name: "rest", value: 14 },
];

const vitals = [
  { icon: Scale, label: "BMI", value: "22.4", note: "Healthy range" },
  { icon: HeartPulse, label: "Heart Rate", value: "73 bpm", note: "Resting avg" },
  { icon: Gauge, label: "Blood Pressure", value: "121/78", note: "Optimal" },
  { icon: Droplets, label: "Sugar Level", value: "94 mg/dL", note: "Fasting" },
];

function Dashboard() {
  const { user, ready } = useDemoAuth();

  if (!ready) return <div className="section shell text-sm text-muted-foreground">Loading…</div>;

  if (!user) {
    return (
      <div className="section">
        <div className="shell grid place-items-center py-10">
          <div className="glass-card max-w-md p-8 text-center">
            <div className="gradient-surface mx-auto grid h-12 w-12 place-items-center rounded-2xl text-primary-foreground">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="mt-5 text-2xl font-bold">Sign in to view your dashboard</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              The MediVerse AI health workspace is protected. Use the demo account to explore
              vitals, trends and AI recommendations.
            </p>
            <Link
              to="/login"
              className="gradient-surface mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Sign in to continue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (

    <div className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Dashboard preview"
          title={
            <>
              Your health, <span className="gradient-text">quantified</span>
            </>
          }
          subtitle="A live sample of the patient workspace clinicians and patients share."
        />

        <Reveal>
          <div className="glass-card mt-12 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-6 sm:flex sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="gradient-surface grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-xl font-bold text-primary-foreground">
                AR
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-lg font-semibold">Ananya Rao</h3>
                <p className="truncate text-sm text-muted-foreground">
                  32 · Female · Patient ID MV-40219 · Bengaluru
                </p>
              </div>
            </div>
            <span className="glass rounded-full px-4 py-2 text-xs font-semibold text-primary">
              Health Score 86
            </span>
          </div>
        </Reveal>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {vitals.map((v, i) => (
            <Reveal key={v.label} delay={i * 0.07}>
              <div className="glass-card h-full p-6">
                <v.icon className="h-5 w-5 text-primary" />
                <p className="mt-4 text-xs tracking-wide text-muted-foreground uppercase">
                  {v.label}
                </p>
                <p className="font-display mt-1 text-2xl font-bold">{v.value}</p>
                <p className="text-xs text-muted-foreground">{v.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="glass-card h-full p-6">
              <h3 className="font-semibold">Heart rate & SpO₂ — last 7 days</h3>
              <div className="mt-5 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={heart}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.7} />
                        <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeOpacity={0.12} vertical={false} />
                    <XAxis dataKey="d" stroke="currentColor" opacity={0.5} fontSize={12} />
                    <YAxis stroke="currentColor" opacity={0.5} fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-popover)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 12,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="bpm"
                      stroke="var(--color-chart-1)"
                      fill="url(#g1)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="spo2"
                      stroke="var(--color-chart-2)"
                      fill="url(#g2)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-card flex h-full flex-col items-center justify-center p-6">
              <h3 className="self-start font-semibold">Health Score</h3>
              <div className="relative mt-2 h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={score}
                      dataKey="value"
                      innerRadius="72%"
                      outerRadius="92%"
                      startAngle={220}
                      endAngle={-40}
                      stroke="none"
                    >
                      <Cell fill="var(--color-chart-1)" />
                      <Cell fill="var(--color-muted)" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <p className="font-display text-4xl font-bold">86</p>
                    <p className="text-xs text-muted-foreground">Excellent</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="glass-card h-full p-6">
              <h3 className="font-semibold">Blood pressure trend</h3>
              <div className="mt-5 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pressure}>
                    <CartesianGrid strokeOpacity={0.12} vertical={false} />
                    <XAxis dataKey="d" stroke="currentColor" opacity={0.5} fontSize={12} />
                    <YAxis stroke="currentColor" opacity={0.5} fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-popover)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 12,
                      }}
                    />
                    <Line dataKey="sys" stroke="var(--color-chart-2)" strokeWidth={2.5} dot={false} />
                    <Line dataKey="dia" stroke="var(--color-chart-3)" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass-card h-full p-6">
              <h3 className="font-semibold">Daily activity</h3>
              <div className="mt-5 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activity}>
                    <CartesianGrid strokeOpacity={0.12} vertical={false} />
                    <XAxis dataKey="d" stroke="currentColor" opacity={0.5} fontSize={12} />
                    <YAxis stroke="currentColor" opacity={0.5} fontSize={12} />
                    <Tooltip
                      cursor={{ fill: "var(--color-muted)", opacity: 0.3 }}
                      contentStyle={{
                        background: "var(--color-popover)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 12,
                      }}
                    />
                    <Bar dataKey="steps" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="glass-card h-full p-6">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Upcoming appointment</h3>
              </div>
              <div className="glass mt-4 rounded-2xl p-5">
                <p className="text-sm text-muted-foreground">Thu, 6 Aug 2026 · 10:30 AM</p>
                <p className="mt-1 text-lg font-semibold">Dr. Meera Iyer — Cardiology</p>
                <p className="text-sm text-muted-foreground">
                  Apollo Hospital, Bannerghatta Road · Follow-up
                </p>
                <div className="mt-4 flex gap-2">
                  <button className="gradient-surface rounded-full px-4 py-2 text-xs font-semibold text-primary-foreground">
                    Join video call
                  </button>
                  <button className="glass rounded-full px-4 py-2 text-xs font-semibold">
                    Reschedule
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass-card h-full p-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">AI recommendations</h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  "Sodium intake trending high — target under 2g/day for the next 2 weeks.",
                  "Sleep averaged 6h 10m. Shift bedtime 40 minutes earlier to support BP control.",
                  "Vitamin D re-test due in 11 days based on your last panel.",
                  "Add two 20-minute zone-2 walks to hit your cardio target.",
                ].map((r) => (
                  <li key={r} className="glass flex gap-3 rounded-xl p-3">
                    <Activity className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
