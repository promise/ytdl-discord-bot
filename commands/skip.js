module.exports.permissionRequired = 1

module.exports.run = async (client, message, args, config, queue) => {
  if (!message.member.voice.channel) return message.channel.send("❌ You are not in a voice channel!")

  const serverQueue = queue.get(message.guild.id)
  if (!serverQueue) return message.channel.send("❌ There is nothing playing right now!")

  await message.channel.send("⏭ The player has been skipped!")
  return serverQueue.connection.dispatcher.end()
}

module.exports.help = {
  name: "skip",
  description: "Skips the currently playing audio to the next one",
  usage: "skip",
};
