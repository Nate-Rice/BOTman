const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let User = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!User) return message.channel.send("Couldn't find user.");
  let Reason = args.join(" ").slice(22);
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have the authority to do that!");
  if(User.hasPermission("BAN_MEMBERS")) return message.channel.send("Cannot ban that person!");

  let banEmbed = new Discord.RichEmbed()
  .setDescription("Ban")
  .setColor("#db1125")
  .addField("Banned User", `${User} with ID ${User.id}`)
  .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Banned In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", Reason);

  message.guild.member(User).ban(Reason);
  message.channel.send(banEmbed);


}

module.exports.help = {
  name: "ban"
}
