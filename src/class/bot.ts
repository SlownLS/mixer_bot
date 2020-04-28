import * as path from "path"
import * as YAML from "yamljs"
import * as Mixer from "@mixer/client-node"
import { ICommand, IChannel } from "../interfaces"
import { Channel } from "./channel"

export class MixerBot {
    private config: any
    private client: Mixer.Client
    private commands: Array<ICommand> = []
    public channels: Array<IChannel> = [] as any

    public infos: any
 
    constructor()
    {
        this.client = new Mixer.Client()
        this.config = YAML.load(path.resolve("settings.yml"))
    }

    /**
     * Start the bot
     */
    public start()
    {
        this.client.use(new Mixer.OAuthProvider(this.client, {
            clientId: this.config.clientId,
            secret: this.config.secretId,
            tokens: {
                access: this.config.token,
                expires: Date.now() + (365 * 24 * 60 * 60 * 1000)
            },            
        }))

        this.getUserInfo()
    }

    /**
     * Connect the bot to channels
     */
    public connect() 
    {
        if ( !this.channels || this.channels.length < 1 ) return

        this.channels.forEach((infos: IChannel) => {
            let conn = new Mixer.ChatService(this.client).join(infos.id).then( (response) => {   
                let channel = new Channel(this, infos.id, response.body)
                channel.connect()

                infos.channel = channel
            });
        })
    }    

    /**
     * Add channel to connect
     * @param channelId 
     */
    public addChannel(channelId: number)
    {
        this.channels.push({
            id: channelId
        })
    }

    /**
     * Get bot user info
     */
    private getUserInfo()
    {
        if ( this.infos && this.infos.length > 0 ) return;

        this.client.request("GET", "users/current").then((response) => {
            this.infos = response.body
            this.connect()
        });    
    }       
    
    /**
     * Add command for the bot
     * @param name 
     * @param func 
     */
    public addCommand(name: string, func: () => any) {
        return this.commands.push({
            name: name,
            func: func
        })
    }

    /**
     * Get command function
     * @param name 
     */
    public executeCommand(name: string)
    {
        var found = this.commands.find( (e) => { 
            return e.name === name; 
        });    

        if ( !found || !found.func ) return false

        return found.func
    }
}