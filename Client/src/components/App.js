import React, { useState, useEffect, useRef, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Game from './Game';
import SelectGame from './SelectGame';
import { getBoardData } from '../helpers/initialiser'
function App() {

    return (
        <>
            <Switch>
                <Route path="/" component={SelectGame} exact />
                <Route path="/game" component={Game} />
            </Switch>
        </>
    );
}

export default App;