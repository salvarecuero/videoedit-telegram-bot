const optionsInfo = require("../assets/JSON/optionsDescriptions");

const requestOptions = optionsInfo.reduce((accum, option) => {
  accum.push(option.name);
  if (option.aliases) return accum.concat(option.aliases);
  else return accum;
}, []);

module.exports = requestOptions;
