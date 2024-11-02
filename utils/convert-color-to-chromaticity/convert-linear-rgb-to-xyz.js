/**
 * Converts linear RGB values to XYZ color space values for chromaticity calculations.
 *
 * The XYZ color space is a standard color representation used in lighting applications,
 * and this conversion uses coefficients specific to the sRGB color model.
 *
 * @param {number} rLinear - Linearized red component (range: 0 to 1).
 * @param {number} gLinear - Linearized green component (range: 0 to 1).
 * @param {number} bLinear - Linearized blue component (range: 0 to 1).
 * @returns {Object} - Object containing `X`, `Y`, and `Z` values in the XYZ color space.
 */
export function convertLinearRGBToXYZ(rLinear, gLinear, bLinear) {
  // Conversion coefficients for sRGB to XYZ transformation
  const redToX = 0.664511;
  const greenToX = 0.154324;
  const blueToX = 0.162028;

  const redToY = 0.283881;
  const greenToY = 0.668433;
  const blueToY = 0.047685;

  const redToZ = 0.000088;
  const greenToZ = 0.07231;
  const blueToZ = 0.986039;

  const X = rLinear * redToX + gLinear * greenToX + bLinear * blueToX;
  const Y = rLinear * redToY + gLinear * greenToY + bLinear * blueToY;
  const Z = rLinear * redToZ + gLinear * greenToZ + bLinear * blueToZ;

  return { X, Y, Z };
}
