module.exports.permissionRequired = 1

module.exports.run = async (client, message, args, config, queue) => {
  if (!message.member.voiceChannel) return message.channel.send("❌ You are not in a voice channel!")

  const serverQueue = queue.get(message.guild.id)
  if (!serverQueue) return message.channel.send("❌ There is nothing playing right now!")

  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end('Skip command has been used!')
  return message.channel.send("⏹ The player has stopped!")
}