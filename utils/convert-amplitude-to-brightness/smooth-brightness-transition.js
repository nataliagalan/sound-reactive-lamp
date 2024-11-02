import { MIN_BRIGHTNESS } from "../constants.js";

/**
 * Smooths the brightness transition using a low-pass filter. See ../map-frequency-to-chromaticity/smooth-transition.js for more info on the low-pass filter approach.
 * @param {number} targetBrightness - The target brightness.
 * @param {number} alpha - Smoothing factor (lower values = smoother).
 * @returns {number} - Smoothed brightness.
 */

let currentBrightness = MIN_BRIGHTNESS; // Initial brightness level

export function smoothBrightnessTransition(targetBrightness, alpha) {
  currentBrightness =
    currentBrightness * (1 - alpha) + targetBrightness * alpha;
  return Math.floor(currentBrightness);
}
