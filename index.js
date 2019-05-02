const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
let id = JSON.parse(fs.readFileSync("./disabled.json"));
bot.commands = new Discord.Collection(); //Discord utility class for storing data, like Map()


fs.readdir("./cmds/", (error, cfiles) => { //if file is not found, give error
  if(error) console.log(error);
  let jsF = cfiles.filter(file => file.split(".").pop() === "js") //Adding only JS files to array
  if(jsF.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsF.forEach(file  => { 
    let cmds = require(`./cmds/${file}`);
    console.log(`${file} loaded!`);
    bot.commands.set(cmds.help.name, cmds); //Adding commands to Discord Collection
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


  if (typeof id[cmd.slice(prefix.length)] === 'undefined') {
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, msg, args); //Run the `exports.run()` function defined in each command.
  } else if (cmd.slice(prefix.length) == id[cmd.slice(prefix.length)].id) {
    msg.channel.send("This command has been disabled!");
  }

  //let commandfile = bot.commands.get(cmd.slice(prefix.length));
  //if(commandfile) commandfile.run(bot, msg, args); //Run the `exports.run()` function defined in each command.

});

bot.on("guildMemberAdd", async member => {
  member.guild.channels.get('573482245222957073').send('*' + member.user.username + '* has joined the server!')
})

bot.on("guildMemberRemove", async member => {
  member.guild.channels.get('573482245222957073').send('*' + member.user.username + '* has left the server!')
})


bot.login(botconfig.token);
