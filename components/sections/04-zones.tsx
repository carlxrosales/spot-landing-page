"use client";

import { useState, useEffect } from "react";
import type { City } from "@/components/features/philippines-map";
import { getCitiesWithCounts } from "@/lib/cities";
import { LazyMap } from "@/components/features/LazyMap";

export function Zones() {
  const [philippineCities, setPhilippineCities] = useState<City[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoadingCities(true);
        setError(null);
        const cities = await getCitiesWithCounts();
        setPhilippineCities(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setError("Failed to load cities. Please try refreshing the page.");
      } finally {
        setIsLoadingCities(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <section id='zones' className='space-y-8 fade-in-on-scroll'>
      <div className='text-center'>
        <h2 className='text-4xl md:text-6xl text-black font-groen'>zones</h2>
        <p className='text-xl md:text-2xl text-black/80 max-w-3xl mx-auto mb-8'>
          discover ph cities on spot
        </p>
      </div>
      <div className='relative bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-lg max-w-4xl mx-auto'>
        {isLoadingCities ? (
          <div className='h-[600px] flex items-center justify-center'>
            <p className='text-xl text-gray'>Loading cities data...</p>
          </div>
        ) : error ? (
          <div className='h-[600px] flex flex-col items-center justify-center space-y-4'>
            <p className='text-xl text-black/70'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-neon-green hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'
              aria-label='Reload page to retry loading cities'
            >
              Refresh page
            </button>
          </div>
        ) : process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? (
          <LazyMap
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
    </section>
  );
}
