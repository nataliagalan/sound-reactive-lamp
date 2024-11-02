import Max from "max-api";
import { validateColorDataStructure } from "./validate-color-data-structure.js";
import { normalizeRGBValues } from "./normalize-rgb-values.js";
import { applyGammaCorrection } from "./apply-gamma-correction.js";
import { convertLinearRGBToXYZ } from "./convert-linear-rgb-to-xyz.js";
import { calculateXYChromaticity } from "./calculate-xy-chromaticity.js";

/**
 * Converts RGB color data to CIE xy chromaticity coordinates.
 *
 * This function handles the process of converting standard RGB color data
 * to xy coordinates in the CIE Chromaticity Diagram, making colors compatible
 * with lighting applications like Philips Hue.
 *
 * @param {Array} colorData - Array of RGB values [red, green, blue] (0 to 1 range).
 * @returns {Object} - Object containing `x` and `y` chromaticity values.
 */
export function convertColorToChromaticity(colorData) {
  if (!validateColorDataStructure(colorData)) {
    return;
  }

  const [r, g, b] = colorData;
  Max.post(`Parsed RGB values: R=${r}, G=${g}, B=${b}`);

  const { red, green, blue } = normalizeRGBValues(r, g, b);
  Max.post(`Normalized RGB values: R=${red}, G=${green}, B=${blue}`);

  const { rLinear, gLinear, bLinear } = applyGammaCorrection(red, green, blue);
  Max.post(
    `Gamma-corrected RGB values: R=${rLinear}, G=${gLinear}, B=${bLinear}`
  );

  const { X, Y, Z } = convertLinearRGBToXYZ(rLinear, gLinear, bLinear);
  Max.post(`Converted to XYZ values: X=${X}, Y=${Y}, Z=${Z}`);

  const { x, y } = calculateXYChromaticity(X, Y, Z);

  Max.post(`Converted to XY values: x=${x}, y=${y}`);
  return { x, y };
}
