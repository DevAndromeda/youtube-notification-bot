const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");
const config = require("./config");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// Object to store last video IDs for each channel (avoiding global variable)
const lastVideoIds = {};

async function checkYouTube() {
  try {
    for (const channelConfig of config.channel_id) {
      const { channel, youtube_channel_id } = channelConfig;
      const lastVideoIdKey = `lastVideoId_${youtube_channel_id}`;

      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=${config.youtubeApiKey}&channelId=${youtube_channel_id}&part=snippet,id&order=date&maxResults=1`
      );

      const video = response.data.items[0];

      if (
        !lastVideoIds[lastVideoIdKey] ||
        video.id.videoId !== lastVideoIds[lastVideoIdKey]
      ) {
        lastVideoIds[lastVideoIdKey] = video.id.videoId; // Store last video ID for each channel

        const discordChannel = await client.channels.fetch(channel);
        const message = config.messageTemplate
          .replace("{author}", video.snippet.channelTitle)
          .replace("{title}", video.snippet.title)
          .replace(
            "{url}",
            `https://www.youtube.com/watch?v=${video.id.videoId}`
          );
        discordChannel.send(message);
      }
    }
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
  }
}

client.once("ready", () => {
  console.log("Bot is online!");
  checkYouTube();
  setInterval(checkYouTube, config.watchInterval);
});

client.login(config.token);
