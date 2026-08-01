import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, Bot, Loader2, Send, Sparkles, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { askAssistant } from "@/lib/ai.functions";
import { renderMarkdown } from "@/lib/render-md";



type Msg = {
  role: "user" | "assistant";
  text: string;
  sources?: { title: string; url: string }[];
};

export function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [demo, setDemo] = useState(false);
  const ask = useServerFn(askAssistant);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hi 👋 I'm MediVerse AI. Ask me about symptoms, reports, plans — I can search the live web for current health info.",
    },
  ]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    const next: Msg[] = [...msgs, { role: "user", text }];
    setMsgs(next);
    setBusy(true);
    try {
      const res = await ask({
        data: { messages: next.slice(-12).map((m) => ({ role: m.role, text: m.text })) },
      });
      setDemo(res.demo);
      setMsgs((m) => [...m, { role: "assistant", text: res.text, sources: res.sources }]);
    } catch {
      setMsgs((m) => [
        ...m,
        { role: "assistant", text: "Something went wrong reaching the assistant. Please try again." },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="glass fixed right-4 bottom-24 z-50 flex h-[26rem] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="gradient-surface grid h-8 w-8 place-items-center rounded-full text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold">MediVerse Assistant</p>
                  <p className="text-[11px] text-muted-foreground">
                    {demo ? "Demo mode" : "Online · live AI + web search"}
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close assistant">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "gradient-surface ml-auto w-fit max-w-[85%] rounded-2xl px-3 py-2 text-primary-foreground"
                      : "glass w-fit max-w-[90%] rounded-2xl px-3 py-2"
                  }
                >
                  <p className="whitespace-pre-wrap">{renderMarkdown(m.text)}</p>
                  {m.sources?.length ? (
                    <ul className="mt-2 space-y-1 border-t border-border/50 pt-2 text-[11px]">
                      {m.sources.map((s) => (
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
                </div>
              ))}
              {busy ? (
                <div className="glass flex w-fit items-center gap-2 rounded-2xl px-3 py-2 text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
                </div>
              ) : null}
            </div>
            <form onSubmit={send} className="flex gap-2 border-t border-border/60 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something…"
                aria-label="Message"
                className="glass min-w-0 flex-1 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                disabled={busy}
                aria-label="Send message"
                className="gradient-surface grid h-9 w-9 shrink-0 place-items-center rounded-full text-primary-foreground disabled:opacity-50"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI assistant"
        className="gradient-surface fixed right-4 bottom-6 z-50 grid h-14 w-14 place-items-center rounded-full text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-110"
      >
        <Bot className="h-6 w-6" />
      </button>
    </>
  );
}


export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="glass fixed right-6 bottom-24 z-40 grid h-10 w-10 place-items-center rounded-full transition-colors hover:text-primary sm:right-20 sm:bottom-8"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {done ? null : (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <div className="text-center">
            <div className="gradient-surface mx-auto h-14 w-14 animate-spin rounded-2xl [animation-duration:1.6s]" />
            <p className="font-display mt-5 text-sm tracking-[0.35em] text-muted-foreground uppercase">
              MediVerse AI
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
