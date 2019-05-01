const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
//const YTDL = require("ytdl-core");
bot.commands = new Discord.Collection();

var servers = {}; //for playing music on multiple discord servers.


fs.readdir("./cmds/", (error, cfiles) => { //if file is not found, give error
  if(error) console.log(error);
  let jsF = cfiles.filter(file => file.split(".").pop() === "js")
  if(jsF.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsF.forEach((file, i) =>{ //for each file, i = number of files
    let cmds = require(`./cmds/${file}`);
    console.log(`${file} loaded!`);
    bot.commands.set(cmds.help.name, cmds);
  });
});

/* function play(connection, message) {
  var server = servers[message.guild.id];

  server.dispatcher = connection.playStream(YTDL())
} */

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


  //for enable/disable commands, check here if command is in the file. If it is, it's disabled so don't run commandfile. If it's not in the file, run it.
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

  /* if(cmd === `${prefix}play`){
    if (!args[1]) {
      msg.channel.send("Please provide a Youtube link!");
      return;
    }
    if (!MessageChannel.member.voiceChannel) {
      msg.channel.send("You need to be in a voice chat to play music.");
      return;
    }


    var server = servers[msg.guild.id];

    if (!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(function(connection) {
      play(connection, msg);
    });
  } */

});

bot.on("guildMemberAdd", async member => {
  console.log(member.user.username);
  member.guild.channels.get('146358006982901760').send('*' + member.user.username + '* has joined the server!')
})

bot.on("guildMemberRemove", async member => {
  console.log(member.user.username);
  member.guild.channels.get('146358006982901760').send('*' + member.user.username + '* has left the server!')
})


bot.login(botconfig.token);
