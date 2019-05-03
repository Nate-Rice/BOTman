const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
  let rUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
  if(!rUser) return msg.channel.send("Unable to find user.");
  let rreason = args.join(" ").slice(21);
  console.log(rreason);

  let reportEmbed = new Discord.RichEmbed()
  .setDescription("Reports")
  .setColor("#db1125")
  .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
  .addField("Channel", msg.channel)
  .addField("Time", msg.createdAt)
  .addField("Reason", rreason);

  let reportschannel = msg.guild.channels.find(channel => channel.name === "reports");
  if (!reportschannel) return msg.channel.send("Couldn't find reports channel.");

  reportschannel.send(reportEmbed);

}

module.exports.help = {
  name: "report"
}
