"use client";

import { Skeleton } from "./Skeleton";

interface ImageSkeletonProps {
  /**
   * Aspect ratio of the image (e.g., "16/9", "1/1", "4/3")
   */
  aspectRatio?: string;
  /**
   * Width of the skeleton
   */
  width?: string | number;
  /**
   * Height of the skeleton (overrides aspectRatio if provided)
   */
  height?: string | number;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * Skeleton loader specifically designed for images.
 * Maintains aspect ratio and provides a shimmer effect.
 *
 * @example
 * <ImageSkeleton aspectRatio="16/9" width="100%" />
 * <ImageSkeleton width={400} height={300} />
 */
export function ImageSkeleton({
  aspectRatio = "16/9",
  width,
  height,
  className,
}: ImageSkeletonProps) {
  const style: React.CSSProperties = {
    aspectRatio: height ? undefined : aspectRatio,
  };

  if (width !== undefined) {
    style.width = typeof width === "number" ? `${width}px` : width;
  }

  if (height !== undefined) {
    style.height = typeof height === "number" ? `${height}px` : height;
  }

  return (
    <Skeleton
      width={width}
      height={height}
      className={className}
      style={style}
    />
  );
}

