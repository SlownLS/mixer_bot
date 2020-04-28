import { MixerBot } from "./class/bot"

const bot: MixerBot = new MixerBot()

bot.addChannel(92820999)
bot.addChannel(167299454)

// bot.addCommand("ping", require("./commands/ping"))

bot.start()