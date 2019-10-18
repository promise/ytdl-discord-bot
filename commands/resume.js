module.exports.permissionRequired = 1

module.exports.run = async (client, message, args, config, queue) => {
  if (!message.member.voiceChannel) return message.channel.send("❌ You are not in a voice channel!")

  const serverQueue = queue.get(message.guild.id)
  if (!serverQueue) return message.channel.send("❌ There is nothing playing right now!")
  if (serverQueue.playing) return message.channel.send("❌ The player is already resumed!")

  serverQueue.playing = true
  serverQueue.connection.dispatcher.resume()
  return message.channel.send("▶ The player has been resumed!")
}