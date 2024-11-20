import * as Max from "max-api";

import { clampFrequency } from "./clamp-frequency.js";
import { interpolateXY } from "./interpolate-xy.js";
import { smoothTransition } from "./smooth-transition.js";
import { convertColorToChromaticity } from "../convert-color-to-chromaticity/convert-color-to-chromaticity.js";
import { MINIMUM_FREQUENCY, MAXIMUM_FREQUENCY } from "../constants.js";
/**
 * Maps frequency to xy color coordinates in the CIE Chromaticity Diagram
 * @param {number} frequency - The sound's frequency to map.
 * @param {Array} lowFreqColor - RGB color for the low frequency determined through the Max Device UI in Ableton.
 * @param {Array} midFreqColor - RGB color for the mid frequency determined through the Max Device UI in Ableton.
 * @param {Array} highFreqColor - RGB color for the high frequency determined through the Max Device UI in Ableton.
 * @returns {Object} - The mapped x and y values.
 */

export function mapFrequencyToChromaticity(
  frequency,
  lowFreqColor,
  midFreqColor,
  highFreqColor
) {
  const clampedFreq = clampFrequency(
    frequency,
    MINIMUM_FREQUENCY,
    MAXIMUM_FREQUENCY
  );

  const lowFreqXY = convertColorToChromaticity(lowFreqColor);
  Max.post(`Low frequency XY: ${lowFreqXY}`);

  const midFreqXY = convertColorToChromaticity(midFreqColor);
  Max.post(`Mid frequency XY: ${midFreqXY}`);

  const highFreqXY = convertColorToChromaticity(highFreqColor);
  Max.post(`High frequency XY: ${highFreqXY}`);

  const { targetX, targetY } = interpolateXY(
    clampedFreq,
    lowFreqXY,
    midFreqXY,
    highFreqXY
  );

  return smoothTransition(targetX, targetY);
}
