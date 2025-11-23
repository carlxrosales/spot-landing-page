/**
 * SSR-safe event listener utilities
 * Provides passive event listeners for better scroll performance
 */

/**
 * Check if code is running in browser environment
 */
const isBrowser = typeof window !== "undefined";

/**
 * Add a passive event listener (SSR-safe)
 * Passive listeners improve scroll performance by telling the browser
 * the listener won't call preventDefault()
 *
 * @param element - Element to attach listener to
 * @param event - Event type
 * @param handler - Event handler function
 * @param options - Additional options (passive is always true)
 */
export function addPassiveEventListener(
  element: Window | Document | HTMLElement,
  event: string,
  handler: EventListener,
  options: AddEventListenerOptions = {}
): () => void {
  if (!isBrowser) {
    return () => {};
  }

  const opts: AddEventListenerOptions = {
    passive: true,
    ...options,
  };

  element.addEventListener(event, handler, opts);

  return () => {
    element.removeEventListener(event, handler, opts);
  };
}

/**
 * Add passive scroll event listener
 * @param handler - Scroll event handler
 * @param element - Element to listen on (default: window)
 * @returns Cleanup function
 */
export function addPassiveScrollListener(
  handler: (event: Event) => void,
  element: Window | HTMLElement = typeof window !== "undefined" ? window : ({} as Window)
): () => void {
  if (!isBrowser) {
    return () => {};
  }

  return addPassiveEventListener(element, "scroll", handler);
}

/**
 * Add passive touch event listeners
 * @param handler - Touch event handler
 * @param element - Element to listen on (default: window)
 * @returns Cleanup function
 */
export function addPassiveTouchListener(
  handler: (event: TouchEvent) => void,
  element: Window | Document | HTMLElement = typeof window !== "undefined" ? window : ({} as Window)
): () => void {
  if (!isBrowser) {
    return () => {};
  }

  return addPassiveEventListener(element, "touchstart", handler);
}

/**
 * Add passive wheel event listener (for mouse wheel)
 * @param handler - Wheel event handler
 * @param element - Element to listen on (default: window)
 * @returns Cleanup function
 */
export function addPassiveWheelListener(
  handler: (event: WheelEvent) => void,
  element: Window | HTMLElement = typeof window !== "undefined" ? window : ({} as Window)
): () => void {
  if (!isBrowser) {
    return () => {};
  }

  return addPassiveEventListener(element, "wheel", handler);
}

/**
 * Throttle function for event handlers
 * Limits how often a function can be called
 */
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Debounce function for event handlers
 * Delays function execution until after a period of inactivity
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function (this: unknown, ...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

