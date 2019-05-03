const Discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, msg, args) => {
    if (!args[0]) {
        msg.channel.send("Please provide a Youtube link!");
        //msg.channel.send(`${args[0]}`);
        return;
    }
    if (!msg.member.voiceChannel) {
        msg.channel.send("You need to be in a voice chat to play music.");
        return;
    }

    let validate = await ytdl.validateURL(args[0]);
    if (!validate) return msg.channel.send("Please use a valid URL");

    let info = await ytdl.getInfo(args[0]);
    try {
        let connection = await msg.member.voiceChannel.join();
        let dispatcher = await connection.playStream(ytdl(args[0], {filter: 'audioonly'}));
        dispatcher.setVolume(0.5);
    } catch(err) {
        console.error(err);
    }

    msg.channel.send(`Now playing: ${info.title}`);

}

module.exports.help = {
  name: "play"
}