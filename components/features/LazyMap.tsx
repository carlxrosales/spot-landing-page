"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import type { City } from "./philippines-map";

// Dynamically import the map component with code splitting
const PhilippinesMap = dynamic(
  () =>
    import("./philippines-map").then((mod) => ({
      default: mod.PhilippinesMap,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[600px] md:h-[700px] flex items-center justify-center bg-gray-100 rounded-3xl">
        <div className="text-center">
          <div className="animate-pulse text-black/40 mb-2">Loading map...</div>
          <div className="w-8 h-8 border-4 border-neon-green border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    ),
  }
);

interface LazyMapProps {
  cities: City[];
  mapboxToken: string;
}

/**
 * Lazy-loads Mapbox using IntersectionObserver.
 * Only loads when the container enters the viewport (200px before).
 * This prevents Mapbox from being included in the initial bundle.
 */
export function LazyMap({ cities, mapboxToken }: LazyMapProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        // Start loading 200px before entering viewport
        rootMargin: "200px",
        threshold: 0.01,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad]);

  // Show placeholder until map should load
  if (!shouldLoad) {
    return (
      <div
        ref={containerRef}
        className="w-full h-[600px] md:h-[700px] rounded-3xl overflow-hidden shadow-lg relative bg-gray-100 flex items-center justify-center"
      >
        <div className="text-center text-black/40">
          <p>Map will load when visible</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <PhilippinesMap cities={cities} mapboxToken={mapboxToken} />
    </div>
  );
}

