// General
const videoReceived = require("./handlers/videoReceived");
const optionsReceived = require("./handlers/optionsReceived");
const startMessageReceived = require("./handlers/startMessageReceived");
const commandHelper = require("./handlers/commandHelper");
require("dotenv").config();
const invalidFileResponse = require("./handlers/invalidFileResponse");
const addFullNameToMsg = require("./utils/addFullNameToMsg");

// Telegram Bot
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const states = {};

bot.on("polling_error", (e) => console.log(e));

bot.onText(/^\/start/, (msg) => {
  msg = addFullNameToMsg(msg);

  startMessageReceived(msg, bot);
});

bot.on("video", async (msg) => {
  msg = addFullNameToMsg(msg);
  videoReceived(msg, states, bot);
});

bot.on("document", async (msg) => {
  if (msg.document.mime_type.startsWith("video/")) {
    msg = addFullNameToMsg(msg);
    const { document, ...restingProps } = msg;
    msg = { video: document, ...restingProps };
    videoReceived(msg, states, bot);
  } else {
    invalidFileResponse(msg, bot);
  }
});

/* 
It would be fun, but we should prepare some details 
like sent back a video note, disallow conversion 
and things like that.

bot.on("video_note", async (msg) => {
  msg = addFullNameToMsg(msg);
  const { video_note, ...restingProps } = msg;
  msg = { video: video_note, ...restingProps };
  videoReceived(msg, states, bot);
}); 
*/

bot.onText(/^\/help/, (msg) => {
  msg = addFullNameToMsg(msg);

  commandHelper(msg, bot);
});

bot.on("text", async (msg) => {
  const start = new RegExp(/^\/start/);
  const help = new RegExp(/^\/help/);

  if (start.test(msg.text) || help.test(msg.text)) return;
  msg = addFullNameToMsg(msg);
  optionsReceived(msg, states, bot);
});

// Handling unsupported message types

const invalidMsgTypes = [
  "photo",
  "voice",
  "video_note",
  "audio",
  "contact",
  "location",
  "animation",
];

invalidMsgTypes.forEach((msgType) => {
  bot.on(msgType, async (msg) => {
    invalidFileResponse(msg, bot);
  });
});

bot.on("sticker", async (msg) => {
  const chatID = msg.chat.id;
  bot.sendMessage(chatID, ":)");
});
