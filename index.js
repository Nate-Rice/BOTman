const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();


fs.readdir("./cmds/", (error, cfiles) => { //if file is not found, give error
  if(error) console.log(error);
  let jsF = cfiles.filter(file => file.split(".").pop() === "js")
  if(jsF.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsF.forEach((file, i) =>{ //for each file, i = number of files
    let cmds = require(`./cmds/${file}`);
    //console.log(`${file} loaded!`);
    bot.commands.set(cmds.help.name, cmds);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is now online`);
  bot.user.setActivity("I'm Botman");
});

bot.on("message", async msg => {
  if(msg.author.bot) return; //check if bot is talking to itself
  if(msg.channel.type === "dm") return; //check if you can Direct Message bot

  let prefix = botconfig.prefix;
  let splitMsg = msg.content.split(" "); //Decomposing string into an array
  let cmd = splitMsg[0];
  let args = splitMsg.slice(1); 

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, msg, args);


  if(cmd === `${prefix}serverinfo`){
    //let sicon = msg.guild.displayAvatarURL;
    let sicon = msg.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#db1125")
    .setThumbnail(sicon)
    .addField("Server Name", msg.guild.name)
    .addField("Server was created on", msg.guild.createdAt)
    .addField("Total members", msg.guild.memberCount);

    return msg.channel.send(serverembed);
  }

  if (cmd === `${prefix}user`){
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
  }

});

bot.on("guildMemberAdd", async member => {
  console.log(member.user.username);
  member.guild.channels.get('446888839001145355').send('*' + member.user.username + '* has joined the server!')
})

bot.on("guildMemberRemove", async member => {
  console.log(member.user.username);
  member.guild.channels.get('446888839001145355').send('*' + member.user.username + '* has left the server!')
})


bot.login(botconfig.token);
