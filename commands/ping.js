module.exports.permissionRequired = 0

const fetch = require("node-fetch");
let bestRegion; fetch("https://best.discord.media/region").then(res => res.text()).then(region => bestRegion = region.replace("\n", "")).catch()

module.exports.run = async (client, message, args, config, queue) => {
  const botMsg = await message.channel.send("〽 Pinging ...");
  botMsg.edit("🏓 Pong! Latency is \`" + (botMsg.createdTimestamp - message.createdTimestamp) + "ms\` and API latency is \`" + Math.round(client.ping) + "ms\`" + (bestRegion && bestRegion !== message.guild.region ? "\n❗ My best region is \`" + bestRegion + "\`, get the best latency by switching over to it." : ""));
}