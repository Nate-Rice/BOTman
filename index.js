const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();


fs.readdir("./commands/", (err, files) => { //if file is not found, give error
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{ //for each file, i = number of files
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is now online`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, message, args);


  if(cmd === `${prefix}serverinfo`){
    //let sicon = message.guild.displayAvatarURL;
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#db1125")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Server was created on", message.guild.createdAt)
    .addField("Total members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }

  if (cmd === `${prefix}user`){
    let sicon = message.member.user.displayAvatarURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("User Information")
    .setColor("#db1125")
    .setThumbnail(sicon)
    .addField("Your Username", message.member.user.username)
    .addField("Your Nickname", message.member.displayName)
    .addField("Your Role", message.member.highestRole)
    .addField("You joined on", message.member.joinedAt);

    return message.channel.send(serverembed);
  }

});

bot.login(botconfig.token);
