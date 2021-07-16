const colors = require("../utils/colors");

module.exports = (msg, states, bot) => {
  const chatID = msg.chat.id;
  const videoMsgReference = msg.message_id;
  const fileID = msg.video.file_id;
  // 20971520 is a value in bytes that represents 20Mb, which is the max size of a file that a bot can download from Telegram.
  const validFileSize = msg.video.file_size < 20971520;

  console.log(
    `${colors.white}Video received from ${msg.from.userFullName}, file ID: ${fileID}`
  );

  if (!states[chatID] && validFileSize) {
    bot.sendMessage(chatID, "What would you like to do?", {
      reply_to_message_id: videoMsgReference,
      reply_markup: {
        force_reply: true,
      },
    });

    console.log(
      `${colors.cyan}Asked to ${msg.from.userFullName}, file ID: ${fileID}`
    );
  } else if (!validFileSize) {
    bot.sendMessage(
      chatID,
      "Oh, sorry, it seems that this video is longer than 20mb, which is the maximum that Telegram allow us to work with. Try sending a smaller file. :(",
      {
        reply_to_message_id: videoMsgReference,
      }
    );
    console.log(
      `${colors.yellow}Video was too big... received from ${msg.from.userFullName}, file ID: ${fileID},`
    );
    delete states[chatID];
  } else {
    bot.sendMessage(
      chatID,
      "Seems you have sent a video already, that one will be replaced with this one.\n Tell me, what would you like to do with this video?",
      {
        reply_to_message_id: videoMsgReference,
        reply_markup: {
          force_reply: true,
        },
      }
    );
    console.log(
      `${colors.yellow}This user had a video in queue, but sent another one.${colors.cyan} Now we asked. From ${msg.from.userFullName}, (new) file ID: ${fileID}`
    );
  }

  if (validFileSize)
    states[chatID] = {
      file_id: fileID,
    };
};
