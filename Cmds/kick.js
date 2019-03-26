const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
  let User = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
  if(!User) return msg.channel.send("Unable to find user.");
  let Reason = args.join(" ").slice(22);
  if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send("You do not have the authority to do that!");
  if(User.hasPermission("KICK_MEMBERS")) return msg.channel.send("Unable to kick admins!");

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("Kick")
  .setColor("#db1125")
  .addField("Kicked User", `${User} with ID ${User.id}`)
  .addField("Kicked By", `<@${msg.author.id}> with ID ${msg.author.id}`)
  .addField("Kicked In", msg.channel)
  .addField("Time", msg.createdAt)
  .addField("Reason", Reason);

  msg.guild.member(User).kick(Reason);
  msg.channel.send(kickEmbed);

}

module.exports.help = {
  name: "kick"
}
