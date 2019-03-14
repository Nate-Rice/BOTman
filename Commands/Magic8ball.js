const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!args[2]) return message.reply("Invalid question! Try again.");
  let replies = ["Yes.", "No.", "I don't know.", "Ask again later."];


  let result = Math.floor((Math.random() * replies.length)); //Math.random() gets number between 0 and 1
                                                             //Math.floor() grabs less than or equal value
  let question = args.slice(1).join(" ");

  message.channel.send(replies[result]);

}

module.exports.help = {
  name: "8ball"
}
