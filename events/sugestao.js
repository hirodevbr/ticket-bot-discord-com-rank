const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB({ table: "sugestao" });
const client = require(`./index.js`);
const { PermissionsBitField } = require('discord.js');


module.exports = {
  name: "sugestao.js"
};


client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  const database = await db.get(interaction.message.id);
  if (!database) return;

  const member = interaction.guild.members.cache.get(interaction.user.id);
  if (!member) return;



  if (interaction.customId === 'sim') {
    if (!database.total.includes(interaction.user.id)) {

      await db.add(`${interaction.message.id}.positivo`, 1);
      await db.push(`${interaction.message.id}.total`, interaction.user.id);

      database.positivo += 1;

      const membro = await interaction.guild.members.cache.get(database.usuario);
      if (!membro) return;


      const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `${interaction.guild} | Sugestão`, iconURL: interaction.guild.iconURL() })
        .setDescription(`> Nova sugestão fornecida!\n
**Observações:**
  > È apenas um voto por membro:`)
        .addFields({
          name: `Usuário:`,
          value: `${membro.user.username} \`(${membro.user.id})\``,
          inline: false
        },
          {
            name: `Sugestão:`,
            value: `\`\`\`${database.sugestao}\`\`\``,
            inline: false
          })
        .setFooter({ text: `${interaction.user.username}`, iconURL: `${client.user.displayAvatarURL({ display: true, size: 4096 })}` })
        .setTimestamp()

      const botaoPositivo = new Discord.ButtonBuilder()
        .setLabel(`${database.positivo}`)
        .setCustomId("sim")
        .setEmoji("1138219908610662540")
        .setStyle(2)
        .setDisabled(false);

      const botaoNegativo = new Discord.ButtonBuilder()
        .setLabel(`${database.negativo}`)
        .setCustomId("nao")
        .setEmoji("1138219921998876682")
        .setStyle(2)
        .setDisabled(false);

      const botaoFinalizar = new Discord.ButtonBuilder()
        .setLabel(`Finalizar`)
        .setCustomId("sfinalizar")
        .setStyle(1)
        .setDisabled(false);

      const row1 = new Discord.ActionRowBuilder()
        .addComponents(botaoPositivo, botaoNegativo, botaoFinalizar);

      await interaction.message.edit({ embeds: [embed], components: [row1] })
      let callzin = new Discord.EmbedBuilder()
        .setDescription(`Seu voto **positivo** foi registrado com sucesso`)
        .setTimestamp()
      interaction.reply({
        embeds: [callzin],
        ephemeral: true,
      });

    } else {
      let callzin = new Discord.EmbedBuilder()
        .setDescription(`Você já votou e só pode votar uma vez!`)
        .setTimestamp()
      interaction.reply({
        embeds: [callzin],
        ephemeral: true,
      });

    }
  } else if (interaction.customId === 'nao') {
    if (!database.total.includes(interaction.user.id)) {
      //await interaction.deferUpdate()
      await db.add(`${interaction.message.id}.negativo`, 1);
      await db.push(`${interaction.message.id}.total`, interaction.user.id);

      database.negativo += 1;

      const membro = await interaction.guild.members.cache.get(database.usuario);
      if (!membro) return;

      const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `${interaction.guild} | Sugestão`, iconURL: interaction.guild.iconURL() })
        .setDescription(`> Nova sugestão fornecida!\n
**Observações:**
  > È apenas um voto por membro:`)
        .addFields({
          name: `Usuário:`,
          value: `${membro.user.username} \`(${membro.user.id})\``,
          inline: false
        },
          {
            name: `Sugestão:`,
            value: `\`\`\`${database.sugestao}\`\`\``,
            inline: false
          })

      const botaoPositivo = new Discord.ButtonBuilder()
        .setLabel(`${database.positivo}`)
        .setCustomId("sim")
        .setEmoji("1138219908610662540")
        .setStyle(2)
        .setDisabled(false);

      const botaoNegativo = new Discord.ButtonBuilder()
        .setLabel(`${database.negativo}`)
        .setCustomId("nao")
        .setEmoji("1138219921998876682")
        .setStyle(2)
        .setDisabled(false);
      const botaoFinalizar = new Discord.ButtonBuilder()
        .setLabel(`Finalizar`)
        .setCustomId("sfinalizar")
        .setStyle(1)
        .setDisabled(false);

      const row1 = new Discord.ActionRowBuilder()
        .addComponents(botaoPositivo, botaoNegativo, botaoFinalizar);

      await interaction.message.edit({ embeds: [embed], components: [row1] })

      let callzin = new Discord.EmbedBuilder()
        .setDescription(`Seu voto **negativo** foi registrado com sucesso`)
        .setTimestamp()
      interaction.reply({
        embeds: [callzin],
        ephemeral: true,
      });


    } else {
      let callzin = new Discord.EmbedBuilder()
        .setDescription(`Você já votou e só pode votar uma vez!`)
        .setTimestamp()
      interaction.reply({
        embeds: [callzin],
        ephemeral: true,
      });

    }
  } else if (interaction.customId === 'sfinalizar') {

    const cargostaff = await db.get(`cargo_staff_${interaction.guild.id}`)

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && !interaction.member.roles.cache.has(cargostaff)) { // cargo staff
      let callzin = new Discord.EmbedBuilder()
        .setDescription(`Você não é um staff`)
        .setTimestamp()
      return interaction.reply({
        embeds: [callzin],
        ephemeral: true,
      });
    } else {

      const membro = await interaction.guild.members.cache.get(database.usuario);
      if (!membro) return;

      const embed = new Discord.EmbedBuilder()

        .setAuthor({ name: `${interaction.guild} | Sugestão`, iconURL: interaction.guild.iconURL() })
        .setDescription(`> Nova sugestão fornecida!\n
**Observações:**
  > È apenas um voto por membro:`)
        .addFields({
          name: `Usuário:`,
          value: `${membro.user.username} \`(${membro.user.id})\``,
          inline: false
        },
          {
            name: `Sugestão:`,
            value: `\`\`\`${database.sugestao}\`\`\``,
            inline: false
          })

      const botaoPositivo = new Discord.ButtonBuilder()
        .setLabel(`${database.positivo}`)
        .setCustomId("sim")
        .setEmoji("1138219908610662540")
        .setStyle(2)
        .setDisabled(true);

      const botaoNegativo = new Discord.ButtonBuilder()
        .setLabel(`${database.negativo}`)
        .setCustomId("nao")
        .setEmoji("1138219921998876682")
        .setStyle(2)
        .setDisabled(true);
      const botaoFinalizar = new Discord.ButtonBuilder()
        .setLabel(`Finalizar`)
        .setCustomId("sfinalizar")
        .setStyle(1)
        .setDisabled(true);


      const botaoaceitar = new Discord.ButtonBuilder()
        .setLabel(`Aceitar`)
        .setCustomId("cvoto")
        .setStyle(3)
        .setDisabled(false);


      const botaorecusar = new Discord.ButtonBuilder()
        .setLabel(`Recusar`)
        .setCustomId("nvoto")
        .setStyle(4)
        .setDisabled(false);

      const row1 = new Discord.ActionRowBuilder()
        .addComponents(botaoPositivo, botaoNegativo, botaoFinalizar);

      const row2 = new Discord.ActionRowBuilder()
        .addComponents(botaoaceitar, botaorecusar);

      let callzin = new Discord.EmbedBuilder()
        .setDescription(`Essa **sugestão** foi encerrada, determine o resultado dela!`)
        .setTimestamp()
      interaction.reply({
        embeds: [callzin],
        ephemeral: true,
      });


      await interaction.message.edit({ embeds: [embed], components: [row1, row2] })
    }

  } else if (interaction.customId === 'cvoto') {

    const cargostaff = await db.get(`cargo_staff_${interaction.guild.id}`)

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && !interaction.member.roles.cache.has(cargostaff)) { // cargo staff
      let callzin = new Discord.EmbedBuilder()
        .setDescription(`Você não é um staff`)
        .setTimestamp()
      return interaction.reply({
        embeds: [callzin],
        ephemeral: true,
      });
    } else {

      const membro = await interaction.guild.members.cache.get(database.usuario);
      if (!membro) return;

      const sugestaoaprovada = await db.get(`canal_logs_${interaction.guild.id}`)


      const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `${interaction.guild} | Sugestão Aprovada`, iconURL: interaction.guild.iconURL() })
        .setDescription(`> Está sugestão foi aprovada, e foi enviada para canais aprovados`)
        .setFooter({ text: `Deletando em 10 segundos...` })


      const logs = new Discord.EmbedBuilder()
        .setAuthor({ name: `${interaction.guild} | Sugestão Aprovada`, iconURL: interaction.guild.iconURL() })
        .setDescription(`> Está sugestão foi aprovada, e será implementada em breve\n**Segue algumas informações abaixo:**`)
        .addFields({
          name: `Dados:`,
          value: `Usuário: ${membro.user.username} \`(${membro.user.id})\`\n Sugestão: \`${database.sugestao}\``,
          inline: false
        },
          {
            name: `Informações dos Votos:`,
            value: `Votos Positivos: \`${database.positivo}\`\nVotos Negativos: \`${database.negativo}\``,
            inline: false
          })
      const afirmativo = new Discord.ButtonBuilder()
        .setCustomId("semnd")
        .setEmoji("1138219908610662540")
        .setStyle(2)
        .setDisabled(true);


      const row1 = new Discord.ActionRowBuilder()
        .addComponents(afirmativo);

      await client.channels.cache.get(sugestaoaprovada).send({ embeds: [logs], components: [row1] })

      const userdm = new Discord.EmbedBuilder()
        .setAuthor({ name: `${interaction.guild} | Sugestão Aprovada`, iconURL: interaction.guild.iconURL() })
        .setDescription(`> Olá ${membro.user}, Sua sugestão foi aprovada, e será implementada em breve\n**Segue algumas informações abaixo:**`)
        .addFields({
          name: `Dados:`,
          value: `Sugestão: \`${database.sugestao}\``,
          inline: false
        },
          {
            name: `Informações dos Votos:`,
            value: `Votos Positivos: \`${database.positivo}\`\nVotos Negativos: \`${database.negativo}\``,
            inline: false
          })


      await membro.user.send({ embeds: [userdm], components: [row1] })

      let callzin = new Discord.EmbedBuilder()
        .setDescription(`Sugestão aceita, foi enviado um aviso de agradecimento ao membro e enviado ao canal de <#${sugestaoaprovada}>`)
        .setTimestamp()
      interaction.reply({
        embeds: [callzin],
        ephemeral: true,
      });


      await interaction.message.edit({ embeds: [embed], components: [] }).then((msg) => {

        setTimeout(() => msg.delete(), 10000);
      })


    }

  } else if (interaction.customId === 'nvoto') {

    const cargostaff = await db.get(`cargo_staff_${interaction.guild.id}`)

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && !interaction.member.roles.cache.has(cargostaff)) { // cargo staff
      let callzin = new Discord.EmbedBuilder()
        .setDescription(`Você não é um staff`)
        .setTimestamp()
      return interaction.reply({
        embeds: [callzin],
        ephemeral: true,
      });
    } else {

      const membro = await interaction.guild.members.cache.get(database.usuario);
      if (!membro) return;


      const sugestaorecusada = await db.get(`canal_logs_${interaction.guild.id}`)

      const embed = new Discord.EmbedBuilder()

        .setAuthor({ name: `${interaction.guild} | Sugestão Recusada`, iconURL: interaction.guild.iconURL() })
        .setDescription(`> Está sugestão foi recusada pela votação`)
        .setFooter({ text: `Deletando em 10 segundos...` })


      const logs = new Discord.EmbedBuilder()

        .setAuthor({ name: `${interaction.guild} | Sugestão Recusada`, iconURL: interaction.guild.iconURL() })
        .setDescription(`> Está sugestão foi recusada, devido ao maior volume de votos negativos, decidimos recusar!`)
        .addFields({
          name: `Dados:`,
          value: `Usuário: ${membro.user.username} \`(${membro.user.id})\`\n Sugestão: \`${database.sugestao}\``,
          inline: false
        },
          {
            name: `Informações dos Votos:`,
            value: `Votos Positivos: \`${database.positivo}\`\nVotos Negativos: \`${database.negativo}\``,
            inline: false
          })
      const negativo = new Discord.ButtonBuilder()
        .setCustomId("semnd")
        .setEmoji("1138219921998876682")
        .setStyle(2)
        .setDisabled(true);


      const row1 = new Discord.ActionRowBuilder()
        .addComponents(negativo);

      await client.channels.cache.get(sugestaorecusada).send({ embeds: [logs], components: [row1] })

      let callzin = new Discord.EmbedBuilder()
        .setDescription(`Sugestão recusada e enviado ao canal de <#${sugestaorecusada}>`)
        .setTimestamp()
      interaction.reply({
        embeds: [callzin],
        ephemeral: true,
      });


      await interaction.message.edit({ embeds: [embed], components: [] }).then((msg) => {

        setTimeout(() => msg.delete(), 10000);
      })

    }
  }
})

/// Créditos: Lucass#8096