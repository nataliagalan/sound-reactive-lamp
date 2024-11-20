import {
  MINIMUM_FREQUENCY,
  MID_FREQUENCY,
  MAXIMUM_FREQUENCY,
} from "../constants.js";

/**
 * Helper function for linear interpolation between two values.
 * @param {number} start - Starting value.
 * @param {number} end - Ending value.
 * @param {number} ratio - Interpolation ratio between 0 and 1.
 * @returns {number} - Interpolated value.
 */

function interpolate(start, end, ratio) {
  return start + ratio * (end - start);
}

/**
 * Helper function to calculate the interpolation ratio for a frequency within a given range.
 * @param {number} frequency - The frequency to interpolate.
 * @param {number} rangeStart - The start of the frequency range.
 * @param {number} rangeEnd - The end of the frequency range.
 * @returns {number} - Ratio of frequency within the range, between 0 and 1.
 */
function calculateRatio(frequency, rangeStart, rangeEnd) {
  return (frequency - rangeStart) / (rangeEnd - rangeStart);
}

/**
 * Interpolates the x and y values based on clamped frequency.
 * @param {number} frequency - The clamped frequency of the sound.
 * @param {Object} lowFreqXY - xy values at the low frequency.
 * @param {Object} midFreqXY - xy values at the mid frequency.
 * @param {Object} highFreqXY - xy values at the high frequency.
 * @param {number} minFreq - Minimum frequency value (default: MINIMUM_FREQUENCY).
 * @param {number} midFreq - Mid frequency value (default: MID_FREQUENCY).
 * @param {number} maxFreq - Maximum frequency value (default: MAXIMUM_FREQUENCY).
 * @returns {Object} - Interpolated target x and y values.
 */
export function interpolateXY(
  frequency,
  lowFreqXY,
  midFreqXY,
  highFreqXY,
  minFreq = MINIMUM_FREQUENCY,
  midFreq = MID_FREQUENCY,
  maxFreq = MAXIMUM_FREQUENCY
) {
  let targetX;
  let targetY;

  if (frequency <= midFreq) {
    const ratio = calculateRatio(frequency, minFreq, midFreq);
    targetX = interpolate(lowFreqXY.x, midFreqXY.x, ratio);
    targetY = interpolate(lowFreqXY.y, midFreqXY.y, ratio);
  } else {
    const ratio = calculateRatio(frequency, midFreq, maxFreq);
    targetX = interpolate(midFreqXY.x, highFreqXY.x, ratio);
    targetY = interpolate(midFreqXY.y, highFreqXY.y, ratio);
  }

  return { targetX, targetY };
}
