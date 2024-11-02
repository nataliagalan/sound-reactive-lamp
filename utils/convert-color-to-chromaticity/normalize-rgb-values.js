/**
 * Normalizes RGB values to be within the 0 to 1 range.
 *
 * @param {number} r - Red component (can exceed 0-1 range).
 * @param {number} g - Green component (can exceed 0-1 range).
 * @param {number} b - Blue component (can exceed 0-1 range).
 * @returns {Object} - Object containing `red`, `green`, and `blue` values clamped to 0-1 range.
 */
export function normalizeRGBValues(r, g, b) {
  const red = Math.min(Math.max(r, 0), 1);
  const green = Math.min(Math.max(g, 0), 1);
  const blue = Math.min(Math.max(b, 0), 1);

  return { red, green, blue };
}
