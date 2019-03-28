const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {

  if(!args[2]) return msg.reply("Invalid question! Try again.");
  let replies = ["Yes.", "No.", "I don't know.", "Ask again later."];


  let reply = Math.floor((Math.random() * replies.length)); //Math.random() gets number between 0 and 1
                                                             //Math.floor() grabs less than or equal value
  //let question = args.slice(1).join(" ");

  msg.channel.send(replies[reply]);

}

module.exports.help = {
  name: "8ball"
}
