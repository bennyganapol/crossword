import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function SelectGame() {
    return (
        <>
            <div>Select game:</div>

            <Link to="/Game">Arrow Word 1</Link>
        </>
    );
}

export default SelectGame;