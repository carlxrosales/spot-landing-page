"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the skeleton. Can be a number (px), string (e.g., "100%", "50px"), or Tailwind class.
   */
  width?: string | number;
  /**
   * Height of the skeleton. Can be a number (px), string (e.g., "100%", "50px"), or Tailwind class.
   */
  height?: string | number;
  /**
   * Whether to show a circular skeleton (useful for avatars)
   */
  circle?: boolean;
  /**
   * Number of lines for text skeleton
   */
  lines?: number;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * Generic skeleton loader component for loading states.
 * Provides a shimmer animation effect.
 *
 * @example
 * <Skeleton width="100%" height={200} />
 * <Skeleton width={100} height={100} circle />
 * <Skeleton lines={3} />
 */
export function Skeleton({
  width,
  height,
  circle = false,
  lines,
  className,
  style,
  ...props
}: SkeletonProps) {
  const computedStyle: React.CSSProperties = {
    ...style,
  };

  if (width !== undefined) {
    computedStyle.width =
      typeof width === "number" ? `${width}px` : width;
  }

  if (height !== undefined) {
    computedStyle.height =
      typeof height === "number" ? `${height}px` : height;
  }

  if (lines && lines > 1) {
    return (
      <div className={cn("space-y-2", className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-4 bg-black/10 rounded animate-pulse",
              i === lines - 1 && "w-3/4"
            )}
            style={computedStyle}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-black/10 rounded animate-pulse",
        circle && "rounded-full",
        className
      )}
      style={computedStyle}
      aria-hidden="true"
      {...props}
    />
  );
}

