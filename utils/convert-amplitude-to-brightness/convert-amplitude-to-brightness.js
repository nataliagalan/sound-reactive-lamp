import { calculateTargetBrightness } from "./calculate-target-brightness.js";
import { smoothBrightnessTransition } from "./smooth-brightness-transition.js";
import { normalizeAmplitude } from "./normalize-amplitude.js";
import { MAX_16_BIT, MIN_BRIGHTNESS } from "../constants.js";

/**
 * Maps amplitude to brightness.
 * @param {number} amplitude - The amplitude of the incoming sound to map.
 * @returns {number} - The calculated brightness value.
 */

export function convertAmplitudeToBrightness(amplitude) {
  const adjustedAmplitude = normalizeAmplitude(amplitude);
  const targetBrightness = calculateTargetBrightness(
    adjustedAmplitude,
    MIN_BRIGHTNESS,
    MAX_16_BIT,
    3.5
  );
  return smoothBrightnessTransition(targetBrightness, 0.1);
}
