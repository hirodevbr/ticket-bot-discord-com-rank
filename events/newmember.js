const Discord = require ("discord.js")

module.exports = {
    name: "guildMemberAdd",

    async execute(client, member) {

        let channel = client.channels.cache.get("1173654523374485615"); // ID do canal de logs
        /*const cargo = ''; // Adicione um cargo caso queira por autorole
        member.roles.add(cargo)*/
      

        const data = new Date();

        let entrada = new Discord.EmbedBuilder()
            .setColor("#2C2F33")
            .setTitle("Novo membro entrou no servidor!")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`
               
               **O usuario ${member.user} entrou no servidor!**
               `)
            .addFields(
                { name: 'Tag', value: member.user.tag, inline: true },
                { name: 'ID', value: member.user.id, inline: true },
                { name: 'Conta criada em', value: member.user.createdAt.toLocaleString(), inline: false },
                { name: 'Data', value: `⏰ <t:${Math.floor(data.getTime() / 1000)}:F>` }
            )
    

            await channel.send({content: "<@&711651365570609223>"}).then((msg) => { msg.delete() });
            await channel.send({ embeds: [entrada] })
    }
}