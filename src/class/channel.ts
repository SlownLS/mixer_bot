import * as Mixer from "@mixer/client-node"

let ws = require("ws")

export class Channel{
    private infos = [] as any
    private channelId: number
    private bot: any
    private _socket: Mixer.Socket

    constructor(bot: any, channelId: number, infos: any)
    {
        this.bot = bot
        this.channelId = channelId
        this.infos = infos
    }

    /**
     * Connect the bot to the channel
     */
    public connect()
    {
        let infos = this.infos
        let channelId = this.channelId
        let bot = this.bot
        let socket = new Mixer.Socket(ws, infos.endpoints).boot()

        socket.auth(channelId, bot.infos.id, infos.authkey).then( async (e) => {
            if ( e.authenticated === false ) {
                console.error("Cannot connect to channel #" + channelId)
                return
            };

            socket.on("connected", () => {
                var event = bot.call("connected")

                if ( event == false ) return;                
            })
    
            socket.on('UserJoin', data => {
                var event = bot.call("UserJoin", data)

                if ( event == false ) return;
            })
    
            socket.on('ChatMessage', (data) => {
                let prefix = bot.config.prefix
                let message = data.message

                if ( !message ) return;
                if ( !message.message ) return;
                if ( !message.message[0] ) return;
                if ( !message.message[0].text ) return;

                let fullContent = message.message[0].text

                var event = bot.call("ChatMessage", socket, message, fullContent)

                if ( event == false ) return;

                if ( !fullContent.startsWith(prefix) ) return;
    
                let content = fullContent.substr(prefix.length, fullContent.length)
                let args = content.split(" ")
                let func = bot.executeCommand(args[0])

                if ( func == false ) return;

                if ( func.default ){
                    func.default(socket, message, args)
                } else {
                    func(socket, message, args)
                }
            })      
        }).catch(e => console.error(e))

        this._socket = socket
    }

    /**  
     * Get current socket of channel
    */
    get socket()
    {
        return this._socket
    }
}