module.exports.permissionRequired = 1

module.exports.run = async (client, message, args, config, queue) => {
  if (!message.member.voice.channel) return message.channel.send("❌ You are not in a voice channel!")

  const serverQueue = queue.get(message.guild.id)
  if (!serverQueue) return message.channel.send("❌ There is nothing playing right now!")
  if (!serverQueue.playing) return message.channel.send("❌ The player is already paused!")

  serverQueue.playing = false
  serverQueue.connection.dispatcher.pause(true)
  return message.channel.send("⏸ The player has been paused!")
}

module.exports.help = {
  name: "pause",
  description: "Pause the currently playing audio",
  usage: "pause",
};
