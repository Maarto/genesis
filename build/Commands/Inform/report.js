"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const config_json_1 = __importDefault(require("../../config.json"));
exports.command = {
    name: 'report',
    aliases: [],
    description: "Comando para reportar a cualquier cosa anónimamente.",
    run: async (client, message, args) => {
        message.delete(); // Borra mensaje
        let ReportEmbedChannel = new discord_js_1.MessageEmbed()
            .setTitle(`New anonymous report!`)
            .setDescription(`*${args.join(' ')}*`)
            .setColor('BLUE')
            .setThumbnail(config_json_1.default.Image)
            .setFooter({
            text: `${config_json_1.default.botPrefix}report (Info/ImageURL)`,
            iconURL: config_json_1.default.Image
        });
        let ReportEmbedDM = new discord_js_1.MessageEmbed()
            .setDescription(`\`\`\`The report has been sent successfully to administration!\`\`\``)
            .setColor('BLUE')
            .setAuthor({
            name: 'Genesis Support',
            iconURL: config_json_1.default.Image
        });
        let channel = message.guild.channels.cache.get(config_json_1.default.reportChannelID);
        channel.send({ embeds: [ReportEmbedChannel] });
        message.member.send({ embeds: [ReportEmbedDM] }).catch(() => {
            console.log(`No se ha podido enviar el mensaje del reporte con éxito al privado del usuario ${message.member}.\nTiene el Privado cerrado.`);
        });
    }
};
