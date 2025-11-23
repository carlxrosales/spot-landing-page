"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { City } from "@/components/features/philippines-map";
import { getCitiesWithCounts } from "@/lib/cities";

const PhilippinesMap = dynamic(
  () =>
    import("@/components/features/philippines-map").then((mod) => ({
      default: mod.PhilippinesMap,
    })),
  {
    ssr: false,
    loading: () => (
      <div className='h-[600px] flex items-center justify-center'>
        Loading map...
      </div>
    ),
  }
);

export function Zones() {
  const [philippineCities, setPhilippineCities] = useState<City[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoadingCities(true);
        const cities = await getCitiesWithCounts();
        setPhilippineCities(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsLoadingCities(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <section id='zones' className='space-y-8 fade-in-on-scroll'>
      <div className='text-center'>
        <h2 className='text-4xl md:text-6xl text-black font-groen mb-4'>
          zones
        </h2>
        <p className='text-xl md:text-2xl text-black/80 max-w-3xl mx-auto mb-8'>
          discover ph cities on spot
        </p>
      </div>
      <div className='relative bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-lg max-w-4xl mx-auto'>
        {isLoadingCities ? (
          <div className='h-[600px] flex items-center justify-center'>
            <p className='text-xl text-gray'>Loading cities data...</p>
          </div>
        ) : process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? (
          <PhilippinesMap
            cities={philippineCities}
            mapboxToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          />
        ) : (
          <div className='h-[600px] flex items-center justify-center'>
            <p className='text-xl text-gray'>
              Please add NEXT_PUBLIC_MAPBOX_TOKEN to your environment variables
            </p>
          </div>
        )}
      </div>
      <div className='text-center'>
        <p className='text-lg text-black/70'>
          hit the markers to check out each city
        </p>
      </div>
    </section>
  );
}
