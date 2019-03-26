const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
  let User = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
  if(!User) return msg.channel.send("Couldn't find user.");
  //let Reason = args.join(" ").slice(22);
  //if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("You do not have the authority to do that!");
  //if(User.hasPermission("BAN_MEMBERS")) return msg.channel.send("Cannot ban that person!");

  let banEmbed = new Discord.RichEmbed()
  .setDescription("Mute")
  .setColor("#db1125")
  .addField("Unmuted User", `${User} with ID ${User.id}`)
  .addField("Unmuted By", `<@${msg.author.id}> with ID ${msg.author.id}`)
  .addField("Unmuted In", msg.channel)
  .addField("Time", msg.createdAt)
  //.addField("Reason", Reason);

  //msg.guild.member(User).setMute(Reason);
  msg.member.setMute(false);
  msg.channel.send(banEmbed);

}

module.exports.help = {
  name: "unmute"
}
