"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./class/bot");
const bot = new bot_1.MixerBot();
bot.addChannel(167299454);
/* TypeScript

bot.addCommand("ping", require("./commands/ping"))

bot.addCommand("test", (socket: Mixer.Socket, msg: Mixer.IChatMessage, args: []) => {
    socket.call('msg', [`This is a test`])
})

bot.on("ChatMessage", (socket: Mixer.Socket, msg: Mixer.IChatMessage, content: string) => {
    // TODO

    return true // return if the event continues or not
});

*/
bot.start();
