const colors = require("../utils/colors");
const addFullNameToMsg = require("../utils/addFullNameToMsg");

module.exports = (msg, bot) => {
  const chatID = msg.chat.id;
  msg = addFullNameToMsg(msg);

  bot
    .sendMessage(
      chatID,
      "Hmmm, weird, but it seems you didn't handle me a video file. ¯_(ツ)_/¯"
    )
    .then(() =>
      console.log(
        `${colors.green}Invalid file received from ${msg.from.userFullName}`
      )
    );
};
