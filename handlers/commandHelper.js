const optionsInfo = require("../assets/JSON/optionsDescriptions");
const requestOptions = require("../utils/getCommandsAndAliases");

function commandResolver(chatID, command, bot) {
  const commandResult = commandMatches(command)[0];

  if (commandResult) {
    const messageOpts = { parse_mode: "html" };
    bot.sendMessage(
      chatID,
      `
<b>Command:</b> ${commandResult.name}
${
  commandResult.aliases
    ? `<b>Aliases:</b> ${commandResult.aliases.join(" - ")}`
    : ""
}
<b>Description:</b> ${commandResult.description}
    
<b>Examples/Guide:</b> ${commandResult.examples.join("\r\n")}
            `,
      messageOpts
    );
  } else {
    bot.sendMessage(
      chatID,
      "Hmmm... It seems we couldn't find any command to help you with, check if you entered it right."
    );
  }
}

function commandMatches(command) {
  command = command
    .toLowerCase()
    .replace(/\s+/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return optionsInfo.filter(
    (option) =>
      (option.name + option.aliases?.join(""))
        .toLowerCase()
        .replace(/\s+/g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .search(command) >= 0
  );
}

module.exports = (msg, bot) => {
  const chatID = msg.chat.id;
  const command = msg.text.replace("/help", "");

  if (command) {
    commandResolver(chatID, command, bot);
  } else {
    const messageOpts = { parse_mode: "html" };
    bot.sendMessage(
      chatID,
      `
<b>Oh, let me help you.</b>

To get information about a specific command, you can use "/help <code>command</code>" <i>(without quotes)</i>, where <code>command</code> is one of the follow list:

${requestOptions.map((option) => `- <i>${option}</i>`).join("\r\n")}
`,
      messageOpts
    );
  }
};
