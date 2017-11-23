
class ChatServices {
    constructor(socketio) {
        this.socketIO = socketio;
    }

    getMessages(callback) {
         return this.socketIO.on('spotim/chat', callback);
    }

    sendMessage(message) {
        console.log('sending message');
        this.socketIO.emit('spotim/chat', message);
    }
}

export default ChatServices;