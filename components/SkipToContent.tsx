"use client";

import Link from "next/link";

/**
 * Skip to content link for keyboard navigation accessibility.
 * Visible only when focused, allows users to skip navigation and go directly to main content.
 *
 * Should be placed at the very beginning of the body/layout.
 */
export function SkipToContent() {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-full focus:font-semibold focus:outline-none focus:ring-2 focus:ring-neon-green focus:ring-offset-2 focus:ring-offset-neon-green"
      aria-label="Skip to main content"
    >
      Skip to content
    </Link>
  );
}

