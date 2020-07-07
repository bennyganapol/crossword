/* eslint-disable class-methods-use-this */
import socketio from 'socket.io-client';
import { beBaseUrl } from './initialiser';

const getSocketOptionObject = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
    return {};
  else
    return {
      "path": "/be/socket.io"
    };
}

export const socket = socketio(beBaseUrl('socketio'), getSocketOptionObject());

const events = [];

class SocketManager {
  constructor() {
    this.name = Math.random().toString(36).substring(10);
    socket.emit('newconnection', 'test123');
    socket.on('newconnection', () => {
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

export const socketManager = new SocketManager();
