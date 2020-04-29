import * as Mixer from "@mixer/client-node"
import { MixerBot } from "./class/bot"

const bot: MixerBot = new MixerBot()

bot.addChannel(167299454)

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

bot.start()