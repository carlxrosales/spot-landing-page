import { supabase } from "./supabase";
import type { City } from "@/components/philippines-map";

// Base city data with coordinates
const baseCities: Omit<City, "spotted">[] = [
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
    id: "trece-martires",
    name: "Trece Martires",
    latitude: 14.2833,
    longitude: 120.8667,
    description: "Cavite - Capital of Cavite province",
  },
];

// City name mapping for matching addresses to cities
// All names are lowercase for consistent matching
const cityNameMapping: Record<string, string[]> = {
  indang: ["indang"],
  tagaytay: ["tagaytay"],
  manila: ["manila"],
  caloocan: ["caloocan"],
  makati: ["makati"],
  malabon: ["malabon"],
  mandaluyong: ["mandaluyong"],
  marikina: ["marikina"],
  pasay: ["pasay"],
  "quezon-city": ["quezon city", "quezon", "qc"],
  taguig: ["taguig"],
  valenzuela: ["valenzuela"],
  "trece-martires": ["trece martires", "trece"],
};

/**
 * Count places in a city by matching city name in address
 */
function countPlacesInCity(address: string, cityNames: string[]): boolean {
  const addressLower = address.toLowerCase();
  return cityNames.some((cityName) => addressLower.includes(cityName));
}

/**
 * Fetch cities with spotted counts from Supabase
 * Uses address column to identify which city each place belongs to
 */
export async function getCitiesWithCounts(): Promise<City[]> {
  // If Supabase is not configured, return base cities with 0 counts
  if (!supabase) {
    return baseCities.map((city) => ({ ...city, spotted: 0 }));
  }

  try {
    const { data, error } = await supabase.from("places").select("address");

    if (error) {
      console.error("Error fetching places:", error.message);
      return baseCities.map((city) => ({ ...city, spotted: 0 }));
    }

    if (!data || data.length === 0) {
      return baseCities.map((city) => ({ ...city, spotted: 0 }));
    }

    // Initialize counts for all cities
    const cityCounts: Record<string, number> = {};
    baseCities.forEach((city) => {
      cityCounts[city.id] = 0;
    });

    /**
     * Extract city from address by taking the third comma-separated segment from the end
     * Address format: "Street, Barangay, City, Province, Country"
     * Returns the city ID if the third-from-last segment matches a known city
     */
    const extractCityFromAddress = (address: string): string | null => {
      if (!address || !address.trim()) return null;

      // Split address by commas and trim each part
      const parts = address
        .split(",")
        .map((part) => part.trim())
        .filter((part) => part.length > 0);

      // Need at least 3 parts to have a "third from last"
      if (parts.length < 3) return null;

      // Get the third from last part (index: length - 3)
      const cityCandidate = parts[parts.length - 3].toLowerCase();

      // Check if this matches any known city
      for (const [cityId, cityNames] of Object.entries(cityNameMapping)) {
        // Check if the city candidate matches any variation of the city name
        const matches = cityNames.some((cityName) => {
          const cityNameLower = cityName.toLowerCase();
          // Check for exact match or if city candidate contains the city name
          return (
            cityCandidate === cityNameLower ||
            cityCandidate.includes(cityNameLower) ||
            cityNameLower.includes(cityCandidate)
          );
        });

        if (matches) {
          return cityId;
        }
      }

      return null;
    };

    // Count places per city by extracting city from each address
    data.forEach((place: { address?: string }) => {
      const address = place.address || "";
      if (!address) return;

      // Extract the city from the address
      const matchedCityId = extractCityFromAddress(address);

      // Count the match (only once per place)
      if (matchedCityId) {
        cityCounts[matchedCityId] = (cityCounts[matchedCityId] || 0) + 1;
      }
    });

    // Log summary (only in development)
    if (process.env.NODE_ENV === "development") {
      console.log("City counts from Supabase:", cityCounts);
      console.log("Total places processed:", data.length);
    }

    // Merge base cities with counts
    return baseCities.map((city) => ({
      ...city,
      spotted: cityCounts[city.id] || 0,
    }));
  } catch (error) {
    console.error("Error in getCitiesWithCounts:", error);
    return baseCities.map((city) => ({ ...city, spotted: 0 }));
  }
}
