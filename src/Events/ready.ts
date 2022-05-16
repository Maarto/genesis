import {Event} from '../Interfaces';

export const event: Event = {
    name: 'ready',
    run: (client) => {
        console.log(`El bot ha iniciado sesión con éxito \n User: ${client.user.username} \n ID: ${client.user.id}`)
    }
}