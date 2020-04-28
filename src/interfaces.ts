import { Channel } from "./class/channel"

export interface IChannel {
    id: number,
    channel?: Channel
}

export interface ICommand {
    name: string,
    func: any
}