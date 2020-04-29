"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const YAML = require("yamljs");
const Mixer = require("@mixer/client-node");
const channel_1 = require("./channel");
class MixerBot {
    constructor() {
        this.commands = [];
        this.channels = [];
        this.events = [];
        this.client = new Mixer.Client();
        this.config = YAML.load(path.resolve("settings.yml"));
    }
    /**
     * Start the bot
     */
    start() {
        this.client.use(new Mixer.OAuthProvider(this.client, {
            clientId: this.config.clientId,
            secret: this.config.secretId,
            tokens: {
                access: this.config.token,
                expires: Date.now() + (365 * 24 * 60 * 60 * 1000)
            },
        }));
        this.getUserInfo();
    }
    /**
     * Connect the bot to channels
     */
    connect() {
        if (!this.channels || this.channels.length < 1)
            return;
        this.channels.forEach((infos) => {
            let conn = new Mixer.ChatService(this.client).join(infos.id).then((response) => {
                let channel = new channel_1.Channel(this, infos.id, response.body);
                channel.connect();
                infos.channel = channel;
            }).catch((e) => {
                console.log("Cannot connect to channel #" + infos.id);
            });
        });
    }
    /**
     * Add channel to connect
     * @param channelId
     */
    addChannel(channelId) {
        this.channels.push({
            id: channelId
        });
    }
    /**
     * Get bot user info
     */
    getUserInfo() {
        if (this.infos && this.infos.length > 0)
            return;
        this.client.request("GET", "users/current").then((response) => {
            this.infos = response.body;
            this.connect();
        });
    }
    /**
     * Add command for the bot
     * @param name
     * @param func
     */
    addCommand(name, func) {
        return this.commands.push({
            name: name,
            func: func
        });
    }
    /**
     * Get command function
     * @param name
     */
    executeCommand(name) {
        var found = this.commands.find((e) => {
            return e.name === name;
        });
        if (!found || !found.func)
            return false;
        return found.func;
    }
    /**
     * Add event listener
     * @param name
     * @param func
     */
    on(name, func) {
        this.events[name] = func;
    }
    /**
     * Call event listener
     * @param name
     * @param args
     */
    call(name, ...args) {
        if (!this.events[name])
            return true;
        return this.events[name](...args);
    }
}
exports.MixerBot = MixerBot;
