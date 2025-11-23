"use client";

import { PageLayout } from "@/components/layout/page-layout";
import dynamic from "next/dynamic";
import type { City } from "@/components/features/philippines-map";

// Dynamically import the map component to avoid SSR issues with mapbox-gl
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

// Philippine cities where spot is available
const philippineCities: City[] = [
  {
    id: "indang",
    name: "Indang",
    latitude: 14.1986,
    longitude: 120.8767,
    description: "Cavite",
  },
  {
    id: "tagaytay",
    name: "Tagaytay",
    latitude: 14.1003,
    longitude: 120.9332,
    description: "Cavite - Popular tourist destination",
  },
  {
    id: "manila",
    name: "Manila",
    latitude: 14.5995,
    longitude: 120.9842,
    description: "Capital city of the Philippines",
  },
  {
    id: "caloocan",
    name: "Caloocan",
    latitude: 14.6546,
    longitude: 120.9842,
    description: "Metro Manila",
  },
  {
    id: "makati",
    name: "Makati",
    latitude: 14.5547,
    longitude: 121.0244,
    description: "Metro Manila - Business district",
  },
  {
    id: "malabon",
    name: "Malabon",
    latitude: 14.6567,
    longitude: 120.9569,
    description: "Metro Manila",
  },
  {
    id: "mandaluyong",
    name: "Mandaluyong",
    latitude: 14.5794,
    longitude: 121.0359,
    description: "Metro Manila",
  },
  {
    id: "marikina",
    name: "Marikina",
    latitude: 14.6507,
    longitude: 121.1029,
    description: "Metro Manila - Shoe capital",
  },
  {
    id: "pasay",
    name: "Pasay",
    latitude: 14.5378,
    longitude: 121.0014,
    description: "Metro Manila",
  },
  {
    id: "quezon-city",
    name: "Quezon City",
    latitude: 14.676,
    longitude: 121.0437,
    description: "Metro Manila - Largest city in Metro Manila",
  },
  {
    id: "taguig",
    name: "Taguig",
    latitude: 14.5176,
    longitude: 121.0509,
    description: "Metro Manila - BGC area",
  },
  {
    id: "valenzuela",
    name: "Valenzuela",
    latitude: 14.7004,
    longitude: 120.983,
    description: "Metro Manila",
  },
  {
    id: "baguio",
    name: "Baguio",
    latitude: 16.4023,
    longitude: 120.596,
    description: "Benguet - Summer capital of the Philippines",
  },
  {
    id: "trece-martires",
    name: "Trece Martires",
    latitude: 14.2833,
    longitude: 120.8667,
    description: "Cavite - Capital of Cavite province",
  },
];

export default function Zones() {
  // Get Mapbox token from environment variable
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

  if (!mapboxToken) {
    return (
      <PageLayout>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-5xl md:text-6xl text-black mb-8 font-groen'>
            Zones
          </h1>
          <div className='relative bg-white/80 backdrop-blur-md rounded-3xl p-12 shadow-lg'>
            <p className='text-xl text-gray'>
              Please add NEXT_PUBLIC_MAPBOX_TOKEN to your environment variables
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className='max-w-7xl mx-auto space-y-12 md:space-y-16 px-4 md:px-8'>
        <div className='text-center'>
          <h1 className='text-5xl md:text-6xl text-black font-groen'>zones</h1>
          <p className='text-xl md:text-2xl text-black/80 max-w-3xl mx-auto'>
            discover ph cities on spot
          </p>
        </div>
        <PhilippinesMap cities={philippineCities} mapboxToken={mapboxToken} />
      </div>
    </PageLayout>
  );
}
