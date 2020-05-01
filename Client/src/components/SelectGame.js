import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function SelectGame() {
  return (
    <>
      <div>Select game:</div>
      <br />
      <div><Link to="/Game/1">Arrow Word 1</Link></div>
      <div><Link to="/Game/2">Arrow Word 2</Link></div>
      <div><Link to="/EditBoard">Edit your own board</Link></div>
    </>
  );
}

export default SelectGame;
