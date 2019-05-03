const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
  let User = args[0];
  if(!User) return msg.channel.send("Unable to find user.");
  let Reason = args.join(" ").slice(22);
  if(!msg.member.hasPermission("UNBAN_MEMBERS")) return msg.channel.send("You do not have the authority to do that!");
  try {
    msg.guild.unban(User);
    msg.channel.send(`User with user id: ${User} has been unbanned.`)
  } catch(e) {
    console.log(e.msg)
  }

}

module.exports.help = {
  name: "unban"
}
