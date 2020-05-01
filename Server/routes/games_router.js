/* eslint-disable no-console */
import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';

export const gamesRouter = express.Router();

gamesRouter.post('/:id', async (req, res) => {
  try {
    const boardId = req.param('id')? req.param('id') : 1;
    const boardFilePath = path.resolve(__dirname, `../boards/board${boardId}.json`);
    let rawdata = await fs.readFile(boardFilePath);
    const boardData = JSON.parse(rawdata);
    
    const response = {
      boardData: boardData
    };
    res.json(response);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

