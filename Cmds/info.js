const Discord = require("discord.js");
const request = require("request");
const cheerio = require("cheerio");

module.exports.run = async (bot, msg, args) => {

    //if(!args[1]) return msg.reply("Please enter a first and last name.");

    //msg.channel.send(`https://gameofthrones.fandom.com/wiki/${args[0]}_${args[1]}`)
    if(args[1]) { site = `https://gameofthrones.fandom.com/wiki/${args[0]}_${args[1]}` }
    else if (args[0]) { site = `https://gameofthrones.fandom.com/wiki/${args[0]}` }
    else {
        return msg.reply("If the character has a last name, you must include it. Else, only first name");
    }


    //check if there are 1 or 2 args. If 1, check URL for only first name. If 2, do below?
    request(`${site}`, (error, response, html) => {
        if (!(response.statusCode == 200)) {
            return msg.reply("Please enter a correct character name.");
        }

        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            const seasons = $('#mw-content-text > aside > div:nth-child(3) > div');
            const seen = $('#mw-content-text > aside > div:nth-child(4) > div');
            const status = $('#mw-content-text > aside > div:nth-child(8) > div > a'); 
            const culture = $('#mw-content-text > aside > div:nth-child(8) > div > a');           
            
            //const image = $('.pi-image-thumbnail');
            //const images = document.getElementsByTagName('img'); 
            //const image = $('.pi-image-thumbnail');
            
            let sicon = $('.pi-image-thumbnail').attr("src");
            let charEmbed = new Discord.RichEmbed()
            .setDescription("Character Information")
            .setColor("#db1125")
            .setThumbnail(sicon)
            .addField("Season(s)", `${seasons.text()}`)
            .addField("First seen", `${seen.text()}`)
            .addField("Status", `${status.text()}`);
            

            msg.channel.send(charEmbed);
        }
    });
    
    
}

module.exports.help = {
  name: "info"
}

