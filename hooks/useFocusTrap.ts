"use client";

import { useEffect, useRef, RefObject } from "react";

interface UseFocusTrapOptions {
  /**
   * Whether the focus trap is active
   */
  isActive: boolean;
  /**
   * Optional callback when focus escapes (e.g., on Escape key)
   */
  onEscape?: () => void;
  /**
   * Whether to restore focus to the element that triggered the trap when it closes
   */
  restoreFocus?: boolean;
}

/**
 * Hook to trap focus within a container (e.g., modals, dialogs).
 * Ensures keyboard users can't tab outside the container.
 *
 * Features:
 * - Traps focus within the container
 * - Handles Escape key to close
 * - Restores focus to previous element when trap closes
 * - ARIA-friendly behavior
 *
 * @example
 * const { containerRef } = useFocusTrap({
 *   isActive: isModalOpen,
 *   onEscape: () => setIsModalOpen(false),
 *   restoreFocus: true,
 * });
 *
 * return <div ref={containerRef}>...</div>;
 */
export function useFocusTrap({
  isActive,
  onEscape,
  restoreFocus = true,
}: UseFocusTrapOptions): {
  containerRef: RefObject<HTMLElement>;
} {
  const containerRef = useRef<HTMLElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) {
      return;
    }

    const container = containerRef.current;

    // Store the element that had focus before the trap was activated
    if (restoreFocus && typeof document !== "undefined") {
      previousActiveElementRef.current =
        (document.activeElement as HTMLElement) || null;
    }

    // Get all focusable elements within the container
    const getFocusableElements = (): HTMLElement[] => {
      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ');

      return Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelectors)
      ).filter((el) => {
        // Filter out elements that are not visible
        const style = window.getComputedStyle(el);
        return (
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          style.opacity !== '0'
        );
      });
    };

    const focusableElements = getFocusableElements();

    if (focusableElements.length === 0) {
      return;
    }

    // Focus the first element
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Set initial focus
    requestAnimationFrame(() => {
      firstElement?.focus();
    });

    // Handle Tab key to cycle through focusable elements
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') {
        return;
      }

      if (focusableElements.length === 1) {
        e.preventDefault();
        firstElement?.focus();
        return;
      }

      if (e.shiftKey) {
        // Shift + Tab: move backwards
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab: move forwards
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        onEscape();
      }
    };

    // Prevent focus from escaping the container
    const handleFocusIn = (e: FocusEvent) => {
      if (!container.contains(e.target as Node)) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    container.addEventListener('keydown', handleTabKey);
    container.addEventListener('keydown', handleEscape);
    document.addEventListener('focusin', handleFocusIn);

    return () => {
      container.removeEventListener('keydown', handleTabKey);
      container.removeEventListener('keydown', handleEscape);
      document.removeEventListener('focusin', handleFocusIn);

      // Restore focus to the previous element
      if (restoreFocus && previousActiveElementRef.current) {
        requestAnimationFrame(() => {
          previousActiveElementRef.current?.focus();
        });
      }
    };
  }, [isActive, onEscape, restoreFocus]);

  return { containerRef };
}

