/**
 * Clamps the frequency to a specified range.
 * @param {number} frequency - The frequency to clamp.
 * @param {number} min - Minimum allowable frequency.
 * @param {number} max - Maximum allowable frequency.
 * @returns {number} - Clamped frequency.
 */

export function clampFrequency(frequency, min, max) {
  return Math.max(min, Math.min(max, frequency));
}
