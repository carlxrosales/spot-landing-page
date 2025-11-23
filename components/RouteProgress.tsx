"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Lightweight route transition progress indicator.
 * Shows a progress bar at the top of the page during route transitions.
 *
 * Uses CSS transitions for smooth animation - no heavy libraries required.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset and show progress bar on route change
    setIsVisible(true);
    setProgress(0);

    // Simulate progress (in real apps, you might hook into Next.js router events)
    const timer1 = setTimeout(() => setProgress(30), 100);
    const timer2 = setTimeout(() => setProgress(60), 300);
    const timer3 = setTimeout(() => setProgress(90), 500);

    // Complete progress after a short delay
    const timer4 = setTimeout(() => {
      setProgress(100);
      // Hide after animation completes
      setTimeout(() => setIsVisible(false), 200);
    }, 700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [pathname]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/10"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page loading"
    >
      <div
        className="h-full bg-black transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}

