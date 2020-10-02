module.exports.permissionRequired = 0;

module.exports.run = async (client, message, args, config) => {
  let command = args[0];

  if (!command || command === "help") {
    var text = "**__Available Commands__**\n";
    for (let [command, props] of client.commands) {
      if (command === "help") continue;
      text += "• `" + command + "`\n";
    }

    text += `\nTo know more about a particular command, type ${config.prefix}help <command>\n`;

    message.channel.send(text);
  } else {
    command = client.commands.get(command);
    var text = `**Command:** ${command.help.name}\n**Description:** ${
      command.help.description || "No Description"
    }\n**Usage:** ${config.prefix}${command.help.usage || "No Usage"}`;

    message.channel.send(text);
  }
};

module.exports.help = {
  name: "help",
};
