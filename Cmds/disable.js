const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let id = JSON.parse(fs.readFileSync("./disabled.json"));



module.exports.run = async (bot, msg, args) => {
    
    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("You do not have the authority to do that!");
    let disabled = args[0];

    if (id[disabled]) {
        msg.channel.send(`!${disabled} command has already been disabled.`)
    };

    if (disabled == "disable") {
        msg.channel.send("You cannot disable the disable command...");
    } else {
        if (!id[disabled]) id[disabled] = {
            id: disabled
        };
    }

    fs.writeFile("./disabled.json", JSON.stringify(id), (err) => {
        if (err) console.log(err);
        msg.channel.send(`!${disabled} has been disabled.`);
    });    

}

module.exports.help = {
  name: "disable"
}