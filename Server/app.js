/* eslint-disable no-console */
//const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import { usersRouter } from './routes/users';
// import { authRouter } from './routes/auth';
// import { global } from './middlewares/global';

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
// app.use(global.authenticateRequest); // Authntication all requests (except login and register).

// app.use('/users', usersRouter);
// app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('welcome !');

});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
