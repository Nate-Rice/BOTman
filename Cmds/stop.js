const Discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, msg, args) => {
    
    if (msg.guild.voiceConnection) msg.guild.voiceConnection.disconnect();
    msg.channel.send("Who turned out the lights?");

}

module.exports.help = {
  name: "stop"
}