const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
  let User = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
  if(!User) return msg.channel.send("Unable to find user.");
  let Reason = args.join(" ").slice(22);
  if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("You do not have the authority to do that!");
  if(User.hasPermission("BAN_MEMBERS")) return msg.channel.send("Unable to ban admins!");

  let banEmbed = new Discord.RichEmbed()
  .setDescription("Ban")
  .setColor("#db1125")
  .addField("Banned User", `${User} with ID ${User.id}`)
  .addField("Banned By", `<@${msg.author.id}> with ID ${msg.author.id}`)
  .addField("Banned In", msg.channel)
  .addField("Time", msg.createdAt)
  .addField("Reason", Reason);

  msg.guild.member(User).ban(Reason);
  msg.channel.send(banEmbed);


}

module.exports.help = {
  name: "ban"
}
