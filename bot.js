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
    if(messages.content.substring(0,1) === '!'){
      let args = messages.content.substring(1).split(' ');
      let cmd = args[0];
      let embedMessage;

      args = args.splice(1);

      // commands: 
      // hello, set, showing, clear, t {number}
      switch(cmd) {
        case 'hello':
          embedMessage = new MessageEmbed()
            .setColor('#65e054')
            .setTitle('WELL WELL WELL...')
            .setDescription('Good to see you ' + messages.author.username);
          messages.channel.send({ embeds: [embedMessage]});
          break;

        case 'set':
          if(args.length === 0){
            embedMessage = new MessageEmbed()
            .setColor('#65e054')
            .setTitle('well?')
            .setDescription('Are you gonna add a movie or...');
            messages.channel.send({ embeds: [embedMessage]});
          } else {
            movie = args.join(' ');
            embedMessage = new MessageEmbed()
              .setColor('#65e054')
              .setTitle('OH BOY')
              .setDescription('Natstheater will be showing **' + movie + '**');
            messages.channel.send({ content: '<@&1011792376781606982>', embeds: [embedMessage]});
          }
          break;

        case 'showing':
          if(movie === ''){
            embedMessage = new MessageEmbed()
              .setColor('#65e054')
              .setTitle('HOT DAMN')
              .setDescription('There is no movie showing in the Natstheater right now :(');
            messages.channel.send({ embeds: [embedMessage]});
          } else {
            embedMessage = new MessageEmbed()
              .setColor('#65e054')
              .setTitle('Now Showing')
              .setDescription('Natstheater is now showing **' + movie + '**');
            messages.channel.send({ embeds: [embedMessage]});
          }
          break;
        
        case 'clear':
          if(movie === ''){
            embedMessage = new MessageEmbed()
              .setColor('#65e054')
              .setTitle('HOT DAMN')
              .setDescription('There is no movie showing in the Natstheater right now :(');
            messages.channel.send({ embeds: [embedMessage]});          
          } else {
            embedMessage = new MessageEmbed()
              .setColor('#65e054')
              .setTitle('Of course, as always you can check out some more movies... right now!')
              .setDescription('**' + movie + '** has finished showing in the Natstheater');
            messages.channel.send({ embeds: [embedMessage]});
            movie = '';
            }
          break;

        case 't':
          if(movie === ''){
            embedMessage = new MessageEmbed()
              .setColor('#65e054')
              .setTitle('HOT DAMN')
              .setDescription('There is no movie showing in the Natstheater right now :(');
            messages.channel.send({ embeds: [embedMessage]});          
          } else {
            let time = args[0];
            if(time == 0 || time == undefined){
              embedMessage = new MessageEmbed()
              .setColor('#65e054')
              .setTitle('GET IN HERE.')
              .setDescription('**' + movie + '** will begin now!');
              messages.channel.send({ content: '<@&1011792376781606982>', embeds: [embedMessage]});
          
            } else {
              embedMessage = new MessageEmbed()
              .setColor('#65e054')
              .setTitle('Movie starting soon!')
              .setDescription('**' + movie + '** will begin in ' + time + ' minutes!');
              messages.channel.send({ content: '<@&1011792376781606982>', embeds: [embedMessage]});
            }
          }
          break;
      } 
    }
  }
);