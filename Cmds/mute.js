const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
  let User = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
  if(!User) return msg.channel.send("unable to find user.");
  if(!msg.member.hasPermission("MUTE_MEMBERS")) return msg.channel.send("You do not have the authority to do that!");
  if(User.hasPermission("MUTE_MEMBERS")) return msg.channel.send("Cannot ban that person!");

  let banEmbed = new Discord.RichEmbed()
  .setDescription("Mute")
  .setColor("#db1125")
  .addField("Muted User", `${User} with ID ${User.id}`)
  .addField("Muted By", `<@${msg.author.id}> with ID ${msg.author.id}`)
  .addField("Muted In", msg.channel)
  .addField("Time", msg.createdAt);
  
  await User.setMute(true);
  msg.channel.send(banEmbed);

}

module.exports.help = {
  name: "mute"
}
