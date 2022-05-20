"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
exports.event = {
    name: 'ready',
    run: (client) => {
        console.log(`El bot ha iniciado sesión con éxito \n User: ${client.user.username} \n ID: ${client.user.id}`);
    }
};
