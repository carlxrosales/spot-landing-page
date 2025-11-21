# Mapbox Integration Guide

This guide explains how Mapbox is integrated into the zones section to display Philippine cities.

## Overview

[Mapbox](https://www.mapbox.com/) is a location data platform that provides mapping, navigation, and geocoding services. We're using **Mapbox GL JS** (via `react-map-gl`) to display an interactive map showing cities in the Philippines where spot is available.

## Setup

### 1. Get a Mapbox Access Token

1. Sign up for a free account at [mapbox.com](https://www.mapbox.com/)
2. Go to [Account → Access Tokens](https://account.mapbox.com/access-tokens/)
3. Copy your default public token or create a new one
4. Add it to your `.env.local` file:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

### 2. Free Tier Limits

- **50,000 map loads per month** (free tier)
- Perfect for development and small to medium traffic
- No credit card required for free tier

## Components

### `components/philippines-map.tsx`

This component renders the interactive map with markers for each city.

**Features:**
- Interactive map centered on the Philippines
- Custom markers with neon green styling matching your brand
- Clickable markers that show city information in popups
- Smooth zoom and pan interactions

**Props:**
- `cities`: Array of city objects with coordinates and metadata
- `mapboxToken`: Your Mapbox access token

### City Data Structure

```typescript
interface City {
  id: string;           // Unique identifier
  name: string;          // City name
  latitude: number;      // GPS latitude
  longitude: number;     // GPS longitude
  description?: string;  // Optional description
}
```

## Adding Your Scraped Cities

Replace the example cities in `app/zones/page.tsx` with your scraped data:

```typescript
const philippineCities: City[] = [
  {
    id: "manila",
    name: "Manila",
    latitude: 14.5995,
    longitude: 120.9842,
    description: "Capital city of the Philippines",
  },
  // Add your scraped cities here...
];
```

### Getting City Coordinates

If your scraped data doesn't include coordinates, you can:

1. **Use Mapbox Geocoding API** (free tier: 100,000 requests/month):
   ```typescript
   const response = await fetch(
     `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=${token}&country=ph`
   );
   const data = await response.json();
   const [longitude, latitude] = data.features[0].center;
   ```

2. **Use Google Geocoding API** (if you have it set up)

3. **Manual lookup** using tools like [LatLong.net](https://www.latlong.net/)

## Customization

### Map Style

Change the map appearance by modifying the `mapStyle` prop in `philippines-map.tsx`:

- `mapbox://styles/mapbox/light-v11` - Light theme (current)
- `mapbox://styles/mapbox/dark-v11` - Dark theme
- `mapbox://styles/mapbox/streets-v12` - Street map
- `mapbox://styles/mapbox/satellite-v9` - Satellite imagery

Or create custom styles in [Mapbox Studio](https://studio.mapbox.com/).

### Marker Styling

The markers use your brand's neon green color. To customize:

```tsx
<div className="bg-neon-green rounded-full w-6 h-6 border-2 border-white shadow-lg">
  {/* Marker content */}
</div>
```

### Map Center and Zoom

Adjust the initial view in `philippines-map.tsx`:

```typescript
const [viewState, setViewState] = useState({
  longitude: 121.7740, // Manila center
  latitude: 14.5995,
  zoom: 5.5, // Zoom level (higher = more zoomed in)
});
```

## Advanced Features

### Clustering

For many cities, consider adding marker clustering:

```bash
npm install supercluster
```

### Custom Popups

Enhance popups with images, links, or additional data:

```tsx
<Popup>
  <div>
    <img src={city.image} />
    <h3>{city.name}</h3>
    <a href={`/cities/${city.id}`}>Learn more</a>
  </div>
</Popup>
```

### Search Functionality

Add city search using Mapbox Search API:

```typescript
import { useMap } from "react-map-gl";

// Search and fly to city
map.flyTo({
  center: [longitude, latitude],
  zoom: 12,
});
```

## Resources

- [Mapbox GL JS Documentation](https://docs.mapbox.com/mapbox-gl-js/)
- [react-map-gl Documentation](https://visgl.github.io/react-map-gl/)
- [Mapbox Examples](https://docs.mapbox.com/mapbox-gl-js/example/)
- [Mapbox Pricing](https://www.mapbox.com/pricing/)

## Troubleshooting

### Map not showing
- Check that `NEXT_PUBLIC_MAPBOX_TOKEN` is set correctly
- Verify the token is valid in [Mapbox Account](https://account.mapbox.com/)
- Check browser console for errors

### Markers not appearing
- Verify city coordinates are valid (latitude: -90 to 90, longitude: -180 to 180)
- Check that cities array is not empty
- Ensure map has loaded before rendering markers

### Performance issues
- Use marker clustering for 100+ cities
- Consider using static map images for simple use cases
- Implement lazy loading for large datasets

