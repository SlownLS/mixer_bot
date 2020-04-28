"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mixer = require("@mixer/client-node");
let ws = require("ws");
class Channel {
    constructor(bot, channelId, infos) {
        this.infos = [];
        this.bot = bot;
        this.channelId = channelId;
        this.infos = infos;
    }
    /**
     * Connect the bot to the channel
     */
    connect() {
        let infos = this.infos;
        let channelId = this.channelId;
        let bot = this.bot;
        let socket = new Mixer.Socket(ws, infos.endpoints).boot();
        socket.auth(channelId, bot.infos.id, infos.authkey).then((e) => __awaiter(this, void 0, void 0, function* () {
            if (e.authenticated === false) {
                console.error("Cannot connect to channel #" + channelId);
                return;
            }
            ;
            socket.on("connected", () => {
                console.log("Connected on channel #" + channelId);
            });
            socket.on('UserJoin', data => {
            });
            socket.on('ChatMessage', (data) => {
                let prefix = bot.config.prefix;
                let message = data.message;
                if (!message)
                    return;
                if (!message.message)
                    return;
                if (!message.message[0])
                    return;
                if (!message.message[0].text)
                    return;
                let fullContent = message.message[0].text;
                if (!fullContent.startsWith(prefix))
                    return;
                let content = fullContent.substr(prefix.length, fullContent.length);
                let args = content.split(" ");
                let func = bot.executeCommand(args[0]);
                if (func == false)
                    return;
                func.default(socket, message, args);
            });
        }));
        this._socket = socket;
    }
    /**
     * Get current socket of channel
    */
    get socket() {
        return this._socket;
    }
}
exports.Channel = Channel;
