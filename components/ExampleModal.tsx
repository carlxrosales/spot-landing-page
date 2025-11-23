"use client";

import { useEffect } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { ImageFallback } from "./ImageFallback";

interface ExampleModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  /**
   * Callback to close the modal
   */
  onClose: () => void;
  /**
   * Modal title
   */
  title?: string;
  /**
   * Modal content
   */
  children?: React.ReactNode;
}

/**
 * Example modal component demonstrating:
 * - Focus trap usage
 * - Image fallback usage
 * - Accessible modal patterns
 * - Keyboard navigation (Escape to close, Tab trapping)
 *
 * This is a reference implementation. Adapt as needed for your modals.
 */
export function ExampleModal({
  isOpen,
  onClose,
  title = "Example Modal",
  children,
}: ExampleModalProps) {
  const { containerRef } = useFocusTrap({
    isActive: isOpen,
    onEscape: onClose,
    restoreFocus: true,
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className="relative bg-white rounded-2xl shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 id="modal-title" className="text-2xl font-bold text-black">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 transition-colors"
            aria-label="Close modal"
            type="button"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {children || (
            <div className="space-y-4">
              <p className="text-black/70">
                This is an example modal demonstrating focus trap and image
                fallback usage.
              </p>

              {/* Example Image Fallback Usage */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <ImageFallback
                  src="/images/hero/spot.png"
                  alt="Example image with fallback"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-full bg-white/70 text-black border border-black/20 hover:bg-white font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 transition-colors"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-full bg-black text-white hover:bg-neon-green hover:text-black font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 transition-colors"
                  type="button"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

