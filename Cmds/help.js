const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => { //function with three arguments.

  let serverembed = new Discord.RichEmbed()
  .setDescription("BOT COMMANDS")
  .setColor("#db1125")
  .addField("!serverinfo", "Display information for the current server.")
  .addField("!user", "Display your own user information.")
  .addField("!8ball 'question'", "Ask the magic 8 ball a question and see what the answer is.")
  .addField("!report <user> 'Report reason'", "Report a user for a given reason.")

  msg.channel.send(serverembed);

}

module.exports.help = {
  name: "help"
}
