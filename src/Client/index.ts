import { Client, Collection, Constants } from 'discord.js';
// import { connect } from 'mongoose';
import path from 'path';
import { readdirSync } from 'fs';
import { Command, Event, Config } from '../Interfaces';
require('dotenv').config()
import cfg from '../config.json'

let configEnv = {
    token: cfg.botToken,
    mongoURI: cfg.db_url,
    prefix: cfg.botPrefix
}


class ExtendedClient extends Client {

    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public config: Config = configEnv;
    public aliases: Collection<string, Command> = new Collection();

    public async init() {
        this.login(this.config.token)
        // connect(this.config.mongoURI).then(() => console.log(`Ha iniciado sesión en la base de datos con éxito`))

        /* Commands */

        const commandPath = path.join(__dirname, "..", "Commands")
        readdirSync(commandPath).forEach((dir) => {
            let commands = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith('.js'))
            for (const file of commands) {
                let { command } = require(`${commandPath}/${dir}/${file}`)
                this.commands.set(command.name, command);
                console.log(`${command.name} ha sido cargado con éxito`)
                if (command?.aliases.length !== 0) {
                    command.aliases.forEach((alias: any) => {
                        this.aliases.set(alias, command);
                    })
                }
            }
        })


        /* Events */

        const eventPath = path.join(__dirname, "..", "Events");
        readdirSync(eventPath).forEach(async(file) => {
            const {event} = await import(`${eventPath}/${file}`)
            this.events.set(event.name, event)
            console.log(`${event.name} ha sido cargado con éxito`)
            this.on(event.name, event.run.bind(null, this))
        })
    }
}

export default ExtendedClient;