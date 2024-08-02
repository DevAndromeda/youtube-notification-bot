const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");
const config = require("./config");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

let lastVideoId = null;

async function checkYouTube() {
  try {
    for (const channelId of config.channel_id) {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=${config.youtubeApiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1`
      );

      const video = response.data.items[0];

      console.log(`Checking for new video on channel ${channelId}:`, video);

      if (video.id.videoId !== lastVideoId) {
        lastVideoId = video.id.videoId;
        const channel = await client.channels.fetch(channelId);
        const message = config.messageTemplate
          .replace("{author}", video.snippet.channelTitle)
          .replace("{title}", video.snippet.title)
          .replace(
            "{url}",
            `https://www.youtube.com/watch?v=${video.id.videoId}`
          );
        channel.send(message);
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
