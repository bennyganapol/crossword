import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Game from './Game';
import EditBoard from './EditBoard';
import SelectGame from './SelectGame';

function App() {
  return (
    <>
      <Switch>
        <Route path="/game/:id" component={Game} />
        <Route path="/editboard" component={EditBoard} />
        <Route path="/" component={SelectGame} />
      </Switch>
    </>
  );
}

export default App;
