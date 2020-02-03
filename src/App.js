import React from 'react';
import logo from './logo.svg';
import './App.css';
import Square from './Square';

function App() {
  const field = { width: 10, height: 10, type: '2' };
  const challenges =
    [
      { question: "Where", answer: "here", x: 1, y: 1, direction: 'left' },
      { question: "would you", answer: "yes", x: 1, y: 2, direction: 'left' },

    ];
  const squares = [];

  for (let i = 0; i < field.width; i++) {
    squares[i] = [];
    for (let j = 0; j < field.height; j++) {
      squares[i][j] = { number: i * 10 + j };
    }
  }



  return (
    <div className="App" style={{display: "flex", flexDirection: "column", width:"600px", height:"600px"}}>


      {squares.map((line) =>
        <div style={{display:"flex", flex: "1", flexDirection: "row"}}>
          {line.map(ss => <Square number={ss.number + 1} />) }
        </div>
      )
      }


      {/* {squares.map(line => ( line.map(square => (<Square number={square.number} />))))} */}
    </div>
  );
}

export default App;
