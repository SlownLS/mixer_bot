"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./class/bot");
const bot = new bot_1.MixerBot();
bot.addChannel(92820999);
bot.addChannel(167299454);
// bot.addCommand("ping", require("./commands/ping"))
bot.start();
