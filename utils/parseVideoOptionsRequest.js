const requestOptions = require("./getCommandsAndAliases");

module.exports = (msgText) => {
  const parsedRequest = {};

  msgText = msgText
    .toLowerCase()
    .replace(/\s+/g, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .map((opt) => (!opt.includes("=") ? `${opt}=true` : opt))
    .join(" ")
    .replace(/ /g, '", "')
    .replace(/=/g, '": "');

  const optionsObject = JSON.parse(`{"${msgText}"}`);

  requestOptions.forEach(
    (opt) => optionsObject[opt] && (parsedRequest[opt] = optionsObject[opt])
  );

  return parsedRequest;
};
