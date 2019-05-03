const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
  let User = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
  if(!User) return msg.channel.send("Couldn't find user.");


  let unmuteEmbed = new Discord.RichEmbed()
  .setDescription("Mute")
  .setColor("#db1125")
  .addField("Unmuted User", `${User} with ID ${User.id}`)
  .addField("Unmuted By", `<@${msg.author.id}> with ID ${msg.author.id}`)
  .addField("Unmuted In", msg.channel)
  .addField("Time", msg.createdAt)
  //.addField("Reason", Reason);

  //msg.guild.member(User).setMute(Reason);
  await User.setMute(false);
  msg.channel.send(unmuteEmbed);

}

module.exports.help = {
  name: "unmute"
}
