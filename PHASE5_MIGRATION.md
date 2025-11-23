# Phase 5: Enhanced UX Features - Migration Guide

This document describes the Phase 5 enhancements and how to use them in your project.

## Overview

Phase 5 adds:
- **Loading states** (skeletons, loading hooks)
- **Error & fallback states** (enhanced error boundary, image fallback)
- **Focus management** (skip links, focus traps)
- **Touch & mobile improvements** (touch targets, passive listeners)
- **Perceived performance** (route progress indicators)

---

## 1. Loading States

### Components

#### `components/Skeleton.tsx`
Generic skeleton loader with shimmer animation.

**Usage:**
```tsx
import { Skeleton } from "@/components/Skeleton";

// Basic skeleton
<Skeleton width="100%" height={200} />

// Circular skeleton (for avatars)
<Skeleton width={100} height={100} circle />

// Multi-line text skeleton
<Skeleton lines={3} />
```

#### `components/ImageSkeleton.tsx`
Skeleton specifically designed for images with aspect ratio support.

**Usage:**
```tsx
import { ImageSkeleton } from "@/components/ImageSkeleton";

<ImageSkeleton aspectRatio="16/9" width="100%" />
<ImageSkeleton width={400} height={300} />
```

#### `hooks/useLoading.ts`
Hook for managing loading states in async operations.

**Usage:**
```tsx
import { useLoading } from "@/hooks/useLoading";

function MyComponent() {
  const { isLoading, execute } = useLoading();

  const handleSubmit = async () => {
    await execute(async () => {
      await fetchData();
    });
  };

  return (
    <button onClick={handleSubmit} disabled={isLoading}>
      {isLoading ? "Loading..." : "Submit"}
    </button>
  );
}
```

### When to Use: Skeleton vs Spinner

- **Skeleton**: Use for content that has a predictable layout (images, cards, text blocks). Provides better perceived performance.
- **Spinner**: Use for actions/operations without a predictable layout (form submissions, API calls).

**Example integration in `app/page.tsx`:**
```tsx
import { ImageSkeleton } from "@/components/ImageSkeleton";

const LoadingFallback = () => (
  <div className='h-64 flex items-center justify-center'>
    <ImageSkeleton width="100%" height={256} />
  </div>
);
```

---

## 2. Error & Fallback States

### Enhanced ErrorBoundary

The `ErrorBoundary` component now includes:
- Friendly retry button
- Error telemetry integration via `utils/reportError`
- Better accessibility (ARIA attributes)

**Usage:**
```tsx
import { ErrorBoundary } from "@/components/ErrorBoundary";

<ErrorBoundary componentName="HeroSection">
  <YourComponent />
</ErrorBoundary>
```

### ImageFallback Component

Accessible image component with error recovery.

**Usage:**
```tsx
import { ImageFallback } from "@/components/ImageFallback";

<ImageFallback
  src="/images/hero.png"
  alt="Hero image"
  width={800}
  height={600}
  fallbackSrc="/images/fallback.png" // optional
/>
```

**Note:** Create a fallback image at `/public/images/fallback.png` if you want a custom fallback. The component will use this when the primary image fails to load.

### Error Reporting

The `utils/reportError` function is a placeholder for telemetry integration. To integrate with services like Sentry:

```tsx
// In utils/reportError.ts
if (typeof window !== "undefined" && window.Sentry) {
  window.Sentry.captureException(error, {
    tags: { severity },
    extra: context,
  });
}
```

---

## 3. Focus Management

### Skip to Content Link

Already integrated in `app/layout.tsx`. The link appears when focused (keyboard navigation) and allows users to skip navigation.

**Note:** Ensure your main content has `id="main-content"` (already added to `components/layout/page-layout.tsx`).

### Focus Trap Hook

Use `useFocusTrap` for modals and overlays.

**Usage:**
```tsx
import { useFocusTrap } from "@/hooks/useFocusTrap";

function MyModal({ isOpen, onClose }) {
  const { containerRef } = useFocusTrap({
    isActive: isOpen,
    onEscape: onClose,
    restoreFocus: true,
  });

  return (
    <div ref={containerRef}>
      {/* Modal content */}
    </div>
  );
}
```

### Example Modal

See `components/ExampleModal.tsx` for a complete reference implementation showing:
- Focus trap usage
- Image fallback integration
- Accessible modal patterns
- Keyboard navigation

### Focus Styles

Focus styles are defined in `styles/focus.module.css`. The project already has focus styles in `globals.css`, but you can import the module for additional utilities:

```tsx
import styles from "@/styles/focus.module.css";

<button className={styles.focusButton}>Click me</button>
```

**Tailwind equivalent** (already used in project):
```tsx
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
```

---

## 4. Touch & Mobile Improvements

### Touch Target Utilities

#### CSS Module (`styles/touch.module.css`)
```tsx
import styles from "@/styles/touch.module.css";

<button className={styles.touchTarget}>Small button</button>
```

#### Tailwind Classes
The project already uses Tailwind. Equivalent classes:
```tsx
className="min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
```

#### JavaScript Utilities (`utils/touch.ts`)
```tsx
import { getTouchTargetStyles, meetsTouchTarget } from "@/utils/touch";

const styles = getTouchTargetStyles(20, 20); // width, height
const isValid = meetsTouchTarget(44, 44); // true
```

### Passive Event Listeners

Use `utils/events.ts` for better scroll performance:

```tsx
import { addPassiveScrollListener } from "@/utils/events";
import { useEffect } from "react";

function MyComponent() {
  useEffect(() => {
    const cleanup = addPassiveScrollListener((e) => {
      // Handle scroll
    });
    return cleanup;
  }, []);
}
```

**Note:** The project already uses passive touch listeners in `globals.css` via `touch-action: pan-y`.

### Button Audit

Ensure all interactive elements use proper `<button>` elements (not clickable divs). The navigation component already uses proper buttons.

---

## 5. Perceived Performance

### Route Progress Indicator

Already integrated in `app/layout.tsx`. Shows a progress bar at the top during route transitions.

**Customization:**
The `RouteProgress` component uses simulated progress. For real Next.js router events, you can enhance it:

```tsx
// In components/RouteProgress.tsx
import { useRouter } from "next/navigation";

useEffect(() => {
  const handleRouteChangeStart = () => setProgress(30);
  const handleRouteChangeComplete = () => {
    setProgress(100);
    setTimeout(() => setIsVisible(false), 200);
  };

  // Hook into Next.js router events if available
}, []);
```

---

## Integration Checklist

- [x] Skip to content link added to `app/layout.tsx`
- [x] Route progress indicator added to `app/layout.tsx`
- [x] Main content ID added to `components/layout/page-layout.tsx`
- [ ] Add skeleton loaders to key sections (hero, cards, etc.)
- [ ] Integrate `useLoading` hook in async operations
- [ ] Wrap modals with `useFocusTrap`
- [ ] Add `ImageFallback` to critical images
- [ ] Create fallback image at `/public/images/fallback.png` (optional)
- [ ] Integrate error reporting service (Sentry, etc.) in `utils/reportError.ts`
- [ ] Audit touch targets on mobile (ensure 44x44px minimum)
- [ ] Test keyboard navigation (Tab, Escape, Enter)

---

## File Structure

```
components/
  ├── Skeleton.tsx           # Generic skeleton loader
  ├── ImageSkeleton.tsx      # Image-specific skeleton
  ├── ImageFallback.tsx      # Accessible image with fallback
  ├── SkipToContent.tsx      # Skip link component
  ├── RouteProgress.tsx      # Route transition indicator
  ├── ExampleModal.tsx       # Modal reference implementation
  └── ErrorBoundary.tsx      # Enhanced error boundary

hooks/
  ├── useLoading.ts          # Loading state hook
  └── useFocusTrap.ts        # Focus trap hook

utils/
  ├── reportError.ts         # Error telemetry utility
  ├── touch.ts               # Touch target utilities
  └── events.ts              # Passive event listeners

styles/
  ├── focus.module.css       # Focus indicator styles
  └── touch.module.css       # Touch target utilities

lib/
  └── utils.ts               # className utility (cn function)
```

---

## Assumptions & Notes

1. **CSS Framework**: Project uses Tailwind CSS v4. Focus and touch utilities are provided as CSS modules but Tailwind classes are preferred.

2. **Image Fallback**: Defaults to `/images/fallback.png`. Create this file if you want a custom fallback image.

3. **Error Reporting**: `utils/reportError.ts` is a placeholder. Integrate with your preferred service (Sentry, LogRocket, etc.).

4. **Route Progress**: Currently uses simulated progress. Can be enhanced with Next.js router events if needed.

5. **SSR Safety**: All hooks and utilities are SSR-safe (check for `typeof window !== "undefined"`).

6. **Accessibility**: All components follow WCAG 2.1 AA guidelines:
   - Minimum 44x44px touch targets
   - Visible focus indicators
   - Keyboard navigation support
   - ARIA attributes where appropriate

---

## Testing

### Keyboard Navigation
1. Tab through the page - focus should be visible
2. Press Tab on page load - "Skip to content" link should appear
3. Open a modal - Tab should cycle within modal only
4. Press Escape in modal - should close and restore focus

### Mobile/Touch
1. Test on mobile device - all buttons should be easily tappable (44x44px)
2. Scroll should be smooth (passive listeners)
3. No double-tap zoom on buttons (touch-action: manipulation)

### Loading States
1. Slow down network in DevTools
2. Verify skeletons appear during loading
3. Verify smooth transitions

### Error States
1. Trigger an error in a component wrapped with ErrorBoundary
2. Verify friendly error message appears
3. Test "Try again" and "Refresh page" buttons

---

## Next Steps

1. **Add skeletons to critical sections**: Replace loading spinners with skeletons in hero, cards, etc.
2. **Integrate error reporting**: Connect `utils/reportError.ts` to your telemetry service
3. **Create fallback image**: Add `/public/images/fallback.png` if desired
4. **Enhance route progress**: Connect to real Next.js router events if needed
5. **Audit existing modals**: Wrap any existing modals with `useFocusTrap`

---

## Support

For questions or issues, refer to:
- Component JSDoc comments
- TypeScript types for all props
- Example implementations (ExampleModal, etc.)

