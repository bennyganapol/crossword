/* eslint-disable no-console */
//const express = require('express');
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { gamesRouter } from './routes/games_router';

// dotenv.config();
const app = express();
const port = 4000;
// const dbUrl = process.env.DATABASE_URL;

// // Connecting to local MongoDB
// mongoose.connect(dbUrl, { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on('error', (error) => { console.error(error); });
// db.once('open', () => console.log('Connected to Database'));


app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use('/games', gamesRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
