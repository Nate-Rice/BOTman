const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  //let User = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let User = args[0];
  if(!User) return message.channel.send("Couldn't find user.");
  let Reason = args.join(" ").slice(22);
  //if(!message.member.hasPermission("UNBAN_MEMBERS")) return message.channel.send("You do not have the authority to do that!");
  //if(User.hasPermission("UNBAN_MEMBERS")) return message.channel.send("Cannot ban that person!");
  try {
    //message.guild.member(User).unban(Reason);
    message.guild.unban(User);
  } catch(e) {
      console.log(e.message)
  }

  let unbanEmbed = new Discord.RichEmbed()
  .setDescription("Unban")
  .setColor("#db1125")
  .addField("Unbanned User", `${User} with ID ${User.id}`)
  .addField("Unbanned By", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Unbanned In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", Reason);

  //message.guild.member(User).unban(Reason);
  message.channel.send(unbanEmbed);


}

module.exports.help = {
  name: "unban"
}
