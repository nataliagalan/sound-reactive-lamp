/**
 * Applies gamma correction to RGB color values to adjust for human eye perception. Our eyes are more sensitive to changes in darkness than in brightness.
 *
 * In the digital world, colors are stored in a way that doesn’t naturally match how
 * our eyes perceive brightness (called sRGB space). Gamma correction adjusts these
 * colors, making them look more natural by converting them to "linear" space.
 *
 * This function takes in red, green, and blue color values (each between 0 and 1)
 * and applies gamma correction to each, returning linear RGB values that are better
 * suited for color transformations.
 *
 * @param {number} red - The red color channel value (range: 0 to 1).
 * @param {number} green - The green color channel value (range: 0 to 1).
 * @param {number} blue - The blue color channel value (range: 0 to 1).
 * @returns {Object} - An object containing gamma-corrected linear RGB values (`rLinear`, `gLinear`, `bLinear`).
 */

export function applyGammaCorrection(red, green, blue) {
  return {
    rLinear: gammaCorrectChannel(red),
    gLinear: gammaCorrectChannel(green),
    bLinear: gammaCorrectChannel(blue),
  };
}

/**
 * Adjusts a single color channel using gamma correction.
 *
 * In "sRGB" color space, low color values appear darker and high values appear brighter
 * to human eyes. Gamma correction adjusts for this by converting color values to a
 * "linear" scale, where the brightness changes are more consistent.
 *
 * This function applies a threshold check: if the color channel value is above the threshold,
 * it uses an exponent to brighten it; otherwise, it applies a simple division. This
 * adjusment makes low values more visible and high values more realistic to human eyes.
 *
 * @param {number} colorChannelValue - The color channel value (range: 0 to 1).
 * @returns {number} - Gamma-corrected linear value for the color channel.
 */

function gammaCorrectChannel(colorChannelValue) {
  const threshold = 0.04045; // Threshold for gamma correction
  const nonlinearScale = 1.055; // Scale factor for values above threshold
  const linearScale = 12.92; // Division factor for values below threshold
  const gamma = 2.4; // Exponent for gamma correction

  return colorChannelValue > threshold
    ? Math.pow(
        (colorChannelValue + (nonlinearScale - 1)) / nonlinearScale,
        gamma
      )
    : colorChannelValue / linearScale;
}
