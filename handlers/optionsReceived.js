const colors = require("../utils/colors");
const resolveVideoRequest = require("./resolveVideoRequest");
const deleteHoldOnMsg = require("../utils/deleteHoldOnMsg");

module.exports = (msg, states, bot) => {
  const chatID = msg.chat.id;

  console.log(
    `${colors.white}New message received from ${msg.from.userFullName}`
  );

  if (states[chatID]) {
    const msgText = msg.text;

    console.log(
      `${colors.cyan}Message was a response from ${msg.from.userFullName}, input was: "${msgText}"`
    );
    bot
      .sendMessage(chatID, "Okay... give me some time to process it.")
      .then(async (holdOnMsg) => {
        await resolveVideoRequest(
          chatID,
          states[chatID].file_id,
          msgText,
          bot,
          states
        )
          .then(() => {
            delete states[chatID];
            deleteHoldOnMsg(chatID, holdOnMsg.message_id, bot, msg);

            console.log(
              `${colors.green}✔ Request solved to ${msg.from.userFullName}`
            );
          })
          .catch(() => {
            delete states[chatID];
            deleteHoldOnMsg(chatID, holdOnMsg.message_id, bot, msg);

            console.log(
              `${colors.red}✗ Request failed to ${msg.from.userFullName}`
            );
          });
      });
  } else {
    bot.sendMessage(
      chatID,
      "It seems you haven't send a video yet, try handling me one and I will try to help you."
    );

    console.log(
      `${colors.yellow}Message received but user doesn't have a video, from ${msg.from.userFullName}`
    );
  }
};
