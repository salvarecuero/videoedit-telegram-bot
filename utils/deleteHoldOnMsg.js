const colors = require("./colors");

module.exports = (chatID, msgID, bot, msg) => {
  bot.deleteMessage(chatID, msgID);

  console.log(
    `${colors.cyan}'Hold on' message was deleted to ${msg.from.userFullName}`
  );
};
