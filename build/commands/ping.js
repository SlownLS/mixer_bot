"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (socket, msg, args) => {
    socket.call('msg', [`Pong`]);
};
