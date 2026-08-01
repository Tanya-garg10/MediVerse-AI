type ErrorOptions = {
    mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
    handled?: boolean;
    severity?: "error" | "warning" | "info";
};

/**
 * Reports an error from a React error boundary or other manual capture point.
 * Logs to the console and can be extended to send to any error tracking service.
 */
export function reportError(
    error: unknown,
    context: Record<string, unknown> = {},
    options: ErrorOptions = {},
) {
    const { mechanism = "manual", severity = "error" } = options;

    const message =
        error instanceof Response
            ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
            : error instanceof Error
                ? error.message
                : String(error);

    console.error(`[${severity.toUpperCase()}] (${mechanism})`, message, context);

    // TODO: integrate with your preferred error tracking service (e.g. Sentry, Datadog)
    // Example: Sentry.captureException(error, { extra: context });
}
