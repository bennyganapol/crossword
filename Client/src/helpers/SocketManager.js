import socketio from 'socket.io-client';

export const socket = socketio(`${window.location.hostname}:4000`);
const events = [];

class SocketManager {
  constructor() {
    socket.emit('newconnection', 'test123');

    socket.on('newconnection', function (msg) {
      //alert(msg);
    });

    // events['challengeSolved'] = () => { alert('c solved!'); };

    // socket.on('challengeSolved', (challengeId) => {
    //   //alert('Challenge solved: ' + challengeId);
    //   const event = new CustomEvent("challengeSolved", { "detail": challengeId });
    //   document.dispatchEvent(event);

    //   // if (events['challengeSolved'] != null) {
    //   //   events['challengeSolved'](challengeId);
    //   // }
    // });
  }

  challengeSolved(challengeId) {
    socket.emit('challengeSolved', challengeId);
  }

  registerEvent(eventName, func) {
    events[eventName] = func;
  }
}

export let socketManager = new SocketManager();
