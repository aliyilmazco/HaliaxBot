
const express = require('express');
const app = express();
const port = 3000;
const dennaList = require("./lists.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

//--------------------------------------------------------//

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

// =================BURAYA BAKARLAR =================== //

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) =>{
  if(message.content === 'ping'){
    message.reply({
      content: 'pong',
    })
  }
});
client.on('message', function (message) {
  if (message.content.split('').join('') === '!roll') {
    return message.reply(`U got a ${Math.floor((Math.random() * 6) + 1)}`);
   }
});
client.on('messageCreate', (message) =>{
  if(message.content === 'Denna'){
    message.reply({
      content: 'Efendim',
    })
  }
});client.on('messageCreate', (message) =>{
  if(message.content === 'Naber'){
    message.reply({
      content: 'ii sn',
    })
  }
});
client.on('messageCreate', (message) =>{
  var degisken = Math.floor((Math.random() * dennaList.dennaList().length) );
  var list = dennaList.dennaList();
  if(message.content === '!sendnudes'){
    message.reply({
      
      content:list[degisken],
    })
  }
});
client.on('message', (message) =>{
if(message.content === 'denna nasıl birisi'){
  message.reply({
    content: dennaList.dennaDesc(),
  })
}
});
client.on('message', (message) =>{
if(message.content === 'medeniyetin dört köşesi'){
  message.reply({
    content: "https://i.redd.it/d4gu6qfvnd961.png",
  })
}
});
client.on('message', (message) =>{
if(message.content === 'four corners of civilization'){
  message.reply({
    content: "https://i.redd.it/d4gu6qfvnd961.png",
  })
}
});
client.on('message', (message) =>{
if(message.content === 'denna ardaya söv'){
  message.reply({
    content: "aq ardası",
  })
}
});
client.on('message', (message) =>{
if(message.content === 'ayıp'){
  message.reply({
    content: "ayıp yatakta olur",
  })
}
});
const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
});

/*
 void UpdatePresence()
{
    DiscordRichPresence discordPresence;
    memset(&discordPresence, 0, sizeof(discordPresence));
    discordPresence.state = "Yalnız Başına";
    discordPresence.details = "Aşkı Arıyor";
    discordPresence.startTimestamp = 1507665886;
    discordPresence.endTimestamp = 1507665886;
    discordPresence.largeImageText = "SAD";
    discordPresence.smallImageText = "Rogue - Level 100";
    discordPresence.partyId = "ae488379-351d-4a4f-ad32-2b9b01c91657";
    discordPresence.partySize = 1;
    discordPresence.partyMax = 2;
    discordPresence.joinSecret = "MTI4NzM0OjFpMmhuZToxMjMxMjM= ";
    Discord_UpdatePresence(&discordPresence);
}*/
client.login('-');
