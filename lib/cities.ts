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
  baguio: ["baguio"],
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

    // Initialize counts for all known cities
    const cityCounts: Record<string, number> = {};
    baseCities.forEach((city) => {
      cityCounts[city.id] = 0;
    });

    // Track new cities found in database (not in baseCities)
    const newCities: Record<string, { name: string; count: number }> = {};

    /**
     * Extract city name from address by taking STRICTLY the third comma-separated segment from the end
     * Address format: "Street, Barangay, City, Province, Country"
     * Returns the city name (raw) from the address - ONLY from the third from last position
     */
    const extractCityNameFromAddress = (address: string): string | null => {
      if (!address || !address.trim()) return null;

      // Split address by commas and trim each part
      const parts = address
        .split(",")
        .map((part) => part.trim())
        .filter((part) => part.length > 0);

      // Need at least 3 parts to have a "third from last"
      if (parts.length < 3) return null;

      // STRICTLY get the third from last part (index: length - 3)
      // This is the ONLY position we check - no searching elsewhere
      const cityName = parts[parts.length - 3].trim();
      
      return cityName || null;
    };

    /**
     * Get city ID from city name by matching against known cities
     * Returns the city ID if found, or null if it's a new city
     * Handles cases where "City" is appended (e.g., "Marikina City" matches "Marikina")
     * STRICT matching: only matches the exact city name from third-from-last position
     */
    const getCityIdFromName = (cityName: string): string | null => {
      if (!cityName || !cityName.trim()) return null;

      // Normalize the city name: remove "city" suffix and trim
      const normalizedName = cityName
        .toLowerCase()
        .replace(/\s*city\s*$/i, "")
        .trim();

      // Check if this matches any known city
      for (const [cityId, cityNames] of Object.entries(cityNameMapping)) {
        const matches = cityNames.some((cityNameVariant) => {
          const variantLower = cityNameVariant.toLowerCase();
          // Also normalize variant (remove "city" if present)
          const normalizedVariant = variantLower
            .replace(/\s*city\s*$/i, "")
            .trim();

          // STRICT matching: check if normalized names match exactly
          // Or if one contains the other (for cases like "Quezon City" vs "Quezon")
          return (
            normalizedName === normalizedVariant ||
            normalizedName === variantLower ||
            variantLower === normalizedName ||
            (normalizedName.includes(normalizedVariant) && normalizedVariant.length > 2) ||
            (normalizedVariant.includes(normalizedName) && normalizedName.length > 2)
          );
        });

        if (matches) {
          return cityId;
        }
      }

      return null;
    };

    // Count places per city by extracting city from each address
    // STRICT: Only check the third from last comma-separated segment
    let manilaDebugCount = 0;
    let manilaSampleAddresses: string[] = [];

    data.forEach((place: { address?: string }) => {
      const address = place.address || "";
      if (!address) return;

      // STRICTLY extract the city name from the third from last position only
      const cityName = extractCityNameFromAddress(address);
      if (!cityName) return;

      // Debug: Track potential Manila addresses
      const cityNameLower = cityName.toLowerCase();
      if (cityNameLower.includes("manila") || cityNameLower === "manila") {
        manilaDebugCount++;
        if (manilaSampleAddresses.length < 5) {
          manilaSampleAddresses.push(address);
        }
      }

      // Try to match with known city
      const cityId = getCityIdFromName(cityName);

      if (cityId) {
        // Known city - count it
        cityCounts[cityId] = (cityCounts[cityId] || 0) + 1;
      } else {
        // New city - use normalized name as ID
        const normalizedId = cityName
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");

        // Track new city with its original name and count
        if (!newCities[normalizedId]) {
          newCities[normalizedId] = { name: cityName, count: 0 };
        }
        newCities[normalizedId].count += 1;
      }
    });

    // Debug Manila matching
    if (process.env.NODE_ENV === "development") {
      if (manilaDebugCount > 0 && cityCounts.manila === 0) {
        console.warn(
          `Found ${manilaDebugCount} addresses with "manila" in third-from-last position, but Manila count is 0`
        );
        console.log("Sample addresses:", manilaSampleAddresses);
        console.log("Manila city name mapping:", cityNameMapping.manila);
      }
    }

    // Log summary (only in development)
    if (process.env.NODE_ENV === "development") {
      console.log("City counts from Supabase:", cityCounts);
      console.log("New cities found:", newCities);
      console.log("Total places processed:", data.length);
      // Debug: Check Manila specifically
      if (cityCounts.manila === 0) {
        console.warn("Manila has 0 places - checking for matching issues");
        // Sample addresses that might be Manila
        const sampleAddresses = data
          .slice(0, 10)
          .map((p: { address?: string }) => p.address)
          .filter(Boolean);
        console.log("Sample addresses:", sampleAddresses);
      }
    }

    // Build result: include base cities with counts > 0, and add new cities
    const result: City[] = [];

    // Add base cities that have counts > 0 (filter out cities with 0 places)
    // Exception: Always include Manila even if 0 (it's the capital)
    baseCities.forEach((city) => {
      const count = cityCounts[city.id] || 0;
      if (count > 0 || city.id === "manila") {
        result.push({
          ...city,
          spotted: count,
        });
      }
    });

    // Add new cities found in database (not in baseCities)
    for (const [cityId, cityData] of Object.entries(newCities)) {
      // Only add if count > 0
      if (cityData.count > 0) {
        result.push({
          id: cityId,
          name: cityData.name,
          latitude: 14.5995, // Default to Manila coordinates (center of Philippines)
          longitude: 120.9842,
          description: "Philippines",
          spotted: cityData.count,
        });
      }
    }

    return result;
  } catch (error) {
    console.error("Error in getCitiesWithCounts:", error);
    return baseCities.map((city) => ({ ...city, spotted: 0 }));
  }
}
