import { useEffect } from "react";
import {
  SCROLL_ANIMATION_DELAY,
  INTERSECTION_OBSERVER_THRESHOLD,
  INTERSECTION_OBSERVER_ROOT_MARGIN,
} from "@/lib/constants";

export function useScrollAnimations() {
  useEffect(() => {
    const observerOptions = {
      threshold: INTERSECTION_OBSERVER_THRESHOLD,
      rootMargin: INTERSECTION_OBSERVER_ROOT_MARGIN,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    }, observerOptions);

    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll(".fade-in-on-scroll");
      elements.forEach((el) => {
        observer.observe(el);
      });
    }, SCROLL_ANIMATION_DELAY);

    return () => {
      clearTimeout(timeoutId);
      const elements = document.querySelectorAll(".fade-in-on-scroll");
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}

