const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
//const botconfig = require("./warnings.json");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));



module.exports.run = async (bot, msg, args) => {
    
    if(!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send("You do not have the authority to do that!");
    let User = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
    if(!User) return msg.channel.send("Unable to find user.");
    if(User.hasPermission("MANAGE_ROLES")) return msg.channel.send("Unable to warn admins!");
    let Reason = args.join(" ").slice(22);

    if (!warns[User.id]) warns[User.id] = {
        warns: 0
    };

    warns[User.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    let wEmbed = new Discord.RichEmbed()
    .setDescription("Warnings")
    .setAuthor(msg.author.username)
    .setColor("#db1125")
    .addField("Warned User", User.id)
    .addField("Warned In", msg.channel)
    .addField("Number of Warnings", warns[User.id].warns)
    .addField("Reason", Reason);

    let wChannel = msg.guild.channels.find(`name`, "dev");
    if (!wChannel) return MessageChannel.reply("Couldn't find channel");
    wChannel.send(wEmbed);

    if (warns[User.id].warns === 2) {
        try {
            await User.setMute(true);
        } catch (e) {
            console.log(e.stack);
        }
        /* let muteRole = msg.guild.roles.find(`name`, "muted");
        //if (!muteRole) return msg.reply("No mute role");
        if (!muteRole) {
            try {

            } catch (e) {
                console.log(e.stack);
            }
        }
        let mutetime = "10s";
        await(User.addRole(muteRole.id));
        msg.channel.send(`${User.tag} has been temporarily muted`);

        setTimeout(function(){
            User.removeRole(muteRole.id);
            msg.channel.reply(`They have been unmuted.`);
        }, ms(mutetime)); */
    }
    if (warns[User.id].warns === 3) {
        console.log("here");
        msg.guild.member(User).ban(Reason);
        msg.channel.send(`${User.id} has been banned.`);
        //warns[User.id].warns = 0;
    };

}

module.exports.help = {
  name: "warn"
}