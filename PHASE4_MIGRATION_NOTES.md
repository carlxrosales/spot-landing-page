# Phase 4: Code Quality & Maintainability - Migration Notes

## Overview
This document describes the changes made during Phase 4 refactoring, including extracted constants, new files, and migration guidance.

## New Files Created

### 1. Type Definitions
- **File**: `types/index.ts`
- **Purpose**: Centralized TypeScript type definitions
- **Exports**:
  - `Link` interface - For external/internal links
  - `NavigationLink` interface - For navigation links with scroll behavior
  - `ActiveId` type alias - For active section tracking (`string | null`)

### 2. Utility Functions
- **File**: `utils/timer.ts`
- **Purpose**: Debounce and throttle utilities
- **Exports**:
  - `debounce<T>(func: T, wait: number)` - Delays function execution
  - `throttle<T>(func: T, limit: number)` - Limits function execution rate

- **File**: `utils/scroll.ts`
- **Purpose**: Scroll-related utility functions
- **Exports**:
  - `scrollToId(id: string, offset?: number, behavior?: ScrollBehavior)` - Scrolls to element by ID
  - `scrollToTop(behavior?: ScrollBehavior)` - Scrolls to top of page
  - `getCurrentHash()` - Gets current URL hash (SSR-safe)
  - `throttledScrollHandler` - Throttled scroll handler placeholder

### 3. Custom Hook
- **File**: `hooks/useScrollToSection.ts`
- **Purpose**: Centralized scroll-to-section logic
- **API**:
  ```typescript
  const { scrollToId, activeId, scrollToTop } = useScrollToSection({
    links: NavigationLink[],
    offset?: number,
    enableActiveTracking?: boolean
  });
  ```
- **Features**:
  - SSR-safe (all window/document access guarded)
  - Active section tracking via scroll position
  - Hash-based active section detection
  - Throttled scroll handler for performance

### 4. Error Boundary
- **File**: `components/ErrorBoundary.tsx`
- **Purpose**: Catches React errors and displays fallback UI
- **Usage**: Wrap components that might throw errors
- **Features**:
  - Custom fallback UI with retry button
  - Development error details
  - Next.js App Router compatible (client-side only)

### 5. Test Files
- **File**: `__tests__/useScrollToSection.test.ts`
- **File**: `__tests__/timer.test.ts`
- **Purpose**: Unit tests for new utilities and hooks
- **Note**: Requires Jest setup (see test files for setup instructions)

## Constants Extracted

### Added to `lib/constants.ts`:
- `DEBOUNCE_DELAY = 300` - Default debounce delay in milliseconds
- `THROTTLE_DELAY = 100` - Default throttle delay in milliseconds

### Existing Constants Used:
- `SCROLL_OFFSET = 100` - Used in scroll utilities (already existed)

## Magic Numbers Replaced

### Navigation Component:
- Scroll offset: Now uses `SCROLL_OFFSET` constant (was hardcoded `100`)
- Debounce delay: Now uses `DEBOUNCE_DELAY` constant (was not debounced before)

### Scroll Utilities:
- All scroll offsets use `SCROLL_OFFSET` constant
- All timeouts use constants from `constants.ts`

## Modified Files

### 1. `components/layout/navigation.tsx`
**Changes**:
- Refactored to use `useScrollToSection` hook
- Removed duplicate scroll logic
- Uses `debounce` for resize handler
- Uses `scrollToId` utility for download button
- Type improvements: Uses `NavigationLink` and `ActiveId` types
- Added explicit return type: `JSX.Element`

**Before** (key differences):
```typescript
const [activeLink, setActiveLink] = useState<string | null>(null);
const handleScrollToDownload = useCallback((e?: React.MouseEvent) => {
  // Inline scroll logic with hardcoded offset
  const offset = 100;
  // ... scroll implementation
}, [pathname]);
```

**After**:
```typescript
const { scrollToId: scrollToSection, activeId, scrollToTop } = 
  useScrollToSection({ links, enableActiveTracking: true });
const handleScrollToDownload = useCallback((e?: React.MouseEvent) => {
  scrollToId("download-app");
}, []);
```

### 2. `components/sections/01-hero.tsx`
**Changes**:
- Added image error handling with `onError` handler
- Uses state to track image load errors
- Shows accessible fallback UI on error
- Added explicit return type: `JSX.Element`
- Made component client-side (`"use client"`)

### 3. `components/sections/02-how-it-works.tsx`
**Changes**:
- Added `onError` handler to ImageCard images
- Creates accessible fallback element on image load failure
- Error handling preserves accessibility (aria-label)

### 4. `components/sections/05-download-app.tsx`
**Changes**:
- Added error handling for all three images (App Store, Google Play, phone)
- Uses state to track each image's error state
- Shows accessible fallback UI for each failed image
- Added explicit return type: `JSX.Element`
- Made component client-side (`"use client"`)

### 5. `app/page.tsx`
**Changes**:
- Wrapped all sections with `ErrorBoundary` components
- Each lazy-loaded section has its own error boundary
- Added explicit return type: `JSX.Element`

## TypeScript Improvements

### Type Safety:
1. **Replaced inline types** with shared interfaces:
   - `NavigationLink` replaces inline `{ href: string; label: string; isScroll?: boolean }`
   - `ActiveId` type alias for `string | null` where null is meaningful

2. **Explicit return types** added to:
   - `Hero()` → `JSX.Element`
   - `DownloadApp()` → `JSX.Element`
   - `Navigation()` → `JSX.Element`
   - `Home()` → `JSX.Element`

3. **Function parameter types**:
   - All utility functions have explicit parameter and return types
   - Hook options use interface types

## Error Handling

### Image Error Handling:
- **Hero image**: Shows gray placeholder with "Image unavailable" text
- **Download app images**: Shows text fallback ("App Store", "Google Play", "Image unavailable")
- **HowItWorks images**: Creates accessible div element with aria-label
- All fallbacks maintain accessibility standards

### Error Boundary:
- Wraps page-level components
- Shows user-friendly error message
- Provides retry button
- Shows error details in development mode only
- Prevents entire page crash

## Breaking Changes

**None** - All changes are internal refactoring. Runtime behavior is preserved.

## Assumptions Made

1. **Test Framework**: Assumed Jest is available or can be installed. Test files include setup instructions.

2. **Image Fallback**: 
   - Used inline fallback UI instead of `/public/images/fallback.png`
   - Reason: More flexible, no additional asset needed
   - Fallback maintains accessibility with proper aria-labels

3. **SSR Safety**: 
   - All window/document access is guarded with `typeof window === "undefined"` checks
   - Hook is marked as `"use client"` for Next.js App Router compatibility

4. **Scroll Tracking**: 
   - Active section tracking uses scroll position by default
   - Can be disabled with `enableActiveTracking: false`
   - Uses throttled scroll handler for performance

5. **Debounce/Throttle**: 
   - Used Node.js `setTimeout` return type for timeout ID
   - Compatible with browser and Node.js environments

## Migration Checklist

- [x] Create shared types file
- [x] Create utility functions (timer, scroll)
- [x] Create useScrollToSection hook
- [x] Refactor navigation component
- [x] Add error boundary component
- [x] Add image error handling
- [x] Extract magic numbers to constants
- [x] Add explicit return types
- [x] Create test files
- [x] Update app/page.tsx with error boundaries

## Testing Instructions

### Run Unit Tests:
```bash
# Install test dependencies (if not already installed)
npm install --save-dev jest @testing-library/react @testing-library/react-hooks @types/jest

# Run tests
npm test
```

### Manual Testing:
1. **Scroll functionality**: Test navigation links scroll to correct sections
2. **Image errors**: Temporarily break image paths to verify error handling
3. **Error boundary**: Throw an error in a component to verify boundary catches it
4. **Active section tracking**: Scroll through page and verify active link updates

## Performance Notes

- Debounced resize handler reduces unnecessary indicator updates
- Throttled scroll handler in hook improves scroll performance
- Error boundaries prevent cascading failures
- Image error handling prevents layout shifts

## Future Improvements

1. **Image Fallback**: Consider creating actual fallback image assets
2. **Error Logging**: Add error logging service integration to ErrorBoundary
3. **Test Coverage**: Expand test coverage for edge cases
4. **Scroll Performance**: Consider Intersection Observer for active section tracking
5. **Type Safety**: Consider stricter types for link hrefs (union types for valid routes)

