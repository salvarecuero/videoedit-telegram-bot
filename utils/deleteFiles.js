const colors = require("../utils/colors");

const fs = require("fs");

module.exports = (originalFileName, resultFilePath) => {
  fs.unlinkSync(`./assets/temp/${originalFileName}`);
  resultFilePath && fs.unlinkSync(resultFilePath);

  console.log(`${colors.cyan}File deleted, file name: ${originalFileName}`);
};
