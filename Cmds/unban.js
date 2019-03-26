const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  //let User = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let User = args[0];
  if(!User) return message.channel.send("Unable to find user.");
  let Reason = args.join(" ").slice(22);
  if(!message.member.hasPermission("UNBAN_MEMBERS")) return message.channel.send("You do not have the authority to do that!");
  try {
    //message.guild.member(User).unban(Reason);
    message.guild.unban(User);
    message.channel.send(`User with user id: ${User} has been unbanned.`)
  } catch(e) {
    console.log(e.message)
  }

}

module.exports.help = {
  name: "unban"
}
