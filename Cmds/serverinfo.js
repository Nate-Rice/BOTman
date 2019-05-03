const Discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, msg, args) => {
    
    let sicon = msg.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#12d239")
    .setThumbnail(sicon)
    .addField("Server Name", msg.guild.name)
    .addField("Server was created on", msg.guild.createdAt)
    .addField("Total members", msg.guild.memberCount);

    return msg.channel.send(serverembed);

}

module.exports.help = {
  name: "serverinfo"
}