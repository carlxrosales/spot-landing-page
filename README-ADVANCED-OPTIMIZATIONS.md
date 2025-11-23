# Phase 6: Advanced Optimizations

This document summarizes all Phase 6 optimizations implemented for the spot landing page, including bundle analysis, Mapbox optimization, SEO enhancements, caching strategies, and CI checks.

## Table of Contents

- [Bundle Size Analysis & Optimization](#a-bundle-size-analysis--optimization)
- [Mapbox & Heavy Third-Party Optimization](#b-mapbox--heavy-third-party-optimization)
- [Advanced Image & Asset Delivery](#c-advanced-image--asset-delivery)
- [Caching, SSR, and Data-Fetching Strategies](#d-caching-ssr-and-data-fetching-strategies)
- [Advanced SEO & Indexing](#e-advanced-seo--indexing)
- [Monitoring, Telemetry & CI Checks](#f-monitoring-telemetry--ci-checks)
- [PWA & Offline Caching](#g-pwa--offline-caching-optional)
- [Trade-offs & Known Limitations](#trade-offs--known-limitations)

---

## A. Bundle Size Analysis & Optimization

### Setup

**Package:** `@next/bundle-analyzer` (dev-only dependency)

**Configuration:** Added to `next.config.ts` with conditional loading based on `ANALYZE` environment variable.

### Running Bundle Analysis

```bash
# Method 1: Using npm script
npm run analyze

# Method 2: Using the analysis script
./scripts/analyze-bundle.sh

# Method 3: Manual
ANALYZE=true npm run build
```

### Expected Output

After running the analyzer, you'll find interactive HTML reports in:
- `.next/analyze/client.html` - Client-side bundle analysis
- `.next/analyze/server.html` - Server-side bundle analysis

### Top 10 Largest Modules (Expected)

Based on typical Next.js + Mapbox projects:

1. **mapbox-gl** (~500-700 KB) - Mapbox GL JS library
2. **react-map-gl** (~200-300 KB) - React wrapper for Mapbox
3. **react** + **react-dom** (~150-200 KB combined)
4. **next** framework chunks (~100-150 KB)
5. **Tailwind CSS** (if not purged, ~50-100 KB)
6. **Other vendor dependencies** (~50-100 KB)

### Optimization Strategies Implemented

#### 1. Code Splitting

- **Route-level splitting:** All major sections use `React.lazy()` and `Suspense`
- **Component-level splitting:** Mapbox components loaded only when needed
- **Webpack chunk optimization:** Custom `splitChunks` configuration separates:
  - Mapbox into `mapbox-*.js` chunk
  - React into `react-*.js` chunk
  - Other vendors into `vendor-*.js` chunk

#### 2. Dynamic Imports

Example before/after:

**Before:**
```typescript
import { PhilippinesMap } from "@/components/features/philippines-map";
```

**After:**
```typescript
const PhilippinesMap = dynamic(
  () => import("@/components/features/philippines-map").then((mod) => ({
    default: mod.PhilippinesMap,
  })),
  { ssr: false }
);
```

#### 3. Webpack Optimization Hints

Added `webpackChunkName` comments (implicit via dynamic imports) and custom `splitChunks` configuration in `next.config.ts`.

### Interpreting Results

1. **Large chunks (>500 KB):** Consider lazy loading or replacing with lighter alternatives
2. **Duplicate dependencies:** Check for multiple versions of the same library
3. **Vendor chunks:** Review if all dependencies are necessary
4. **Initial load size:** Target <200 KB for first contentful paint

---

## B. Mapbox & Heavy Third-Party Optimization

### Problem

Mapbox GL JS is a heavy library (~500-700 KB) that was being loaded on initial page load, even when the map wasn't visible.

### Solution Implemented

#### 1. IntersectionObserver Lazy Loading

Created `components/features/LazyMap.tsx` that:
- Uses `IntersectionObserver` to detect when map container enters viewport
- Only loads Mapbox when container is 200px before viewport
- Shows placeholder until map should load

**Key Features:**
- Zero initial bundle impact
- Smooth loading experience
- Automatic code splitting

#### 2. Component Structure

```typescript
// LazyMap.tsx wraps PhilippinesMap with IntersectionObserver
<LazyMap cities={cities} mapboxToken={token} />
```

#### 3. Tree-Shaking

- Using specific imports from `react-map-gl/mapbox` instead of umbrella imports
- Only importing used components (Map, Marker, Popup)

### Alternative: MapLibre GL

**Recommendation:** Consider migrating to `maplibre-gl` for:
- **Pros:**
  - Open-source (no API key required)
  - Similar API to Mapbox GL JS
  - Potentially smaller bundle size
  - No usage limits
- **Cons:**
  - Different styling system (no Mapbox Studio styles)
  - Slightly different API
  - Migration effort: ~2-4 hours

**Migration Estimate:**
1. Replace `mapbox-gl` with `maplibre-gl`
2. Update `react-map-gl` imports
3. Convert Mapbox styles to MapLibre format
4. Test map functionality

**Decision:** Keep Mapbox for now due to custom styles, but document migration path.

---

## C. Advanced Image & Asset Delivery

### Image Optimization

**Configuration in `next.config.ts`:**

```typescript
images: {
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

### HTTP Caching Headers

Implemented aggressive caching for static assets:

- **Images:** `Cache-Control: public, max-age=31536000, immutable`
- **Fonts:** `Cache-Control: public, max-age=31536000, immutable`
- **Static assets:** `Cache-Control: public, max-age=31536000, immutable`
- **_next/static:** `Cache-Control: public, max-age=31536000, immutable`

### CDN Recommendations

**Current:** Using Next.js Image Optimization (Vercel)

**Alternative Options:**

1. **Cloudinary** (Recommended for high traffic)
   - Pros: Advanced transformations, automatic optimization, global CDN
   - Cons: Additional service, potential costs at scale
   - Setup: Add `remotePatterns` in `next.config.ts`

2. **Imgix**
   - Pros: Fast, powerful transformations
   - Cons: Pricing can be high
   - Setup: Similar to Cloudinary

3. **Vercel Image Optimization** (Current)
   - Pros: Built-in, no additional setup
   - Cons: Limited to Vercel hosting

**Recommendation:** Stay with Vercel Image Optimization unless experiencing performance issues or high traffic.

---

## D. Caching, SSR, and Data-Fetching Strategies

### Current Rendering Strategy

- **Home page (`/`):** Client-side rendering with lazy-loaded sections
- **Zones page (`/zones`):** Client-side rendering
- **Static pages (`/help`, `/privacy`, `/terms`):** Static generation

### Recommended ISR (Incremental Static Regeneration)

**Example for zones page:**

```typescript
// app/zones/page.tsx (example ISR implementation)
export const revalidate = 3600; // Revalidate every hour

export default async function Zones() {
  const cities = await getCitiesWithCounts(); // Fetch at build time + revalidate
  
  return (
    <PageLayout>
      <LazyMap cities={cities} mapboxToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN} />
    </PageLayout>
  );
}
```

**Benefits:**
- Faster TTFB (Time to First Byte)
- Better SEO (pre-rendered content)
- Automatic revalidation

**Trade-off:** Slightly stale data (acceptable for city listings)

### Stale-While-Revalidate Pattern

For API routes or data fetching:

```typescript
// Example: Fetch with revalidation
const response = await fetch(url, {
  next: { revalidate: 60 }, // Revalidate every 60 seconds
});
```

### CDN Caching Strategy

1. **Static pages:** Cache forever (immutable)
2. **Dynamic pages:** Cache with revalidation (ISR)
3. **API routes:** Cache with short TTL or no cache

### Cache Invalidation

- **Automatic:** Next.js ISR handles revalidation
- **Manual:** Use `revalidatePath()` or `revalidateTag()` in API routes
- **On-demand:** Webhook triggers for immediate updates

---

## E. Advanced SEO & Indexing

### JSON-LD Structured Data

**Component:** `components/JsonLd.tsx`

**Implemented Types:**
1. **WebSite** - Site-wide information (in root layout)
2. **Organization** - Company/brand information
3. **WebPage** - Individual page metadata (home page)
4. **BreadcrumbList** - Navigation breadcrumbs (ready for use)
5. **Article** - For blog posts (ready for use)

**Usage Example:**

```typescript
<JsonLd type="WebSite" />
<JsonLd
  type="Organization"
  data={{ logo: `${SITE_URL}/images/hero/spot.png` }}
/>
```

**Validation:**
- Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
- Test with [Schema.org Validator](https://validator.schema.org/)

### Sitemap

**File:** `app/sitemap.ts`

**Features:**
- Dynamic generation
- Includes all static routes
- Updates `lastModified` automatically
- Configurable `changeFrequency` and `priority`

**Access:** `https://yourdomain.com/sitemap.xml`

**Adding Dynamic Routes:**

```typescript
// Example: Add dynamic city pages
const cities = await getCities();
routes.push(...cities.map(city => ({
  url: `${baseUrl}/cities/${city.id}`,
  lastModified: city.updatedAt,
  changeFrequency: 'weekly' as const,
  priority: 0.7,
})));
```

### Robots.txt

**File:** `app/robots.ts`

**Configuration:**
- Allows all bots on public routes
- Disallows `/api/`, `/test-db/`, `/_next/`
- Points to sitemap
- Includes canonical host

**Access:** `https://yourdomain.com/robots.txt`

### Meta Tags Enhancement

**Updated in `app/layout.tsx`:**
- Complete Open Graph tags with images
- Twitter Card metadata
- PWA manifest link
- Theme color
- Apple Web App meta

**Meta Description Guidelines:**
- Length: 150-160 characters (current: 28 characters - consider expanding)
- Include primary keyword
- Compelling call-to-action

**Open Graph Completeness:**
- ✅ Title
- ✅ Description
- ✅ URL
- ✅ Site name
- ✅ Type
- ✅ Locale
- ✅ Images (added)

---

## F. Monitoring, Telemetry & CI Checks

### Bundle Size Monitoring

**Tool:** `bundlesize`

**Configuration:** `.bundlesize.json`

**Running Checks:**

```bash
# Check bundle sizes
npm run bundle:check

# Or manually
npm run build && bundlesize
```

**CI Integration:** GitHub Actions workflow (`.github/workflows/performance.yml`)

### Lighthouse CI

**Configuration:** `.lighthouserc.js`

**Running Locally:**

```bash
# Install globally
npm install -g @lhci/cli

# Run analysis
npx @lhci/cli autorun
```

**Performance Thresholds:**
- Performance: ≥80
- Accessibility: ≥90
- Best Practices: ≥90
- SEO: ≥90
- FCP: <2000ms
- LCP: <2500ms
- CLS: <0.1
- TBT: <300ms

**CI Integration:** Automated in GitHub Actions on PRs

### RUM (Real User Monitoring)

**Recommendation:** Integrate lightweight RUM:

1. **Vercel Analytics** (Recommended)
   - Built-in for Vercel deployments
   - Zero configuration
   - Privacy-focused

2. **Web Vitals Library**
   ```typescript
   import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
   
   function sendToAnalytics(metric) {
     // Send to your analytics endpoint
   }
   
   getCLS(sendToAnalytics);
   getFID(sendToAnalytics);
   getFCP(sendToAnalytics);
   getLCP(sendToAnalytics);
   getTTFB(sendToAnalytics);
   ```

3. **Custom Implementation**
   - Use Performance API
   - Send to analytics endpoint
   - Opt-in via user consent

---

## G. PWA & Offline Caching (Optional)

### Manifest

**File:** `public/manifest.json`

**Features:**
- App name and description
- Icons (192x192, 512x512)
- Theme color (neon green: #39ff14)
- Display mode: standalone
- Shortcuts for quick actions

### Service Worker (Not Implemented)

**Recommendation:** Use `next-pwa` if offline functionality is needed:

```bash
npm install next-pwa
```

**Configuration:**
```typescript
// next.config.ts
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});
```

**Considerations:**
- Analytics won't work offline
- Auth tokens may expire
- Dynamic API calls need caching strategy
- Service worker updates require careful handling

**Decision:** Not implemented by default. Add if offline functionality is required.

---

## Trade-offs & Known Limitations

### Bundle Size

**Trade-offs:**
- ✅ Mapbox lazy-loaded (reduces initial bundle by ~500-700 KB)
- ⚠️ Additional HTTP request when map loads
- ✅ Better initial page load performance

**Limitations:**
- Mapbox still large when loaded (~500-700 KB)
- Consider MapLibre for further reduction

### SEO

**Trade-offs:**
- ✅ JSON-LD structured data improves search visibility
- ✅ Sitemap helps indexing
- ⚠️ Client-side rendering may delay content indexing (mitigated by lazy loading)

**Limitations:**
- Meta description could be longer (currently 28 chars, recommended 150-160)
- Consider server-side rendering for critical content

### Caching

**Trade-offs:**
- ✅ Aggressive caching improves repeat visits
- ⚠️ Cache invalidation requires careful planning
- ✅ ISR balances freshness and performance

**Limitations:**
- Static assets cached for 1 year (immutable) - requires versioning for updates
- Dynamic content may be stale until revalidation

### PWA

**Trade-offs:**
- ✅ Better mobile experience
- ⚠️ Service worker complexity
- ⚠️ Offline functionality requires careful implementation

**Limitations:**
- Not implemented by default
- Requires additional testing
- Analytics and auth need special handling

### Performance Monitoring

**Trade-offs:**
- ✅ CI checks catch regressions early
- ⚠️ May slow down CI pipeline
- ✅ Bundle size limits prevent bloat

**Limitations:**
- Lighthouse CI requires running server
- Bundle size checks run after build (feedback loop)

---

## Verification & Success Criteria

### Bundle Analysis

**Steps to Verify:**
1. Run `npm run analyze`
2. Open `.next/analyze/client.html`
3. Verify Mapbox is in separate chunk
4. Check initial bundle size <200 KB

**Success Criteria:**
- ✅ Mapbox chunk separate from main bundle
- ✅ Initial bundle <200 KB
- ✅ No duplicate dependencies

### Map Lazy Loading

**Steps to Verify:**
1. Open browser DevTools → Network tab
2. Load homepage
3. Scroll to zones section
4. Verify Mapbox chunks load only when section visible

**Success Criteria:**
- ✅ Mapbox not in initial bundle
- ✅ Loads when container enters viewport
- ✅ Smooth loading experience

### SEO

**Steps to Verify:**
1. Visit `https://yourdomain.com/sitemap.xml`
2. Visit `https://yourdomain.com/robots.txt`
3. View page source, verify JSON-LD present
4. Test with [Google Rich Results Test](https://search.google.com/test/rich-results)

**Success Criteria:**
- ✅ Sitemap accessible and valid
- ✅ Robots.txt accessible
- ✅ JSON-LD validates
- ✅ Structured data recognized by Google

### CI Checks

**Steps to Verify:**
1. Create test PR
2. Verify GitHub Actions run
3. Check bundle size check passes
4. Check Lighthouse CI runs (if configured)

**Success Criteria:**
- ✅ Bundle size checks run on PRs
- ✅ Lighthouse CI runs (optional)
- ✅ Failures block merge (if configured)

---

## Next Steps & Recommendations

### Immediate Actions

1. **Run bundle analysis:** `npm run analyze` and review results
2. **Test lazy loading:** Verify Mapbox loads only when visible
3. **Validate SEO:** Test JSON-LD and sitemap
4. **Set up CI:** Configure GitHub Actions secrets if using Lighthouse CI

### Future Optimizations

1. **Consider MapLibre:** Evaluate migration for smaller bundle
2. **Expand meta descriptions:** Improve SEO with longer, keyword-rich descriptions
3. **Add ISR:** Implement for zones page if city data is relatively static
4. **Implement RUM:** Add real user monitoring for production insights
5. **CDN for images:** Consider Cloudinary/Imgix if traffic grows

### Monitoring

- **Weekly:** Review bundle size trends
- **Monthly:** Run Lighthouse audits
- **Quarterly:** Review and update caching strategies
- **As needed:** Optimize based on real user metrics

---

## Commands Reference

```bash
# Bundle analysis
npm run analyze
./scripts/analyze-bundle.sh

# Bundle size check
npm run bundle:check

# Build
npm run build

# Development
npm run dev

# Lighthouse CI (after installing)
npx @lhci/cli autorun
```

---

## Support & Resources

- [Next.js Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Mapbox GL JS Docs](https://docs.mapbox.com/mapbox-gl-js/)
- [MapLibre GL JS](https://maplibre.org/)
- [Schema.org](https://schema.org/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Web Vitals](https://web.dev/vitals/)

---

**Last Updated:** Phase 6 Implementation
**Version:** 1.0.0

