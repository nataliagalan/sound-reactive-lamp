/**
 * Normalizes the audio's amplitude to a value between 0 and 1.
 * @param {number} amplitude - The sound's amplitude value to normalize.
 * @returns {number} - Adjusted amplitude.
 */

export function normalizeAmplitude(amplitude) {
  return Math.min(amplitude / 0.5, 1);
}
