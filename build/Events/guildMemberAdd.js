"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const discord_js_1 = require("discord.js");
exports.event = {
    name: 'guildMemberAdd',
    run: async (client, user) => {
        let welcomeMessage = new discord_js_1.MessageEmbed();
        user.send(`
        Welcome ${user} to Genesis!\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n
        \n\nhttps://media.discordapp.net/attachments/975647617310683156/975648112657977354/GenesisLogotipo.png\nhttps://cdn.discordapp.com/attachments/945829647017455647/975879794627592212/isgod.gif`);
    }
};
