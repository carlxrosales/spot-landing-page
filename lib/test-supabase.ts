import { supabase } from './supabase';

/**
 * Test function to fetch places from Supabase
 * This helps us understand your database schema
 */
export async function testSupabaseConnection() {
  if (!supabase) {
    console.error('Supabase not configured');
    return null;
  }

  try {
    // Try to get a sample of data to understand the schema
    // Adjust table name based on your actual table
    const { data, error } = await supabase
      .from('places') // Change this to your actual table name
      .select('*')
      .limit(5); // Just get 5 rows to see the structure

    if (error) {
      console.error('Error fetching data:', error);
      return { error: error.message };
    }

    console.log('Sample data from Supabase:', data);
    return { data, count: data?.length || 0 };
  } catch (error: any) {
    console.error('Error in testSupabaseConnection:', error);
    return { error: error.message };
  }
}

/**
 * Count places in a specific city
 * Adjust table name and column names based on your schema
 */
export async function countPlacesInCity(cityName: string) {
  if (!supabase) {
    console.error('Supabase not configured');
    return 0;
  }

  try {
    // Option 1: If you have a city column
    const { count, error } = await supabase
      .from('places') // Change to your table name
      .select('*', { count: 'exact', head: true })
      .ilike('city', `%${cityName}%`); // Change 'city' to your column name

    if (error) {
      console.error('Error counting places:', error);
      // Try alternative query
      return await countPlacesAlternative(cityName);
    }

    return count || 0;
  } catch (error: any) {
    console.error('Error in countPlacesInCity:', error);
    return 0;
  }
}

/**
 * Alternative counting method - get all and count in JavaScript
 */
async function countPlacesAlternative(cityName: string) {
  if (!supabase) return 0;

  try {
    const { data, error } = await supabase
      .from('places') // Change to your table name
      .select('city'); // Change to your city column name

    if (error) {
      console.error('Error fetching places:', error);
      return 0;
    }

    // Count places matching the city name
    const count = data?.filter((place: any) => {
      const placeCity = place.city?.toLowerCase() || '';
      return placeCity.includes(cityName.toLowerCase()) || 
             cityName.toLowerCase().includes(placeCity);
    }).length || 0;

    return count;
  } catch (error) {
    console.error('Error in countPlacesAlternative:', error);
    return 0;
  }
}

