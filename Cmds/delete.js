const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {

  let nDelete = args[0];
  msg.channel.bulkDelete(nDelete); 

}

module.exports.help = {
  name: "delete"
}
