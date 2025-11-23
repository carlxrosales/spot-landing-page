"use client";

import { useEffect, useState, useRef, useCallback, useMemo, memo } from "react";
import dynamic from "next/dynamic";
import type { City } from "./philippines-map";

// Dynamically import Mapbox components with code splitting
const Map = dynamic(
  () => import("react-map-gl/mapbox").then((mod) => mod.Map),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-3xl">
        <div className="text-center">
          <div className="animate-pulse text-black/40 mb-2">Loading map...</div>
          <div className="w-8 h-8 border-4 border-neon-green border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    ),
  }
);

const Marker = dynamic(
  () => import("react-map-gl/mapbox").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-map-gl/mapbox").then((mod) => mod.Popup),
  { ssr: false }
);

interface MapClientProps {
  cities: City[];
  mapboxToken: string;
}

/**
 * Optimized Mapbox client component with IntersectionObserver lazy loading.
 * Only loads Mapbox when the container enters the viewport.
 */
export function MapClient({ cities, mapboxToken }: MapClientProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [viewState, setViewState] = useState({
    longitude: 120.98,
    latitude: 14.5,
    zoom: 10.5,
    bearing: 190,
    pitch: 80,
  });

  const dayStyle = "mapbox://styles/imsohungry/cmi9egfcc002c01si3f902r14";
  const nightStyle = "mapbox://styles/imsohungry/cmi9f8r8r002r01r96xn6cyj8";

  // IntersectionObserver to lazy-load Mapbox only when visible
  useEffect(() => {
    if (!containerRef.current || shouldLoadMap) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadMap(true);
            observer.disconnect();
          }
        });
      },
      {
        // Start loading when 200px before viewport
        rootMargin: "200px",
        threshold: 0.01,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoadMap]);

  const getTimeOfDay = useCallback(() => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 6 && hour < 18 ? "day" : "night";
  }, []);

  const [mapStyle, setMapStyle] = useState(() => {
    return getTimeOfDay() === "day" ? dayStyle : nightStyle;
  });

  const handleCitySelect = useCallback(
    (city: City) => {
      setSelectedCity(city);
      setIsDropdownOpen(false);
      setSearchQuery("");
      setDebouncedSearchQuery("");
      setViewState((prev) => ({
        longitude: city.longitude,
        latitude: city.latitude,
        zoom: 11,
        bearing: prev.bearing,
        pitch: prev.pitch,
      }));
    },
    []
  );

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 150);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const filteredCities = useMemo(
    () =>
      cities.filter((city) =>
        city.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      ),
    [cities, debouncedSearchQuery]
  );

  useEffect(() => {
    const updateStyleBasedOnTime = () => {
      const timeOfDay = getTimeOfDay();
      const newStyle = timeOfDay === "day" ? dayStyle : nightStyle;

      setMapStyle((currentStyle) => {
        if (newStyle !== currentStyle) {
          return newStyle;
        }
        return currentStyle;
      });
    };

    updateStyleBasedOnTime();
    const interval = setInterval(updateStyleBasedOnTime, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [getTimeOfDay]);

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".city-dropdown-container")) {
        setIsDropdownOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [isDropdownOpen]);

  // Don't render map until it should load
  if (!shouldLoadMap) {
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
    <div
      ref={containerRef}
      className="w-full h-[600px] md:h-[700px] rounded-3xl overflow-hidden shadow-lg relative"
    >
      <div className="absolute top-4 left-4 z-10 city-dropdown-container">
        <div className="relative">
          <button
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              if (isDropdownOpen) {
                setSearchQuery("");
              }
            }}
            className="bg-white/90 backdrop-blur-md rounded-lg px-4 py-2 shadow-lg border border-white/20 flex items-center gap-2 hover:bg-white transition-colors font-medium text-black"
          >
            <span>Select City</span>
            <span className="text-lg">{isDropdownOpen ? "▲" : "▼"}</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-white/20 overflow-hidden min-w-[250px] max-h-[400px] flex flex-col">
              <div className="p-2 border-b border-black/10">
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-black/20 focus:outline-none focus:ring-2 focus:ring-neon-green/50 text-sm text-black placeholder:text-gray-500"
                  autoFocus
                  autoComplete="off"
                />
              </div>
              <div className="overflow-y-auto max-h-[350px]">
                {filteredCities.length > 0 ? (
                  filteredCities.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => handleCitySelect(city)}
                      className="w-full text-left px-4 py-2 hover:bg-neon-green/20 hover:text-black transition-colors text-sm font-medium text-black border-b border-black/5 last:border-b-0"
                    >
                      {city.name}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">
                    No cities found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Map
        key={mapStyle}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        onLoad={() => {
          setMapLoaded(true);
        }}
        mapboxAccessToken={mapboxToken}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        attributionControl={false}
        minZoom={5}
        maxZoom={18}
        maxBounds={[
          [116.9, 4.2],
          [126.6, 21.1],
        ]}
        reuseMaps={true}
        antialias={false}
        preserveDrawingBuffer={false}
        renderWorldCopies={false}
      >
        {mapLoaded &&
          cities.map((city) => (
            <CityMarker
              key={city.id}
              city={city}
              onSelect={setSelectedCity}
            />
          ))}

        {mapLoaded && selectedCity && (
          <Popup
            longitude={selectedCity.longitude}
            latitude={selectedCity.latitude}
            anchor="bottom"
            offset={[0, -10]}
            onClose={() => setSelectedCity(null)}
            closeButton={true}
            closeOnClick={false}
            className="mapbox-popup"
          >
            <div className="p-4 text-center min-w-[200px] max-w-[200px]">
              {selectedCity.spotted !== undefined && (
                <div className="mb-2 pb-2 border-b border-gray-200">
                  <p className="inline-block bg-neon-green rounded-full px-4 py-1 text-lg font-bold text-black font-groen mb-2">
                    spotted
                  </p>
                  <p className="text-base font-semibold text-black mt-1 mb-2">
                    📍 {selectedCity.spotted.toLocaleString()} places
                  </p>
                </div>
              )}
              <h3 className="font-bold text-lg text-black">
                {selectedCity.name}
              </h3>
              {selectedCity.description && (
                <p className="text-sm text-gray-600 mt-1">
                  {selectedCity.description}
                </p>
              )}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

const CityMarker = memo(
  ({
    city,
    onSelect,
  }: {
    city: City;
    onSelect: (city: City) => void;
  }) => {
    const handleClick = useCallback(
      (e: any) => {
        e.originalEvent.stopPropagation();
        onSelect(city);
      },
      [city, onSelect]
    );

    return (
      <Marker
        longitude={city.longitude}
        latitude={city.latitude}
        anchor="bottom"
        onClick={handleClick}
      >
        <div className="cursor-pointer">
          <div className="bg-neon-green rounded-full w-6 h-6 border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
            <div className="bg-black rounded-full w-3 h-3"></div>
          </div>
        </div>
      </Marker>
    );
  }
);

CityMarker.displayName = "CityMarker";

