const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {

  //msg.channel.fetchmsgs({ limit: 2 })
  let nDelete = args[0];
  msg.channel.bulkDelete(nDelete); 

  //let Reason = args.join(" ").slice(22);
  //msg.channel.bulkDelete(2);
  

}

module.exports.help = {
  name: "delete"
}
