const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //message.channel.fetchMessages({ limit: 2 })
  let nDelete = args[0];
  message.channel.bulkDelete(nDelete); 

  //let Reason = args.join(" ").slice(22);
  //message.channel.bulkDelete(2);
  

}

module.exports.help = {
  name: "delete"
}
