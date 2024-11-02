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
 * Interpolates the x and y values based on clamped frequency.
 * @param {number} frequency - The clamped frequency of the sound.
 * @param {Object} lowFreqXY - xy values at the low frequency.
 * @param {Object} midFreqXY - xy values at the mid frequency.
 * @param {Object} highFreqXY - xy values at the high frequency.
 * @returns {Object} - Interpolated target x and y values.
 */

export function interpolateXY(frequency, lowFreqXY, midFreqXY, highFreqXY) {
  let targetX;
  let targetY;
  if (frequency <= 300) {
    const ratio = (frequency - 150) / (300 - 150);
    targetX = interpolate(lowFreqXY.x, midFreqXY.x, ratio);
    targetY = interpolate(lowFreqXY.y, midFreqXY.y, ratio);
  } else {
    const ratio = (frequency - 300) / (440 - 300);
    targetX = interpolate(midFreqXY.x, highFreqXY.x, ratio);
    targetY = interpolate(midFreqXY.y, highFreqXY.y, ratio);
  }
  return { targetX, targetY };
}
