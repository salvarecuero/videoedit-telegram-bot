const colors = require("../utils/colors");

module.exports = (msg, bot) => {
  const chatID = msg.chat.id;
  const messageOpts = { parse_mode: "html" };

  bot
    .sendMessage(
      chatID,
      `
<b>Hey!</b> You can handle me a video <i>(max. size is 20mb!)</i>, and wait <i>a little</i> that I ask you what you want to do with it.

<b><u>You can do several things:</u></b>

<b>- mute:</b> <i>Silence the video.</i>
<b>- volume:</b> <i>Change the volume.</i>
<b>- reverse:</b> <i>Plays the video backwards.</i>
<b>- bw:</b> <i>Black and white.</i>
<b>- convert:</b> <i>Convert to another format.</i>

<b>e.g.</b> after sending a video you could specify the following parameters:

- <code>mute bw</code>  <i>(This would mute the video and make it black and white)</i>
- <code>reverse convert=avi</code>  <i>(This would reverse the video and convert it to .avi)</i>
- <code>volume=5 bw reverse convert=mkv</code>  <i>(This would multiply to 5 the volume, black and white it, reverse it and convert it to .mkv)</i>

And all the combinations you can imagine, there are some limits though <i>(volume value limit is 10, you can convert to <u>some</u> formats, and etc.)</i>.

You can use "/help <code>command</code>" , where <code>command</code> is the option name that you want to know about.

If you enter a wrong option or value <i>(in the case the option requires it)</i> that one will be ignored, but the remaining ones will be processed.
`,
      messageOpts
    )
    .then(() =>
      console.log(
        `${colors.green}Start message sent to ${msg.from.userFullName}`
      )
    );
};
