module.exports = {
  token: "your discord bot token",
  messageTemplate:
    "Hello everyone, **{author}** just now uploaded a video **{title}**!\n{url}",
  //dont change messageTemplate
  channel_id: [
    {
      channel: "discord channel id 1",
      youtube_channel_id: "advanced settings (in pc) ->  youtube channel id",
    },
    {
      channel: "discord channel id 2",
      youtube_channel_id: "youtube channel id 2",
    },
    // ... more channels if you want same logic
  ],
  watchInterval: 10000,
  youtubeApiKey: "Token from google cloud platform",
};
