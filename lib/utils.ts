/**
 * Utility function to merge CSS class names
 * Handles conditional classes and filters out falsy values
 */
export function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return inputs
    .filter((input): input is string => Boolean(input))
    .join(" ")
    .trim();
}

