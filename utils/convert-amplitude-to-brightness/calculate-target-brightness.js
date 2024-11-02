/**
 * Calculates the target brightness based on the normalized amplitude.
 * @param {number} amplitude - The normalized amplitude value.
 * @param {number} minBrightness - The minimum brightness level.
 * @param {number} maxBrightness - The maximum brightness level.
 * @param {number} exponent - Exponent to control brightness curve.
 * @returns {number} - Calculated target brightness.
 */

export function calculateTargetBrightness(
  amplitude,
  minBrightness,
  maxBrightness,
  exponent
) {
  return (
    Math.pow(amplitude, exponent) * (maxBrightness - minBrightness) +
    minBrightness
  );
}
