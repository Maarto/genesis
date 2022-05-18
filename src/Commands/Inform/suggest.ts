import { Command } from "../../Interfaces";
import { MessageEmbed } from "discord.js";
import cfg from '../../config.json'

export const command:Command = {
    name: 'suggest',
    aliases: [],
    run: async(client, message, args) => {
        message.delete(); // Elimina mensaje del usuario.

        let SuggestEmbedChannel = new MessageEmbed()
            .setTitle(`New Suggest!`)
            .setDescription(`*${args.join(' ')}*`)
            .setColor('BLUE')
            .setThumbnail(cfg.Image)
            .setFooter({
                text: `${cfg.botPrefix}suggest (suggestion)`,
                iconURL: cfg.Image
            })

        let SuggestEmbedDM = new MessageEmbed()
            .setDescription(`\`\`\`The Suggestion has been sent successfully\`\`\``)
            .setColor('BLUE')
            .setAuthor({
                name: 'Genesis Support',
                iconURL: cfg.Image
            })

        let channel: any = message.guild.channels.cache.get(cfg.suggestChannelID)

        channel.send({ embeds: [SuggestEmbedChannel] })
        message.member.send({ embeds: [SuggestEmbedDM] }).catch(() => {
            console.log(`No se ha podido enviar el mensaje de sugerencia con éxito al privado del usuario ${message.member}.\nTiene el Privado cerrado.`)
        })

    } 
}