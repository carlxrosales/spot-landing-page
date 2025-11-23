/**
 * Utility function to report errors to telemetry/logging service.
 * This is a placeholder that can be integrated with services like:
 * - Sentry
 * - LogRocket
 * - Custom analytics
 * - Console (for development)
 *
 * @param error - The error object to report
 * @param context - Additional context about where the error occurred
 * @param severity - Severity level of the error
 */
export function reportError(
  error: Error | unknown,
  context?: {
    component?: string;
    action?: string;
    metadata?: Record<string, unknown>;
  },
  severity: "low" | "medium" | "high" = "medium"
): void {
  // In development, always log to console
  if (process.env.NODE_ENV === "development") {
    console.error("Error reported:", {
      error,
      context,
      severity,
      timestamp: new Date().toISOString(),
    });
  }

  // TODO: Integrate with your error reporting service
  // Example integrations:
  //
  // if (typeof window !== "undefined" && window.Sentry) {
  //   window.Sentry.captureException(error, {
  //     tags: { severity },
  //     extra: context,
  //   });
  // }
  //
  // Or send to your analytics endpoint:
  // fetch("/api/errors", {
  //   method: "POST",
  //   body: JSON.stringify({ error, context, severity }),
  // });
}

