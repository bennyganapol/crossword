import socketio from "socket.io-client";

export const socket = socketio(`${window.location.hostname}:4000`);
const events = [];

class SocketManager {
  constructor() {
    this.name = Math.random().toString(36).substring(10);
    socket.emit('newconnection', 'test123');
    socket.on('newconnection', function (msg) {
    });
  }

  challengeTyping(squareId, letter) {
    socket.emit('challengeTyping', squareId, letter);
  }

  challengeSolved(challengeId) {
    socket.emit('challengeSolved', challengeId);
  }

  registerEvent(eventName, func) {
    events[eventName] = func;
  }
}

export let socketManager = new SocketManager();




