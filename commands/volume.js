module.exports.permissionRequired = 1

module.exports.run = async (client, message, args, config, queue) => {
  if (!message.member.voice.channel) return message.channel.send("❌ You are not in a voice channel!")

  const serverQueue = queue.get(message.guild.id)
  if (!serverQueue) return message.channel.send("❌ There is nothing playing right now!")

  if (!args[0]) return message.channel.send(`🔉 The volume is ${serverQueue.volume}`);

  const volume = parseInt(args[0])
  if (!volume || volume > 100) return message.channel.send("❌ Invalid volume level, pick a number between 1 and 100!")

  serverQueue.volume = volume;
  serverQueue.connection.dispatcher.setVolumeLogarithmic(volume / 250);
  return message.channel.send(`🔊 The volume is now ${volume}!`)
}