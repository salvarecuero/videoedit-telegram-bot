const colors = require("../utils/colors");

const processVideo = require("./processVideo");
const deleteFiles = require("../utils/deleteFiles");
const parseVideoOptionsRequest = require("../utils/parseVideoOptionsRequest");

const mime = require("mime-types");

module.exports = async (chatID, fileID, msgText, bot, states) => {
  await bot
    .downloadFile(fileID, "./assets/temp")
    .then((filePath) => {
      const filename = `file_${filePath.substr(filePath.lastIndexOf("_") + 1)}`;
      states[chatID].filename = filename;
      const videoOptions = parseVideoOptionsRequest(msgText);
      return processVideo(filePath, filename, videoOptions, fileID);
    })
    .then(async (filePath) => {
      await bot
        .sendVideo(chatID, filePath, {
          contentType: mime.lookup(filePath),
        })
        .then((sentData) => {
          console.log(
            `${colors.cyan}Video sent, -sent- file ID: ${sentData.video.file_id}`
          );
          deleteFiles(states[chatID].filename, filePath);
        });
    })
    .catch(async (err) => {
      await bot.sendMessage(
        chatID,
        `
        Oops, it seems we have an error over here. Make sure you sent a correct video file, not corrupted or anything related. I tried my best and sometimes I can do magic, but have my limitations.
        You may want to check out /start or /help .
        
      `
      );
      deleteFiles(states[chatID].filename);
      console.log(`${colors.red}Video wasn't sent, error ocurred before.`, err);
      reject();
    });
};
