/**
 * Optional run-ID propagation for request tracing.
 * Attach any custom header name you use in your infrastructure.
 */
const RUN_ID_HEADER = "X-MediVerse-Run-ID";

export function createRunIdFetch(initialRunId?: string) {
  let runId = initialRunId?.trim() || undefined;

  return {
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      if (runId && !headers.has(RUN_ID_HEADER)) {
        headers.set(RUN_ID_HEADER, runId);
      }
      const response = await fetch(input as RequestInfo, { ...init, headers });
      const next = response.headers.get(RUN_ID_HEADER)?.trim();
      if (!runId && next) runId = next;
      return response;
    },
    getRunId: () => runId,
  };
}
