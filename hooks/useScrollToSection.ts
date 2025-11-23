"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import type { NavigationLink } from "@/types";
import { scrollToId, getCurrentHash } from "@/utils/scroll";
import { SCROLL_OFFSET, SCROLL_TRACKING_OFFSET } from "@/lib/constants";
import type { ActiveId } from "@/types";

interface UseScrollToSectionOptions {
  links: NavigationLink[];
  offset?: number;
  enableActiveTracking?: boolean;
}

interface UseScrollToSectionReturn {
  scrollToId: (id: string) => void;
  activeId: ActiveId;
  scrollToTop: () => void;
}

/**
 * Custom hook for handling scroll-to-section navigation
 * SSR-safe: all window/document access is guarded
 *
 * @param options - Configuration options
 * @returns Object with scroll functions and active section ID
 */
export function useScrollToSection({
  links,
  offset = SCROLL_OFFSET,
  enableActiveTracking = true,
}: UseScrollToSectionOptions): UseScrollToSectionReturn {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<ActiveId>(null);

  /**
   * Scrolls to a section by ID
   * Handles navigation to different pages if needed
   */
  const handleScrollToId = useCallback(
    (id: string) => {
      if (typeof window === "undefined") {
        return;
      }

      // If not on home page, navigate to home with hash
      if (pathname !== "/") {
        window.location.href = `/#${id}`;
        return;
      }

      // Scroll to element on current page
      scrollToId(id, offset);
    },
    [pathname, offset]
  );

  /**
   * Scrolls to top of page
   */
  const handleScrollToTop = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (pathname !== "/") {
      window.location.href = "/";
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  /**
   * Updates active section based on current hash
   */
  useEffect(() => {
    if (!enableActiveTracking || typeof window === "undefined") {
      return;
    }

    if (pathname === "/") {
      const hash = getCurrentHash();
      if (hash) {
        const matchingLink = links.find(
          (link) => link.href === `/#${hash}` || link.href === hash
        );
        if (matchingLink) {
          setActiveId(matchingLink.href);
        }
      } else {
        setActiveId(null);
      }
    } else {
      setActiveId(null);
    }
  }, [pathname, links, enableActiveTracking]);

  /**
   * Track active section on scroll (optional enhancement)
   * This can be enabled for scroll-based active section tracking
   */
  useEffect(() => {
    if (!enableActiveTracking || typeof window === "undefined") {
      return;
    }

    const handleScroll = () => {
      if (pathname !== "/") {
        return;
      }

      // Find which section is currently in view
      const scrollPosition = window.scrollY + offset + SCROLL_TRACKING_OFFSET;

      for (const link of links) {
        if (link.href.startsWith("/#")) {
          const id = link.href.replace("/#", "");
          const element = document.getElementById(id);
          if (element) {
            const elementTop = element.offsetTop;
            const elementBottom = elementTop + element.offsetHeight;

            if (
              scrollPosition >= elementTop &&
              scrollPosition < elementBottom
            ) {
              setActiveId(link.href);
              return;
            }
          }
        }
      }
    };

    // Throttle scroll handler for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [links, offset, pathname, enableActiveTracking]);

  return {
    scrollToId: handleScrollToId,
    activeId,
    scrollToTop: handleScrollToTop,
  };
}

