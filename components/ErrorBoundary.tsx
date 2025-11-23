"use client";

import React, { Component, type ReactNode } from "react";
import { reportError } from "@/utils/reportError";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  /**
   * Component name for error reporting context
   */
  componentName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/**
 * Error Boundary component for catching React errors
 * Compatible with Next.js App Router (client-side only)
 *
 * Enhanced with:
 * - Friendly retry button
 * - Error telemetry integration
 * - Better accessibility
 *
 * Usage:
 * <ErrorBoundary componentName="HeroSection">
 *   <YourComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ errorInfo });

    // Report error to telemetry
    reportError(error, {
      component: this.props.componentName || "ErrorBoundary",
      action: "componentDidCatch",
      metadata: {
        componentStack: errorInfo.componentStack,
      },
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Also log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = (): void => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className='min-h-[400px] flex items-center justify-center p-8'
          role='alert'
          aria-live='assertive'
        >
          <div className='text-center space-y-4 max-w-md'>
            <h2 className='text-2xl font-bold text-black'>
              Something went wrong
            </h2>
            <p className='text-black/70'>
              We encountered an unexpected error. You can try again or refresh
              the page.
            </p>
            {process.env.NODE_ENV === "development" &&
              this.state.error &&
              this.state.errorInfo && (
                <details className='mt-4 text-left'>
                  <summary className='cursor-pointer text-sm text-black/60'>
                    Error details (development only)
                  </summary>
                  <pre className='mt-2 p-4 bg-black/5 rounded text-xs overflow-auto max-h-60'>
                    {this.state.error.toString()}
                    {"\n\n"}
                    {this.state.error.stack}
                    {"\n\n"}
                    Component Stack:
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            <div className='mt-6 flex flex-col sm:flex-row gap-3 justify-center'>
              <button
                onClick={this.handleReset}
                className='px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-neon-green hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'
                aria-label='Try again to reload this section'
              >
                Try again
              </button>
              <button
                onClick={this.handleReload}
                className='px-6 py-3 bg-white/70 text-black rounded-full font-semibold hover:bg-white border border-black/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'
                aria-label='Reload the entire page'
              >
                Refresh page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

