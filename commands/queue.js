module.exports.permissionRequired = 0

module.exports.run = async (client, message, args, config, queue) => {
  const serverQueue = queue.get(message.guild.id)
  if (!serverQueue || serverQueue.songs.length == 0) return message.channel.send("❌ There is nothing playing right now!")
  if (serverQueue.songs.length == 1) return message.channel.send("❌ The queue is empty!")

  return message.channel.send([
    "__**Song queue:**__",
    serverQueue.songs.slice(1).map(song => `- ${song.title}`).join("\n"),
    `**Now playing:** ${serverQueue.songs[0].title}`
  ].join("\n\n"))
}

module.exports.help = {
  name: "queue",
  description: "Shows songs currently in queue",
  usage: "queue",
};
