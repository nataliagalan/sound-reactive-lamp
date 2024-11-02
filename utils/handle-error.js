import * as Max from "max-api";
/**
 * Logs errors to Max console with specific messaging based on error code.
 * @param {Object} error - The error object from an Axios request.
 */

export function handleError(error) {
  Max.post("Error activating Hue stream:", error.message);
  switch (error.code) {
    case "ECONNREFUSED":
      Max.post("Connection refused: Is the Hue Bridge reachable?");
      break;
    case "UNABLE_TO_VERIFY_LEAF_SIGNATURE":
      Max.post(
        "Certificate verification failed. Ensure the Hue Bridge certificate is valid."
      );
      break;
    default:
      Max.post("Unknown error occurred:", error.message);
  }
}
