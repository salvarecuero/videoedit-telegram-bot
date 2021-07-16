module.exports = (msg) => {
  msg.from.userFullName = `${msg.from.first_name} ${
    msg.from.last_name ? msg.from.last_name : ""
  } (${msg.from.username ? msg.from.username : "no username"})`;

  return msg;
};
