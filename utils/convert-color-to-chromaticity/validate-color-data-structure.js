import * as Max from "max-api";

/**
 * Validates the RGB color data structure to ensure it is a valid array of numbers.
 *
 * @param {Array} colorData - Array of RGB values [red, green, blue].
 * @returns {boolean} - Returns `true` if valid, otherwise posts an error and returns `false`.
 */
export function validateColorDataStructure(colorData) {
  if (Array.isArray(colorData) && colorData.length >= 3) {
    const [r, g, b] = colorData;

    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      Max.post("Error: RGB values are not numbers.");
      return false;
    }
    return true;
  } else {
    Max.post("Error: colorData is not in the expected format.", colorData);
    return false;
  }
}
