/**
 * Calculates CIE xy chromaticity coordinates from XYZ color space values.
 *
 * The xy chromaticity diagram is a simplified color representation for lighting systems.
 * @param {number} X - X value in the XYZ color space.
 * @param {number} Y - Y value in the XYZ color space.
 * @param {number} Z - Z value in the XYZ color space.
 * @returns {Object} - Object containing `x` and `y` chromaticity values.
 */
export function calculateXYChromaticity(X, Y, Z) {
  const x = X / (X + Y + Z);
  const y = Y / (X + Y + Z);

  return {
    x: isNaN(x) ? 0 : x,
    y: isNaN(y) ? 0 : y,
  };
}
