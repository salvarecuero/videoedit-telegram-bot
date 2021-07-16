const colors = require("../utils/colors");
const mime = require("mime-types");
require("dotenv").config();
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const FfmpegCommand = require("fluent-ffmpeg");
FfmpegCommand.setFfmpegPath(ffmpegPath);

module.exports = (filePath, fileName, options, fileID) => {
  return new Promise((resolve, reject) => {
    let resultPath = `./assets/results/${fileName}`;
    const videoProcessing =
      FfmpegCommand(filePath).outputOption("-fs 52428800");

    if (options["mute"]) videoProcessing.noAudio();
    if (options["reverse"]) {
      videoProcessing.videoFilter("reverse");
      videoProcessing.audioFilter("areverse");
    }
    if (options["bw"] || options["grayscale"]) {
      videoProcessing.videoFilter("hue=s=0");
    }
    if (options["volume"]) {
      const value = parseInt(options["volume"]);
      if (value && 0 < value <= 10) {
        videoProcessing.audioFilter(`volume=${value}`);
      }
    }
    if (options["convert"]) {
      const acceptedFormats = ["avi", "mp4", "webm", "mkv", "apng"];

      const originalFormat = mime.extension(filePath);
      const validFormat = acceptedFormats.some(
        (format) => format === options["convert"]
      );

      if (validFormat && validFormat !== originalFormat) {
        resultPath = `./assets/results/${fileName.substr(
          0,
          fileName.lastIndexOf(".")
        )}.${options["convert"]}`;
      }
    }

    videoProcessing
      .save(resultPath)
      .on("start", () => {
        console.log(`${colors.cyan}Video process started, file ID: ${fileID}`);
      })
      .on("end", () => {
        console.log(`${colors.cyan}Video process ended, file ID: ${fileID}`);
        resolve(resultPath);
      })
      .on("error", (err) => {
        console.log(`${colors.red}Video process failed, file ID: ${fileID}`);
        reject(err);
      });
  });
};
