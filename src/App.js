import React from 'react';
import logo from './logo.svg';
import './App.css';
import Square from './Square';

function App() {
  const field = { width: 10, height :10, type: '2'};
  const challenges = 
  [
    {question: "Where",        answer: "here",    x: 1,    y: 1, direction: 'left'  },
    {question: "would you",    answer: "yes",    x: 1,    y: 2, direction: 'left'  },

  ];
  const squares = [];

  for (let i = 0; i < field.width; i++) {
    squares[i] = [];
    for (let j = 0; j < field.height; j++) {
      squares[i][j] = {number: i * 10 + j};
    }
  }
  

  
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          

        </a>
        
      </header> */}
      {squares.map(line => ( line.map(square => (<Square number={square.number} />))))}
    </div>
  );
}

export default App;
