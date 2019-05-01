const Discord = require("discord.js");
const request = require("request");
const cheerio = require("cheerio");

module.exports.run = async (bot, msg, args) => {

    if(!args[1]) return msg.reply("Please enter a first and last name.");

    //msg.channel.send(`https://gameofthrones.fandom.com/wiki/${args[0]}_${args[1]}`)


    //check if there are 1 or 2 args. If 1, check URL for only first name. If 2, do below?
    request(`https://gameofthrones.fandom.com/wiki/${args[0]}_${args[1]}`, (error, response, html) => {
        if (!(response.statusCode == 200)) {
            return msg.reply("Please enter a correct character name.");
        }

        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            const seasons = $('#mw-content-text > aside > div:nth-child(3) > div');
            const seen = $('#mw-content-text > aside > div:nth-child(4) > div');
            const titles = $('#mw-content-text > aside > div:nth-child(6) > div');
            
            
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
            .addField("Titles", `${titles.text()}\n, `)
            

            msg.channel.send(charEmbed);
        }
    });

    //msg.channel.send(args[1]);
  
    /* if (cmd === `${prefix}user`){
        let sicon = msg.member.user.displayAvatarURL;
        let serverembed = new Discord.RichEmbed()
        .setDescription("User Information")
        .setColor("#db1125")
        .setThumbnail(sicon)
        .addField("Your Username", msg.member.user.username)
        .addField("Your Nickname", msg.member.displayName)
        .addField("Your Role", msg.member.highestRole)
        .addField("You joined on", msg.member.joinedAt);
    
        return msg.channel.send(serverembed);
      } */
    
    
}

module.exports.help = {
  name: "info"
}


