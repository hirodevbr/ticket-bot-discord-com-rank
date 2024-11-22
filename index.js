const Discord = require("discord.js")
const config = require("./config.json")
const logs = require('discord-logs');

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
    '32767'
  ]
});

logs(client);

module.exports = client

client.on('interactionCreate', (interaction) => {

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Error`);

    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

    cmd.run(client, interaction)

  }
})

// Função para adicionar cor ao console.log
function logWithColor(message, colorCode) {
  console.log(`\x1b[${colorCode}m${message}\x1b[0m`);
}


client.on('ready', () => {
  console.log(`[ ❌ Error ] Nenhum erro encontrado`,)
  console.log(`[ 💻 System ] Bot Online`,)
  console.log(`[ 🤖 Commands ] (/) Comandos Carregados com Sucesso`,)
  console.log(`[ 💁 Client ] ${client.user.username}`,)
  console.log(`[ ✔️ Success ]`)
})


// 37 = Branco
// 36 = Ciano
// 34 = Azul
// 33 = Amarelo
// 32 = Verde
// 31 = Vermelho

client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)

client.on("interactionCreate", require('./events/config-ticket').execute);
client.on("interactionCreate", require('./events/ticket').execute);
client.on("interactionCreate", require('./events/gerenciar').execute);


process.on('unhandRejection', (reason, promise) => {
  console.log(`🚨 | [Erro]\n\n` + reason, promise);
});
process.on('uncaughtException', (error, origin) => {
  console.log(`🚨 | [Erro]\n\n` + error, origin);
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`🚨 | [Erro]\n\n` + error, origin);
});