const Discord = require("discord.js");
const weather = require('weather-js');

module.exports.run = async (bot, msg, args) => {
  weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) {
    if (err) msg.channel.send(err);
    var current = result[0].current;
    var location = result[0].location;
    var forecast = result[0].forecast; 

    const embed = new Discord.RichEmbed()
      .setDescription(`**${current.skytext}**`)
      .setAuthor(`Weather for ${current.observationpoint}`)
      .setThumbnail(current.imageUrl)
      .setColor("#133fd3")
      .addField('Day',`${current.day}`, true)
      .addField('Timezone', `UTC${location.timezone}`, true)
      .addField('Degree Type', location.degreetype, true)
      .addField('Temperature',`${current.temperature} Degrees`, true)
      .addField('Feels like',`${current.feelslike} Degrees`, true)
      .addField('Winds',current.winddisplay, true)
      .addField('Humidity',`${current.humidity}%`, true)

    msg.channel.send(embed);

  });


}

module.exports.help = {
  name: "weather"
}
