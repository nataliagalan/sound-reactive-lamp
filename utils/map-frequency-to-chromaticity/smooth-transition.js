/**
 * Smoothly transitions x and y values to reduce abrupt changes, applying a "low-pass filter" technique.
 * This technique is called low-pass filtering because it allows slow, gradual changes ("low frequencies")
 * to pass through while filtering out quick, sudden changes ("high frequencies").
 *
 * By blending the previous values with the new target values, this function helps create smooth,
 * gradual color shifts and avoid abrupt jumps.
 *
 * @param {number} targetX - The target x coordinate for the color transition.
 * @param {number} targetY - The target y coordinate for the color transition.
 * @returns {Object} - The smoothed x and y values as they move closer to the target values.
 */

// These Default values provide a stable starting point for color transitions.
// These values (0.5, 0.3) represent a warm color in the CIE color space,
// and ensure that the first transition is smooth.
let currentX = 0.5;
let currentY = 0.3;

export function smoothTransition(targetX, targetY) {
  // Alpha is the smoothing factor; lower values create smoother, slower transitions.
  // After fine-tuning, I am very happy with this 0.16 value but if desired,
  // this could be turned into an argument and adjusted in the Max device in future iterations.
  const alpha = 0.16;
  currentX = currentX * (1 - alpha) + targetX * alpha;
  currentY = currentY * (1 - alpha) + targetY * alpha;
  return { x: currentX, y: currentY };
}
