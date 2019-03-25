const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let User = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!User) return message.channel.send("Couldn't find user.");
  let Reason = args.join(" ").slice(22);
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have the authority to do that!");
  if(User.hasPermission("KICK_MEMBERS")) return message.channel.send("Cannot kick that person!");

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("Kick")
  .setColor("#db1125")
  .addField("Kicked User", `${User} with ID ${User.id}`)
  .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Kicked In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", Reason);

  message.guild.member(User).kick(Reason);
  message.channel.send(kickEmbed);

}

module.exports.help = {
  name: "kick"
}
