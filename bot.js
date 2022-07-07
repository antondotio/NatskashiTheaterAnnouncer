// https://discord.com/api/oauth2/authorize?client_id=994364231975698653&permissions=139586956352&scope=bot

require("dotenv").config();
const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({
  intents:[
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
})
let movie = '';

client.once("ready", () => {
  console.log("BOT IS ONLINE");
})

client.login(process.env.TOKEN);

client.on('messageCreate',
  function(messages) {
    // if(messages.content.toLocaleLowerCase() === 'hello'){
    //   messages.channel.send('WELL WELL WELL... look who it is... its ' + messages.author.username);
    // }
    if(messages.content.substring(0,1) === '!'){
      let args = messages.content.substring(1).split(' ');
      let cmd = args[0];
      let embedMessage;

      args = args.splice(1);

      switch(cmd) {
        case 'hello':
          embedMessage = new MessageEmbed()
            .setColor('#36c0eb')
            .setTitle('WELL WELL WELL...')
            .setDescription('Good to see you ' + messages.author.username);
          messages.channel.send({ embeds: [embedMessage]});
          break;
        case 'setmovie':
          movie = args.join(' ');
          embedMessage = new MessageEmbed()
            .setColor('#36c0eb')
            .setTitle('OH BOY')
            .setDescription('Natkashi Theater will be playing **' + movie + '**');
          messages.channel.send({ embeds: [embedMessage]});
          break;
        case 'watching':
          if(movie === ''){
            embedMessage = new MessageEmbed()
              .setColor('#36c0eb')
              .setTitle('HOT DAMN')
              .setDescription('There is no movie playing in the Natskashi Theater right now :(');
            messages.channel.send({ embeds: [embedMessage]});
          }else {
            embedMessage = new MessageEmbed()
            .setColor('#36c0eb')
            .setTitle('Now Playing')
            .setDescription('Natskashi Theater is now playing **' + movie + '**');
            messages.channel.send({ embeds: [embedMessage]});
          }
          break;
        case 'clear':
          if(movie === ''){
            embedMessage = new MessageEmbed()
              .setColor('#36c0eb')
              .setTitle('HOT DAMN')
              .setDescription('There is no movie playing in the Natskashi Theater right now :(');
            messages.channel.send({ embeds: [embedMessage]});          
          } else {
            embedMessage = new MessageEmbed()
              .setColor('#36c0eb')
              .setTitle('Of course, as always you can check out some more movies... right now!')
              .setDescription('**' + movie + '** has finished playing in the Natskashi Theatre');
            messages.channel.send({ embeds: [embedMessage]});
            movie = '';
            }
          break;

          // TODO: maybe add reminders for 10/5min before and when it starts but
          // idk if they want to @ everyone though
       }
    }
})