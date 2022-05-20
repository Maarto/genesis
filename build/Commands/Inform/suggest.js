"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const config_json_1 = __importDefault(require("../../config.json"));
exports.command = {
    name: 'suggest',
    aliases: [],
    run: async (client, message, args) => {
        message.delete(); // Elimina mensaje del usuario.
        let SuggestEmbedChannel = new discord_js_1.MessageEmbed()
            .setTitle(`New Suggest!`)
            .setDescription(`*${args.join(' ')}*`)
            .setColor('BLUE')
            .setThumbnail(config_json_1.default.Image)
            .setFooter({
            text: `${config_json_1.default.botPrefix}suggest (suggestion)`,
            iconURL: config_json_1.default.Image
        });
        let SuggestEmbedDM = new discord_js_1.MessageEmbed()
            .setDescription(`\`\`\`The Suggestion has been sent successfully\`\`\``)
            .setColor('BLUE')
            .setAuthor({
            name: 'Genesis Support',
            iconURL: config_json_1.default.Image
        });
        let channel = message.guild.channels.cache.get(config_json_1.default.suggestChannelID);
        channel.send({ embeds: [SuggestEmbedChannel] });
        message.member.send({ embeds: [SuggestEmbedDM] }).catch(() => {
            console.log(`No se ha podido enviar el mensaje de sugerencia con éxito al privado del usuario ${message.member}.\nTiene el Privado cerrado.`);
        });
    }
};
