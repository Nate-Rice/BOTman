const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {

  if(!args[2]) return msg.reply("Invalid question! Try again.");
  let replies = ["Yes.", "No.", "I don't know.", "Ask again later."];


  let reply = Math.floor((Math.random() * replies.length)); //Math.random() gets number between 0 and 1
                                                             //Math.floor() grabs less than or equal integer

  let answerEmbed = new Discord.RichEmbed()
  .setColor("#ab3ae0")
  .addField("Answer:", replies[reply]);

  msg.channel.send(answerEmbed);

}

module.exports.help = {
  name: "8ball"
}
