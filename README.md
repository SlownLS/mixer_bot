# mixer_bot
A base for create mixer bot

## Installation
To use the bot, run ``npm install`` in command line (You need to be in the folder)

## Example of code
``` Javascript
import { MixerBot } from "./class/bot"

const bot: MixerBot = new MixerBot()

bot.addChannel(92820999) // to get the channel id : https://mixer.com/api/v1/channels/slownls?fields=id

bot.addCommand("ping", require("./commands/ping"))

bot.start()
```

## Example of command (TypeScript)
``` Javascript
import * as Mixer from "@mixer/client-node"

export default (socket: Mixer.Socket, msg: Mixer.IChatMessage, args: []) => {
    socket.call('msg', [`Pong`])
}
```


## Example of command (JavaScript - ES6)
``` Javascript
exports.default = (socket, msg, args) => {
    socket.call('msg', [`Pong`]);
}
```

## Config
[Get your Client ID](https://mixer.com/lab/keypopup)

[Get your Secret ID](https://mixer.com/lab/oauth)

[Get your your Token](https://dev.mixer.com/guides/chat/chatbot.html)
