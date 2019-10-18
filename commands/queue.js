module.exports.permissionRequired = 0

module.exports.run = async (client, message, args, config, queue) => {
  const serverQueue = queue.get(message.guild.id)
  if (!serverQueue) return message.channel.send("❌ There is nothing playing right now!")

  return message.channel.send([
    "__**Song queue:**__",
    serverQueue.songs.map(song => "- " + song.title).join("\n"),
    "**Now playing:** " + serverQueue.songs[0].title
  ].join("\n\n"))
}