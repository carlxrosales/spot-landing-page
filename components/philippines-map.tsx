"use client";

import { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl/mapbox";

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
  const [viewState, setViewState] = useState({
    longitude: 121.774, // Manila center
    latitude: 14.5995,
    zoom: 5.5,
  });

  // Map style - change this to update the map design
  const mapStyle = "mapbox://styles/imsohungry/cmi9dhn3x002n01r9hiytcabs";

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
      zoom: 12,
    });
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        key={mapStyle}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        onLoad={() => setMapLoaded(true)}
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
            anchor='top'
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
