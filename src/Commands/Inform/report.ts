import { Command } from "../../Interfaces";
import { MessageEmbed } from "discord.js";
import cfg from '../../config.json'

export const command: Command = {
    name: 'report',
    aliases: [],
    description: "Comando para reportar a cualquier cosa anónimamente.",
    run: async (client, message, args) => {
        message.delete(); // Borra mensaje


        let ReportEmbedChannel = new MessageEmbed()
            .setTitle(`New anonymous report!`)
            .setDescription(`*${args.join(' ')}*`)
            .setColor('BLUE')
            .setThumbnail(cfg.Image)
            .setFooter({
                text: `${cfg.botPrefix}report (Info/ImageURL)`,
                iconURL: cfg.Image
            })

        let ReportEmbedDM = new MessageEmbed()
            .setDescription(`\`\`\`The report has been sent successfully to administration!\`\`\``)
            .setColor('BLUE')
            .setAuthor({
                name: 'Genesis Support',
                iconURL: cfg.Image
            })

        let channel: any = message.guild.channels.cache.get(cfg.reportChannelID)

        channel.send({ embeds: [ReportEmbedChannel] })
        message.member.send({ embeds: [ReportEmbedDM] }).catch(() => {
            console.log(`No se ha podido enviar el mensaje del reporte con éxito al privado del usuario ${message.member}.\nTiene el Privado cerrado.`)
        })
    }
}