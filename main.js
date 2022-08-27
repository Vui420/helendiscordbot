const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 });
require('dotenv').config();
const prefix = 'h!';
const CurrencySystem = require(`currency-system`);
const mongoose = require('mongoose');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
const { channel } = require('diagnostics_channel');
const path = require('path');
const {Client, Attachment, MessageEmbed} = require('discord.js');
global.AbortController = require("node-abort-controller").AbortController;
client.cs = new CurrencySystem;

client.commands = new Discord.Collection();



client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if(command == 'kick'){
        client.commands.get('kick').execute(message, args);
    }else if(command == 'purge'){
        client.commands.get('purge').execute(message, args);
    }else if(command == 'ban'){
        client.commands.get('ban').execute(message, args);
    }else if(command == 'help'){
        client.commands.get('help').execute(message, args);
    }else if(command == 'ticket'){
        client.commands.get('ticket').execute(message, args);
    }else if(command == 'stop'){
        client.commands.get('stop').execute(Discord, message, args);
    }else if(command == 'play'){
        client.commands.get('play').execute(Discord, message, args);
    }else if(message.content === 'h!ping'){
        return message.channel.send('My Ping is: ' + client.ws.ping + 'ms');
    }
});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

mongoose.connect(process.env.MONGODB_SRV, {

}).then(()=>{
    console.log("Mongo.db has connected successfully");
}).catch((err) =>{
    console.log(err);
})

client.on('message', message =>{
    if(message.content === 'alex'){
        message.react('<:alexspfp:1012630423882453002> ')
    }
});

client.on('message', message =>{
    if(message.content === 'no'){
        message.channel.send('<:hyperlaugh:1012874980364652544>');
    }
});

client.once('ready', () => {
    console.log('soulja did it first');
    client.user.setActivity('dsc.gg/helen | h!help');
});


client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'welcomed');


    const welcoming = new Discord.MessageEmbed()
    .setTitle("Welcome to Helen")
    .setThumbnail('https://i.imgur.com/yxG3fql.png')
    .setFooter("Bot written by TN_vui")
    

    guildMember.send(welcoming);

    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('960443683432452106').send(`Welcome <@${guildMember.user.id}> to Helen, make sure to read the <#960458024072400916> channel and verify!`);
});

client.login(process.env.DISCORD_TOKEN);