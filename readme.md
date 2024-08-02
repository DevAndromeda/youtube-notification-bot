Absolutely! Here's the updated README with the changes incorporated:

## Discord YouTube Notification Bot

First, delete `package.json` if it exists, and run `npm init` to create a basic one. This bot checks your configured YouTube channels every **15 seconds** for new uploads or live streams and sends notifications to the corresponding Discord channels. It utilizes the YouTube Data API and the `discord.js` library.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Bot](#running-the-bot)
- [Code Explanation](#code-explanation)
- [Dependencies](#dependencies)

## Installation

1. **Clone the Repository (if applicable):**

   ```bash
   git clone https://github.com/your-username/discord-youtube-notification-bot.git
   cd discord-youtube-notification-bot
   ```

2. **Initialize `package.json`:**

   ```bash
   npm init -y
   ```

   This creates a basic `package.json` file for your project.

3. **Install Required Packages:**

   ```bash
   npm install discord.js axios
   ```

4. **Get YouTube Data API Key:**

   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project (if needed).
   - Enable the YouTube Data API v3 for your project.
   - Create an API key.

## Configuration

1. **Create `config.js` File:**

   In the root directory of your project, create a file named `config.js` and add the following configuration:

   ```javascript
   module.exports = {
     token: "YOUR_DISCORD_BOT_TOKEN",
     channel_id: [
       {
         channel: "YOUR_DISCORD_CHANNEL_ID_1",
         youtube_channel_id: "YOUR_YOUTUBE_CHANNEL_ID_1",
         // optional: messageTemplate: "Custom template for channel 1"
       },
       {
         channel: "YOUR_DISCORD_CHANNEL_ID_2",
         youtube_channel_id: "YOUR_YOUTUBE_CHANNEL_ID_2",
       },
       // ... add more channel configurations
     ],
     watchInterval: 15000, // 15 seconds in milliseconds
     youtubeApiKey: "YOUR_YOUTUBE_API_KEY",
   };
   ```

   - `token`: Your Discord bot token (from Developer Portal).
   - `channel_id`: An array of objects containing configuration for each monitored channel.
     - `channel`: ID of the Discord channel for notifications.
     - `youtube_channel_id`: ID of the YouTube channel to monitor.
     - `messageTemplate` (optional): Custom message template for this channel.
   - `watchInterval`: The interval (in milliseconds) for checking new uploads (default: 15 seconds).
   - `youtubeApiKey`: Your YouTube Data API key.

## Running the Bot

1. **Run the Bot:**

   ```bash
   node index.js
   ```

   If everything is set up correctly, you should see the following output:

   ```bash
   Bot is online!
   ```

2. **Bot Operation:**

   - The bot checks for new uploads on your configured YouTube channels every 15 seconds.
   - If a new video is found for any channel, it sends a notification to the corresponding Discord channel with a customized message template (if provided).

## Code Explanation

### `config.js`

This file houses the configuration for your bot, including Discord bot token, channel configurations (with Discord and YouTube channel IDs, optional custom message templates), watch interval, and YouTube API key.

### `index.js`

This is the main file for the bot. It performs the following:

- Initializes the Discord client.
- Iterates through each channel configuration in `config.js`.
  - For each channel, fetches the latest video from the YouTube channel using the YouTube Data API.
  - Compares the fetched video ID with the last fetched video ID stored separately for each channel (using a unique key).
  - Sends a notification to the specified Discord channel if a new video is found, using the corresponding message template (if provided).

### Key Functions:

- `checkYouTube(config)`: Fetches the latest video from YouTube channels, compares IDs, and sends notifications if needed.
- `client.once('ready', ...)`: Runs when the bot is ready. Starts the initial check and sets up an interval for periodic checks.

## Dependencies

- **discord.js**: Library to interact with the Discord API.
- \*\*
