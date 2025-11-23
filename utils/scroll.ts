import { SCROLL_OFFSET } from "@/lib/constants";
import { throttle } from "./timer";

/**
 * Scrolls to an element by ID with optional offset
 * SSR-safe: checks for window/document availability
 *
 * @param id - The element ID to scroll to
 * @param offset - Optional offset in pixels (defaults to SCROLL_OFFSET constant)
 * @param behavior - Scroll behavior ('smooth' | 'auto')
 */
export function scrollToId(
  id: string,
  offset: number = SCROLL_OFFSET,
  behavior: ScrollBehavior = "smooth"
): void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  requestAnimationFrame(() => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior,
      });
    }
  });
}

/**
 * Scrolls to the top of the page
 * SSR-safe: checks for window availability
 *
 * @param behavior - Scroll behavior ('smooth' | 'auto')
 */
export function scrollToTop(behavior: ScrollBehavior = "smooth"): void {
  if (typeof window === "undefined") {
    return;
  }

  window.scrollTo({ top: 0, behavior });
}

/**
 * Gets the current hash from the URL
 * SSR-safe: checks for window availability
 *
 * @returns The hash string (without #) or empty string
 */
export function getCurrentHash(): string {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.hash.replace("#", "");
}

/**
 * Throttled scroll handler for performance
 * Use this for scroll event listeners that need to run frequently
 */
export const throttledScrollHandler = throttle(() => {
  // This is a placeholder - actual scroll handling logic should be passed
  // as a callback to throttle() when used
}, 100);

