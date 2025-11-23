/**
 * Utility functions for touch target calculations
 * Helps ensure interactive elements meet accessibility guidelines (44x44px minimum)
 */

/**
 * Calculate padding needed to meet minimum touch target size
 * @param elementWidth - Current element width in pixels
 * @param elementHeight - Current element height in pixels
 * @param minSize - Minimum touch target size (default: 44px per WCAG)
 * @returns Padding object with x and y values
 */
export function calculateTouchPadding(
  elementWidth: number,
  elementHeight: number,
  minSize = 44
): { x: number; y: number } {
  const x = Math.max(0, (minSize - elementWidth) / 2);
  const y = Math.max(0, (minSize - elementHeight) / 2);
  return { x, y };
}

/**
 * Check if an element meets minimum touch target requirements
 * @param width - Element width in pixels
 * @param height - Element height in pixels
 * @param minSize - Minimum touch target size (default: 44px)
 * @returns True if element meets requirements
 */
export function meetsTouchTarget(
  width: number,
  height: number,
  minSize = 44
): boolean {
  return width >= minSize && height >= minSize;
}

/**
 * Get CSS style object for touch target padding
 * @param elementWidth - Current element width in pixels
 * @param elementHeight - Current element height in pixels
 * @param minSize - Minimum touch target size (default: 44px)
 * @returns CSS style object with padding
 */
export function getTouchTargetStyles(
  elementWidth: number,
  elementHeight: number,
  minSize = 44
): React.CSSProperties {
  const padding = calculateTouchPadding(elementWidth, elementHeight, minSize);
  return {
    paddingLeft: `${padding.x}px`,
    paddingRight: `${padding.x}px`,
    paddingTop: `${padding.y}px`,
    paddingBottom: `${padding.y}px`,
    minWidth: `${minSize}px`,
    minHeight: `${minSize}px`,
  };
}

