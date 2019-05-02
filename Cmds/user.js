const Discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, msg, args) => {

    let User = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
    if(!User) return msg.channel.send("Unable to find user.");
    
    let sicon = User.user.displayAvatarURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("User Information")
    .setColor("#db1125")
    .setThumbnail(sicon)
    .addField("Your Username", User)
    .addField("Your Nickname", User.displayName)
    .addField("Your Role", User.highestRole)
    .addField("You joined on", User.joinedAt);

    return msg.channel.send(serverembed);

}

module.exports.help = {
  name: "user"
}