# Supabase Integration Setup

This guide explains how to connect your Supabase database to display real "spotted" counts on the map.

## 1. Get Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## 2. Add Environment Variables

Add these to your `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token-here
```

## 3. Configure Database Schema

The code expects a table with places data. You need to adjust `lib/cities.ts` based on your actual schema:

### Current Assumptions:
- Table name: `places` (change if different)
- City column: `city` (change if different)

### To Update:

1. Open `lib/cities.ts`
2. Find the `getCitiesWithCounts()` function
3. Update the query:

```typescript
const { data, error } = await supabase
  .from('your_table_name')  // Change this
  .select('your_city_column');  // Change this
```

### Example Queries:

**If your table is called `restaurants` and city column is `location`:**
```typescript
const { data, error } = await supabase
  .from('restaurants')
  .select('location');
```

**If you want to count directly:**
```typescript
// Option 1: Get all and count in JavaScript (current approach)
const { data } = await supabase.from('places').select('city');

// Option 2: Use Supabase count (if you have a city column)
const { count } = await supabase
  .from('places')
  .select('*', { count: 'exact', head: true })
  .eq('city', 'Manila');
```

## 4. City Name Matching

The code matches city names from your database to the predefined cities. Update `cityNameMapping` in `lib/cities.ts` if your database uses different city names:

```typescript
const cityNameMapping: Record<string, string[]> = {
  manila: ['Manila', 'Metro Manila'],  // Add variations
  quezon-city: ['Quezon City', 'QC', 'Quezon'],
  // ... etc
};
```

## 5. Test the Connection

1. Start your dev server: `npm run dev`
2. Check the browser console for any errors
3. The map should load with real counts from your database

## Troubleshooting

### No data showing?
- Check browser console for errors
- Verify your Supabase URL and key are correct
- Check that your table name and column names match
- Ensure your Supabase table has data

### Wrong counts?
- Check the `cityNameMapping` - your database city names might be different
- Add more variations to the mapping arrays
- Check if city names have extra spaces or different casing

### Still using placeholder data?
- Make sure environment variables are set in `.env.local`
- Restart your dev server after adding env variables
- Check that `getCitiesWithCounts()` is being called

## Need Help?

If your schema is different, share:
1. Your table name
2. Column name for city/location
3. Example of how city names are stored in your database

I can help customize the query to match your exact schema!

