const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
    if(!args[0]) return msg.reply("You must choose a number of dice.");
    let numDice = args[0];
    let max = 6*numDice;
    let min = max/6;
    
    //Example: Math.random() = 0.5, (0.5x6 = 3) + 1 = 4;
    msg.channel.send(`You rolled ${Math.floor(Math.random() * (max)) + min}.`);

}

module.exports.help = {
  name: "roll"
}