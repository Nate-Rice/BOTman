const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {

  let fortunes = [
      "You are the controller of your destiny.", 
      "Your road to glory will be rocky but fulfilling.",
      "Courage is not the absence of fear; it is the conquest of it.",
      "You will be successful in your work."
    ];


  let result = Math.floor((Math.random() * fortunes.length));

  msg.channel.send(fortunes[result]);

}

module.exports.help = {
  name: "fortune"
}
