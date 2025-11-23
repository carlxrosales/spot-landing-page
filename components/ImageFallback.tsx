"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageFallbackProps {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Alt text for the image (required for accessibility)
   */
  alt: string;
  /**
   * Image width
   */
  width?: number;
  /**
   * Image height
   */
  height?: number;
  /**
   * Fill the container (use with object-fit)
   */
  fill?: boolean;
  /**
   * CSS classes for styling
   */
  className?: string;
  /**
   * Fallback image path (defaults to /images/fallback.png)
   */
  fallbackSrc?: string;
  /**
   * Additional props to pass to next/image
   */
  [key: string]: unknown;
}

/**
 * Accessible image component with fallback handling.
 * Uses next/image with error recovery and retry functionality.
 *
 * @example
 * <ImageFallback
 *   src="/images/hero.png"
 *   alt="Hero image"
 *   width={800}
 *   height={600}
 * />
 */
export function ImageFallback({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  fallbackSrc = "/images/fallback.png",
  ...props
}: ImageFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleError = () => {
    if (retryCount < 1 && imgSrc !== fallbackSrc) {
      // Try once with the original src again
      setRetryCount((prev) => prev + 1);
      setImgSrc(src);
    } else if (imgSrc !== fallbackSrc) {
      // Fall back to fallback image
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  const handleRetry = () => {
    setHasError(false);
    setRetryCount(0);
    setImgSrc(src);
  };

  return (
    <figure className={cn("relative", className)}>
      {fill ? (
        <Image
          src={imgSrc}
          alt={alt}
          fill
          onError={handleError}
          className="object-cover"
          {...props}
        />
      ) : (
        <Image
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          onError={handleError}
          {...props}
        />
      )}
      {hasError && (
        <figcaption className="sr-only">
          Image failed to load. Showing fallback image.
        </figcaption>
      )}
      {hasError && (
        <button
          onClick={handleRetry}
          className="absolute inset-0 flex items-center justify-center bg-black/5 hover:bg-black/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 z-10"
          aria-label="Retry loading image"
          type="button"
        >
          <span className="text-sm font-medium text-black/70">
            Retry image
          </span>
        </button>
      )}
    </figure>
  );
}

