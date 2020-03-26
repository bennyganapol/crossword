/* eslint-disable no-console */

import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { gamesRouter } from './routes/games_router';
// import bodyParser from 'body-parser';

dotenv.config();
const port = 4000;
const app = express();
const httpServer = http.Server(app);
const io = socketio(httpServer);

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use('/games', gamesRouter);


io.on('connection', (socket) => {
  console.log(`new connection: ${socket.id}`);
  socket.on('newconnection', (data) => {
    console.log(`new connection data: ${data}`);
    io.emit('newconnection', 'dfdfdf');
  });

  socket.on('challengeSolved', (challengeId) => {
    console.log(`chellenge solved: ${challengeId}`);
    socket.broadcast.emit('challengeSolved', challengeId);
  });

  socket.on('challengeTyping', (squareId, letter) => {
    console.log(`challengeTyping: ${squareId} ${letter}`);
    socket.broadcast.emit('challengeTyping', squareId, letter);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const server = httpServer.listen(port, () => {
  // console.log('server is running on port', server.address().port);
  console.log(`Running on port ${server.address().port}`);
});
