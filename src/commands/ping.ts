import * as Mixer from "@mixer/client-node"

export default (socket: Mixer.Socket, msg: Mixer.IChatMessage, args: []) => {
    socket.call('msg', [`Pong`])
}