const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {

  let nDelete = args[0];
  try {
    if (nDelete > 100) {
      msg.channel.send("The max you can delete at any given time is 1000.")
    } else {
      await msg.channel.bulkDelete(nDelete);
    } 
  } catch(err) {
    console.error(err);
  }

}

module.exports.help = {
  name: "delete"
}
