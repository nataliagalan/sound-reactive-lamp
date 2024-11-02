import { dtls } from "node-dtls-client";
import * as Max from "max-api";
import axios from "axios";
import https from "https";
import "dotenv/config";

import { getEnvNumber } from "./utils/get-env-number.js";
import { handleError } from "./utils/handle-error.js";
import { mapFrequencyToChromaticity } from "./utils/map-frequency-to-chromaticity/map-frequency-to-chromaticity.js";
import { convertAmplitudeToBrightness } from "./utils/convert-amplitude-to-brightness/convert-amplitude-to-brightness.js";
import { MAX_16_BIT, BYTE_MASK, BITS_TO_SHIFT } from "./utils/constants.js";

const HUE_BRIDGE_PORT = getEnvNumber("HUE_BRIDGE_PORT", 2100);
const TIMEOUT_MS = getEnvNumber("TIMEOUT_MS", 10_000);

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Disabling certificate verification for local development and testing
  }),
});

const initialize = async () => {
  const isHueStreamActivated = await activateHueStream();
  Max.post("isHueStreamActivated:", isHueStreamActivated);

  if (isHueStreamActivated) {
    connectToHueBridge();
  } else {
    Max.post("Failed to activate Hue stream.");
  }
};

/**
 * Activates the Hue Entertainment API's streaming mode for dynamic lighting.
 * @returns {Promise<boolean>} - True if activation is successful, otherwise false.
 */

const activateHueStream = async () => {
  const url = `https://${process.env.HUB_IP_ADDRESS}/clip/v2/resource/entertainment_configuration/${process.env.ENTERTAINMENT_AREA_ID}`;
  const data = { action: "start" };

  try {
    const response = await axiosInstance.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        "hue-application-key": process.env.USERNAME,
      },
    });

    Max.post("Response from Hue Bridge:", response.data);

    if (response.errors?.length > 0) {
      Max.post("Error activating Hue stream:", response.errors);
      return false;
    } else {
      Max.post("Successfully activated Hue stream.");
      return true;
    }
  } catch (error) {
    handleError(error);
    return false;
  }
};

/**
 * Establishes a secure DTLS connection to the Hue Bridge for streaming data.
 */

let socket;

const connectToHueBridge = () => {
  socket = dtls
    .createSocket({
      type: "udp4",
      address: process.env.HUB_IP_ADDRESS,
      port: HUE_BRIDGE_PORT,
      psk: {
        [process.env.USERNAME]: Buffer.from(process.env.CLIENT_KEY, "hex"),
      },
      timeout: TIMEOUT_MS,
      ciphers: ["TLS_PSK_WITH_AES_128_GCM_SHA256"],
    })
    .on("connected", () => {
      Max.post("Connected to the Hue Bridge!");

      Max.addHandler("soundData", mapSoundDataToPhilipsHueColors);
    })
    .on("error", (error) => {
      Max.post("DTLS Error:", error);
    })
    .on("message", (msg) => {
      Max.post("Received message:", msg.toString());
    })
    .on("close", () => {
      Max.post("Connection closed.");
    });
};

/**
 * Handles incoming frequency and amplitude data from Max.
 * Maps frequency and amplitude to corresponding color and brightness values,
 * then sends this data to the Hue Bridge.
 *
 * @param {Object} data - Object containing frequency, amplitude, and color data.
 */

function mapSoundDataToPhilipsHueColors({
  frequency,
  amplitude,
  lowFreqColor,
  midFreqColor,
  highFreqColor,
}) {
  // Sometimes the Max Device UI in Ableton sends "*" as a placeholder for color values
  const defaultColor = [0.5, 0.5, 0.5];
  lowFreqColor = lowFreqColor === "*" ? defaultColor : lowFreqColor;
  midFreqColor = midFreqColor === "*" ? defaultColor : midFreqColor;
  highFreqColor = highFreqColor === "*" ? defaultColor : highFreqColor;

  const { x, y } = mapFrequencyToChromaticity(
    frequency,
    lowFreqColor,
    midFreqColor,
    highFreqColor
  );
  const brightness = convertAmplitudeToBrightness(amplitude);

  sendColorDataToPhilipsHue(x, y, brightness);
}

/**
 * Sends color data (in xy chromaticity and brightness) to the Philips Hue Bridge.
 *
 * @param {number} x - X chromaticity value.
 * @param {number} y - Y chromaticity value.
 * @param {number} brightness - Brightness level (0-65535, the maximum value for a 16-bit integer).
 */

function sendColorDataToPhilipsHue(x, y, brightness) {
  const buffer = createHueStreamBuffer(x, y, brightness);
  sendBufferToHue(buffer);
}

/**
 * Creates a data buffer for Philips Hue lighting in xy chromaticity and brightness.
 *
 * @param {number} x - X chromaticity value.
 * @param {number} y - Y chromaticity value.
 * @param {number} brightness - Brightness level (0-65535, the maximum value for a 16-bit integer).
 * @returns {Buffer} - Complete data buffer to be sent to the Philips Hue Bridge.
 */

function createHueStreamBuffer(x, y, brightness) {
  const protocolName = Buffer.from("HueStream", "ascii");
  const header = Buffer.from([
    0x02,
    0x00, // Streaming API version 2.0
    0x00,
    0x00,
    0x00, // Channel Reserved by Philips Hue
    0x01, // Channel to specify the Color Space. 0x00 = RGB; 0x01 = XY Brightness Chromaticity
    0x00, // Channel Reserved by Philips Hue
  ]);

  const entertainmentConfigurationId = Buffer.from(
    process.env.ENTERTAINMENT_AREA_ID,
    "ascii"
  );
  const channelData = createChannelData(x, y, brightness);

  return Buffer.concat([
    protocolName,
    header,
    entertainmentConfigurationId,
    channelData,
  ]);
}

/**
 * Converts x, y, and brightness values to a channel data buffer for Philips Hue.
 *
 * Each value (x, y, brightness) is scaled to fit within a 16-bit range (0-65535)
 * and represented in two bytes (high byte and low byte). The `>> BITS_TO_SHIFT`
 * operation isolates the high byte, while `& BYTE_MASK` extracts the low byte.
 * This structure aligns with the Philips Hue Entertainment protocol.
 *
 * @param {number} x - X chromaticity value.
 * @param {number} y - Y chromaticity value.
 * @param {number} brightness - Brightness level (0-65535, the maximum value for a 16-bit integer).
 * @returns {Buffer} - Buffer containing channel data for color and brightness.
 */

function createChannelData(x, y, brightness) {
  // Scale x, y, and brightness to fit in 16-bit range and extract high/low bytes
  const xValue = Math.floor(x * MAX_16_BIT);
  const yValue = Math.floor(y * MAX_16_BIT);
  const brightnessValue = Math.floor(brightness);

  return Buffer.from([
    0x00,
    (xValue >> BITS_TO_SHIFT) & BYTE_MASK, // High byte of x chromaticity value
    xValue & BYTE_MASK, // Low byte of x chromaticity value
    (yValue >> BITS_TO_SHIFT) & BYTE_MASK, // High byte of y chromaticity value
    yValue & BYTE_MASK, // Low byte of y chromaticity value
    (brightnessValue >> BITS_TO_SHIFT) & BYTE_MASK, // High byte of brightness value
    brightnessValue & BYTE_MASK, // Low byte of brightness value
  ]);
}

/**
 * Sends a buffer of color and brightness data to the Philips Hue Bridge via the DTLS socket.
 *
 * @param {Buffer} buffer - The data buffer to be sent.
 */
function sendBufferToHue(buffer) {
  socket.send(buffer, (error, bytes) => {
    if (error) {
      Max.post("Error sending data:", error);
    } else {
      Max.post(`Sent ${bytes} bytes to set color in xy+brightness mode.`);
    }
  });
}

await initialize();
