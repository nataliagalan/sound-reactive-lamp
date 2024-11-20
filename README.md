# Sound Reactive Lamp

The Sound Reactive Lamp project synchronizes Philips Hue lights with audio input, creating a dynamic lighting experience that reacts to sound frequencies and amplitudes. Inspired by the desire to cultivate a 'hyper awareness' of the present moment, this project combines technology and art to offer a calm and interactive contemplation of sound and light.

Learn more about the design philosophy and check out the video documentation here: [vastquiet.space/sound-reactive-lamp-1](https://vastquiet.space/sound-reactive-lamp-1).

## Features

- **Audio-Visual Synchronization**:
  - Maps audio frequency ranges (low, mid, high) to custom colors.
  - Maps audio amplitude to dynamic light brightness levels.
- **Philips Hue Integration**:
  - Sends real-time color data to a Philips Hue Bridge using the Entertainment API.
  - To learn more, sign up for a Hue developer account and access the documentation [here](https://developers.meethue.com/develop/hue-entertainment/hue-entertainment-api/).
- **Customizable Ableton Device UI**:
  - Supports on-the-fly light color assignment for low, mid, and high-frequency ranges through the Max for Live device UI.

## Installation

### Prerequisites

This project was designed around the following software and hardware:

**Software:**

- [Ableton Live](https://www.ableton.com/), [Max for Live](https://www.ableton.com/en/live/max-for-live/), and [Node for Max](https://github.com/Cycling74/n4m-core-examples).

**Hardware:**

- Microphone, audio interface, Philips Hue light bulb, and a [Hue Bridge](https://www.philips-hue.com/en-us/p/hue-bridge/046677458478#overview).

#### Steps

1. Clone the repository:
   `git clone https://github.com/nataliagalan/sound-reactive-lamp.git
cd sound-reactive-lamp
    `

2. Install dependencies: `npm install`

## Usage

1. **Set Up Philips Hue**:

   - Follow the [Philips Hue Entertainment API documentation](https://developers.meethue.com/develop/hue-entertainment/hue-entertainment-api/) to:
     - Set up your Hue Bridge.
     - Create an Entertainment Area.

2. **Configure the Environment**:

   - Create an `.env` file in the root directory of the project.
   - Use the `.env.example` file as a guide to configure the required environment variables.

3. **Prepare Ableton Live**:

   - Open Ableton Live, create, and save a new project.
   - Connect your microphone to your audio interface and ensure the audio input levels are between -12dB and -3dB.

4. **Install the Max for Live Device**:

   - Copy this repository to your Ableton Live Max for Live devices folder. The final path should look like this:
     ```
     your-ableton-project/Presets/Audio Effects/Max Audio Effect/sound-reactive-lamp_1
     ```
   - Add the `sound-reactive-lamp_1` Max for Live device to an audio track.

5. **Set Up Colors**:

   - Open the Max for Live device UI in Ableton and set the desired colors for low, mid, and high-frequency ranges.

6. **Run the Node.js Script**:

   - Press the `script start` button in the Max for Live device to run the Node.js code.

7. **Play and Experiment**:
   - Try different sounds and colors to observe how the lights react.
   - Explore the `philips-hue-audio-sync.js` script and `sound-reactive-lamp_1.amxd` Max patch to customize the project for your needs.

## Troubleshooting

- **Hue Bridge Connection Issues**:

  - Ensure the Hue Bridge is on the same network as your computer.
  - Verify that the Entertainment Area is set up correctly.

- **Audio Input Levels**:

  - Adjust microphone gain to keep levels between -12dB and -3dB.

- **Max for Live Device Not Responding**:
  - Restart Ableton Live after adding the Max for Live device.
  - Ensure Node.js is properly installed and configured.

## Contributing

Contributions are welcome! If you find bugs or have ideas for improvements:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature XYZ"`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

For major changes, please open an issue first to discuss your ideas.
