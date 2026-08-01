export type TavilyResult = {
  title: string;
  url: string;
  content: string;
};

export type TavilySearch = {
  answer?: string | undefined;
  results: TavilyResult[];
};


export function hasTavily() {
  return Boolean(process.env["TAVILY_API_KEY"]);
}

/** Search the live web through Tavily. Returns null when no key is configured. */
export async function tavilySearch(
  query: string,
  opts?: { maxResults?: number; topic?: "general" | "news" },
): Promise<TavilySearch | null> {
  const apiKey = process.env["TAVILY_API_KEY"];
  if (!apiKey) return null;

  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      query,
      topic: opts?.topic ?? "general",
      search_depth: "basic",
      include_answer: "advanced",
      max_results: Math.min(opts?.maxResults ?? 5, 8),
    }),
  });

  if (!res.ok) {
    throw new Error(`Tavily search failed (${res.status}): ${await res.text()}`);
  }

  const data = (await res.json()) as {
    answer?: string;
    results?: Array<{ title?: string; url?: string; content?: string }>;
  };

  return {
    answer: data.answer,
    results: (data.results ?? []).slice(0, 8).map((r) => ({
      title: r.title ?? "Source",
      url: r.url ?? "",
      content: (r.content ?? "").slice(0, 1200),
    })),
  };
}
