"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import type { MapRef } from "react-map-gl/mapbox";

// Example city data structure - replace with your scraped data
export interface City {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  spotted?: number; // Number of places spotted in this city
}

interface PhilippinesMapProps {
  cities: City[];
  mapboxToken: string;
}

export function PhilippinesMap({ cities, mapboxToken }: PhilippinesMapProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const mapRef = useRef<MapRef>(null);
  const [viewState, setViewState] = useState({
    longitude: 120.98, // Metro Manila area center
    latitude: 14.5,
    zoom: 10.5, // Zoomed in to show Metro Manila and surrounding cities
    bearing: 190, // Rotation in degrees (45 = northeast up)
    pitch: 80, // Tilt/3D perspective (0 = flat, 60 = maximum tilt)
  });

  // Map styles - day and night versions
  // If you're seeing the wrong style, the URLs might be swapped - check console logs
  const dayStyle = "mapbox://styles/imsohungry/cmi9egfcc002c01si3f902r14";
  const nightStyle = "mapbox://styles/imsohungry/cmi9f8r8r002r01r96xn6cyj8";

  // Function to determine if it's day or night based on current time
  const getTimeOfDay = () => {
    const now = new Date();
    const hour = now.getHours();
    const isDay = hour >= 6 && hour < 18;
    console.log(`⏰ Current hour: ${hour}, Is day: ${isDay}`);
    // Consider 6 AM to 6 PM as day time
    return isDay ? "day" : "night";
  };

  // State for current map style based on time of day
  const [mapStyle, setMapStyle] = useState(() => {
    return getTimeOfDay() === "day" ? dayStyle : nightStyle;
  });

  // Philippines center coordinates
  const philippinesCenter = {
    longitude: 121.774,
    latitude: 14.5995,
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setIsDropdownOpen(false);
    setSearchQuery("");
    // Fly to the selected city
    setViewState({
      longitude: city.longitude,
      latitude: city.latitude,
      zoom: 11,
      bearing: viewState.bearing, // Preserve current rotation
      pitch: viewState.pitch, // Preserve current tilt
    });
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addCustomCityLabels = useCallback(() => {
    if (!mapRef.current || !mapLoaded) return;

    const map = mapRef.current.getMap();

    // Wait for style to be fully loaded
    if (!map.isStyleLoaded()) {
      return;
    }

    // Don't add labels if no cities
    if (!cities || cities.length === 0) return;

    // Create GeoJSON source with city points
    const cityFeatures = cities.map((city) => ({
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: [city.longitude, city.latitude],
      },
      properties: {
        name: city.name,
      },
    }));

    try {
      const source = map.getSource("custom-city-labels");

      if (source) {
        // Update existing source data instead of removing/re-adding
        (source as any).setData({
          type: "FeatureCollection",
          features: cityFeatures,
        });
      } else {
        // Add source if it doesn't exist
        map.addSource("custom-city-labels", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: cityFeatures,
          },
        });

        // Add text layer for city labels (only if it doesn't exist)
        if (!map.getLayer("custom-city-labels")) {
          map.addLayer({
            id: "custom-city-labels",
            type: "symbol",
            source: "custom-city-labels",
            layout: {
              "text-field": ["get", "name"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-size": 14,
              "text-anchor": "top",
              "text-offset": [0, 0.6],
              "text-allow-overlap": true,
              "text-ignore-placement": true,
              "text-optional": false,
            },
            paint: {
              "text-color": "#000000",
              "text-halo-color": "#ffffff",
              "text-halo-width": 2,
            },
          });
        }
      }
    } catch (error) {
      console.error("Error adding city labels:", error);
    }
  }, [cities, mapLoaded]);

  // Add custom labels for cities with markers
  // Note: This works best with a Mapbox style that has labels disabled
  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      const map = mapRef.current.getMap();

      const addLabels = () => {
        // Add custom labels after a short delay to ensure style is ready
        setTimeout(() => {
          addCustomCityLabels();
        }, 300);
      };

      // Add labels when style loads (only once)
      map.once("style.load", addLabels);

      // Also add immediately if style is already loaded
      if (map.isStyleLoaded()) {
        addLabels();
      }

      return () => {
        map.off("style.load", addLabels);
      };
    }
  }, [mapLoaded, addCustomCityLabels]);

  // Update labels when cities array changes
  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      const map = mapRef.current.getMap();
      if (map.isStyleLoaded()) {
        addCustomCityLabels();
      }
    }
  }, [cities, mapLoaded, addCustomCityLabels]);

  // Update map style based on time of day (real-time)
  useEffect(() => {
    const updateStyleBasedOnTime = () => {
      const timeOfDay = getTimeOfDay();
      const newStyle = timeOfDay === "day" ? dayStyle : nightStyle;

      console.log(`🔍 Debug - Time of day: ${timeOfDay}`);
      console.log(`🔍 Debug - Selected style:`, newStyle);
      console.log(`🔍 Debug - Day style URL:`, dayStyle);
      console.log(`🔍 Debug - Night style URL:`, nightStyle);
      console.log(`🔍 Debug - Current mapStyle:`, mapStyle);

      // Only update if style actually changed
      if (newStyle !== mapStyle) {
        console.log(`🔄 Switching to ${timeOfDay} style:`, newStyle);
        setMapStyle(newStyle);
      } else {
        console.log(`✅ Style already correct (${timeOfDay})`);
      }
    };

    // Update immediately
    updateStyleBasedOnTime();

    // Check every 5 minutes to update style if time of day changed
    const interval = setInterval(updateStyleBasedOnTime, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [mapStyle, dayStyle, nightStyle]);

  // Log current style on mount for verification
  useEffect(() => {
    const timeOfDay = getTimeOfDay();
    const currentStyle = timeOfDay === "day" ? dayStyle : nightStyle;
    console.log(`🗺️ Map initialized with ${timeOfDay} style:`, currentStyle);
    console.log(`📅 Current time: ${new Date().toLocaleTimeString()}`);
    console.log(`☀️ Day style: ${dayStyle}`);
    console.log(`🌙 Night style: ${nightStyle}`);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".city-dropdown-container")) {
        setIsDropdownOpen(false);
        setSearchQuery("");
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className='w-full h-[600px] md:h-[700px] rounded-3xl overflow-hidden shadow-lg relative'>
      {/* City Dropdown */}
      <div className='absolute top-4 left-4 z-10 city-dropdown-container'>
        <div className='relative'>
          <button
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              if (isDropdownOpen) {
                setSearchQuery("");
              }
            }}
            className='bg-white/90 backdrop-blur-md rounded-lg px-4 py-2 shadow-lg border border-white/20 flex items-center gap-2 hover:bg-white transition-colors font-medium text-black'
          >
            <span>Select City</span>
            <span className='text-lg'>{isDropdownOpen ? "▲" : "▼"}</span>
          </button>

          {isDropdownOpen && (
            <div className='absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-white/20 overflow-hidden min-w-[250px] max-h-[400px] flex flex-col'>
              <div className='p-2 border-b border-black/10'>
                <input
                  type='text'
                  placeholder='Search cities...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full px-3 py-2 rounded-md border border-black/20 focus:outline-none focus:ring-2 focus:ring-neon-green/50 text-sm text-black placeholder:text-gray-500'
                  autoFocus
                />
              </div>
              <div className='overflow-y-auto max-h-[350px]'>
                {filteredCities.length > 0 ? (
                  filteredCities.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => handleCitySelect(city)}
                      className='w-full text-left px-4 py-2 hover:bg-neon-green/20 hover:text-black transition-colors text-sm font-medium text-black border-b border-black/5 last:border-b-0'
                    >
                      {city.name}
                    </button>
                  ))
                ) : (
                  <div className='px-4 py-3 text-sm text-gray-500 text-center'>
                    No cities found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Map
        ref={mapRef}
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
      >
        {mapLoaded &&
          cities.map((city) => (
            <Marker
              key={city.id}
              longitude={city.longitude}
              latitude={city.latitude}
              anchor='bottom'
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setSelectedCity(city);
              }}
            >
              <div className='cursor-pointer'>
                <div className='bg-neon-green rounded-full w-6 h-6 border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform'>
                  <div className='bg-black rounded-full w-3 h-3'></div>
                </div>
              </div>
            </Marker>
          ))}

        {mapLoaded && selectedCity && (
          <Popup
            longitude={selectedCity.longitude}
            latitude={selectedCity.latitude}
            anchor='bottom'
            offset={[0, -10]}
            onClose={() => setSelectedCity(null)}
            closeButton={true}
            closeOnClick={false}
            className='mapbox-popup'
          >
            <div className='p-2 text-center min-w-[200px] max-w-[200px]'>
              {selectedCity.spotted !== undefined && (
                <div className='mb-2 pb-2 border-b border-gray-200'>
                  <p className='text-xl text-black font-groen'>Spotted</p>
                  <p className='text-base font-semibold text-black mt-1'>
                    📍 {selectedCity.spotted.toLocaleString()} places
                  </p>
                </div>
              )}
              <h3 className='font-bold text-lg font-groen'>
                {selectedCity.name}
              </h3>
              {selectedCity.description && (
                <p className='text-sm text-gray-600 mt-1'>
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
