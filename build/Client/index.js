"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
// import { connect } from 'mongoose';
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
require('dotenv').config();
const config_json_1 = __importDefault(require("../config.json"));
let configEnv = {
    token: config_json_1.default.botToken,
    mongoURI: "NODB",
    prefix: config_json_1.default.botPrefix
};
class ExtendedClient extends discord_js_1.Client {
    constructor() {
        super(...arguments);
        this.commands = new discord_js_1.Collection();
        this.events = new discord_js_1.Collection();
        this.config = configEnv;
        this.aliases = new discord_js_1.Collection();
    }
    async init() {
        this.login(this.config.token);
        // connect(this.config.mongoURI).then(() => console.log(`Ha iniciado sesión en la base de datos con éxito`))
        /* Commands */
        const commandPath = path_1.default.join(__dirname, "..", "Commands");
        (0, fs_1.readdirSync)(commandPath).forEach((dir) => {
            let commands = (0, fs_1.readdirSync)(`${commandPath}/${dir}`).filter((file) => file.endsWith('.js'));
            for (const file of commands) {
                let { command } = require(`${commandPath}/${dir}/${file}`);
                this.commands.set(command.name, command);
                console.log(`${command.name} ha sido cargado con éxito`);
                if (command?.aliases.length !== 0) {
                    command.aliases.forEach((alias) => {
                        this.aliases.set(alias, command);
                    });
                }
            }
        });
        /* Events */
        const eventPath = path_1.default.join(__dirname, "..", "Events");
        (0, fs_1.readdirSync)(eventPath).forEach(async (file) => {
            const { event } = await Promise.resolve().then(() => __importStar(require(`${eventPath}/${file}`)));
            this.events.set(event.name, event);
            console.log(`${event.name} ha sido cargado con éxito`);
            this.on(event.name, event.run.bind(null, this));
        });
    }
}
exports.default = ExtendedClient;
