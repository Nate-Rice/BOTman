const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => { //function with three arguments.

  let serverembed = new Discord.RichEmbed()
  .setDescription("BOT COMMANDS")
  .setColor("#4286f4")
  .addField("!play <Youtube URL>", "Play music from youtube URL.")
  .addField("!stop", "Stops the bot from playing music.")
  .addField("!ban <user> 'Ban reason'", "Ban a user.")
  .addField("!unban <userID>", "Unban a user.")
  .addField("!kick <user> 'Kick reason'", "Kick a user for a given reason.")
  .addField("!mute <user>", "Mute a user.")
  .addField("!unmute <user>", "Unmute a user.")
  .addField("!disable <command>", "Disable a given command.")
  .addField("!delete #", "Deletes a given number of messages.")
  .addField("!fortune", "Tells you your fortune.")
  .addField("!roll <# dice>", "Rolls a given number of dice.")
  .addField("!serverinfo", "Display information for the current server.")
  .addField("!user", "Display your own user information.")
  .addField("!8ball 'question'", "Ask the magic 8 ball a question and see what the answer is.")
  .addField("!info <First Last>", "Displays info about GoT character.")
  .addField("!8ball <Question>", "Ask the magic 8ball a question.")
  .addField("!warn <user> 'Warn reason'", "Wars a user.")
  .addField("!weather <City name>", "Displays weather for a given city.")



  msg.channel.send(serverembed);

}

module.exports.help = {
  name: "help"
}
