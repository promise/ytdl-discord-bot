module.exports.permissionRequired = 0

const ytdl = require("ytdl-core"), ytpl = require("ytpl"), ytsr = require("ytsr"), { Util } = require("discord.js");

module.exports.run = async (client, message, args, config, queue) => {
  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel) return message.channel.send("❌ You are not in a voice channel, please join one first!")

  const permissions = voiceChannel.permissionsFor(message.guild.me)
  if (!permissions.has("CONNECT")) return message.channel.send("❌ I don't have permission to connect to the voice channel!")
  if (!permissions.has("SPEAK")) return message.channel.send("❌ I don't have permission to speak in the voice channel!")

  if (!args.length) return message.channel.send("❌ You need to search for a video, or give me a URL!")

  const url = args.join(" ")
  if (url.includes("list=")) {
    const playlist = await ytpl(url.split("list=")[1])
    const videos = playlist.items;

    message.channel.send("✅ Playlist **" + playlist.title + "** (" + videos.length + ") has been added to the queue!")

    for (const video of videos) await queueSong(video, message, voiceChannel, queue)
  } else {
    let video;
    try {
      video = await ytdl.getBasicInfo(url)
    } catch(e) {
      try {
        const results = await ytsr(url, { limit: 10 })
        const videos = results.items
        let index = 0;

        if (!videos.length) return message.channel.send("❌ No search results found.")

        await message.channel.send([
          "__**Song selection:**__",
          videos.map(v => ++index + " - **" + v.title + "**").join("\n"),
          "**Select your song by sending the number from 1 to " + videos.length + " in chat.**"
        ].join("\n\n"))

        let response;
        try {
          response = await message.channel.awaitMessages(msg => 0 < parseInt(msg.content) && parseInt(msg.content) < videos.length + 1 && msg.author.id == message.author.id, {
            maxMatches: 1,
            time: 30000,
            errors: ['time']
          });
        } catch(e) {
          return message.channel.send("❌ Video selection timed out.")
        }
        const videoIndex = parseInt(response.first().content)
        video = await ytdl.getBasicInfo(videos[videoIndex - 1].link.split("?v=")[1])
      } catch(e) {
        console.log(e)
        return message.channel.send("❌ An unknown error occurred.")
      }
    }
    
    await message.channel.send("✅ Song **" + video.videoDetails.title + "** has been added to the queue!")
    return await queueSong(video, message, voiceChannel, queue)
  }
}

async function queueSong(video, message, voiceChannel, queue) {
  const serverQueue = queue.get(message.guild.id)

  const song = {
    id: video.videoDetails.videoId,
    title: Util.escapeMarkdown(video.videoDetails.title),
    url: video.videoDetails.video_url
  }

  if (!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel,
      connection: null,
      songs: [song],
      volume: 50,
      playing: true
    }

    try {
      const connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      queue.set(message.guild.id, queueConstruct)
      playSong(message.guild, queue, queueConstruct.songs[0])
    } catch(e) {
      console.log(e)
      message.channel.send("❌ An unknown error occoured upon trying to join the voice channel!")
      return queue.delete(message.guild.id)
    }
  } else serverQueue.songs.push(song);

  return;
}

async function playSong(guild, queue, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  serverQueue.connection.playStream(ytdl(song.id), { bitrate: 'auto' })
    .on("end", reason => {
      serverQueue.songs.shift();
      playSong(guild, queue, serverQueue.songs[0])
    })
    .on("error", console.error)
    .setVolumeLogarithmic(serverQueue.volume / 250)
  
  serverQueue.textChannel.send("🎶 Now playing **" + song.title + "**")
}