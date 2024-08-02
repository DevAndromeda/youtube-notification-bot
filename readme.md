# Discord YouTube Notification Bot

First, delete package.json if its still popping up, and do "npm init" and initialise a normal package.json

This bot checks your YouTube channel every 15 seconds for new uploads or live streams and sends a notification to a specified Discord channel. It uses the YouTube Data API and the `discord.js` library.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Bot](#running-the-bot)
- [Code Explanation](#code-explanation)
- [Dependencies](#dependencies)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/discord-youtube-notification-bot.git
   cd discord-youtube-notification-bot
   ```

2. **Install Required Packages:**

   ```bash
   npm install discord.js axios
   ```

3. **Get YouTube Data API Key:**

   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project.
   - Enable the YouTube Data API v3 for your project.
   - Create an API key.

## Configuration

1. **Create `config.js` File:**

   In the root directory of your project, create a file named `config.js` and add the following configuration:

   ```javascript
   module.exports = {
     token: "YOUR_DISCORD_BOT_TOKEN",
     channel: "YOUR_DISCORD_CHANNEL_ID",
     messageTemplate:
       "Hello everyone, **{author}** just now uploaded a video **{title}**!\n{url}",
     channel_id: "YOUR_YOUTUBE_CHANNEL_ID",
     watchInterval: 15000,
     youtubeApiKey: "YOUR_YOUTUBE_API_KEY",
   };
   ```

   - `token`: Your Discord bot token. You can get this from the [Discord Developer Portal](https://discord.com/developers/applications).
   - `channel`: The ID of the Discord channel where you want to send notifications.
   - `messageTemplate`: The template for the notification message. `{author}` will be replaced with the channel name, `{title}` with the video title, and `{url}` with the video URL.
   - `channel_id`: The ID of your YouTube channel.
   - `watchInterval`: The interval (in milliseconds) at which the bot checks for new uploads (15000ms = 15 seconds).
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

   - The bot will check for new uploads on your YouTube channel every 15 seconds.
   - If a new video is found, it will send a notification to the specified Discord channel.

## Code Explanation

### `config.js`

This file contains the configuration for your bot, including your Discord bot token, Discord channel ID, message template, YouTube channel ID, watch interval, and YouTube API key.

### `index.js`

This is the main bot file. It does the following:

- Initializes the Discord client.
- Fetches the latest video from the YouTube channel using the YouTube Data API.
- Compares the fetched video ID with the last fetched video ID to detect new uploads.
- Sends a notification to the specified Discord channel if a new video is found.

### Key Functions:

- `checkYouTube()`: Fetches the latest video from the YouTube channel and sends a notification if a new video is found.
- `client.once('ready', ...)`: Runs when the bot is ready. Starts the initial check and sets up an interval to check for new videos every 15 seconds.

## Dependencies

- **discord.js**: Library to interact with the Discord API.
- **axios**: Library to make HTTP requests to the YouTube Data API.

---

This README provides a comprehensive guide to setting up and running your Discord YouTube notification bot. If you have any questions or run into issues, feel free to ask!
