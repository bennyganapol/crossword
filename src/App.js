import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './Board';

function App() {
  const board = { width: 10, height: 10, type: '2' };


  const getChallenges = () => {
    const challenges =
      [
        { question: "Where", answer: "here", x: 2, y: 1, questionX: 1, questionY: 1, direction: 'right' },
        { question: "would you", answer: "yes", x: 2, y: 2, questionX: 1, questionY: 2, direction: 'right' },
        { question: "really", answer: "maybe", x: 3, y: 5, questionX: 3, questionY: 4, direction: 'down' },

      ];
    return challenges;
  }


  const getSquares = (boardChallenges) => {
    const squares = [];

    for (let x = 1; x <= board.width; x++) {
      squares[x] = [];
      for (let y = 1; y <= board.height; y++) {
        squares[x][y] = {
          x,
          y,
          number: ((y - 1) * board.width) + x,
          challenges: [],
        };
      }
    }

    boardChallenges.forEach(challenge => {

      if (challenge.questionX && challenge.questionY) {
        let questionSquare = squares[challenge.questionX][challenge.questionY];
        if (questionSquare) {
          questionSquare.isQuestionSquare = true;
          questionSquare.challenges.push(challenge);
        }
      }

      let challengeSquares = getChallengeSquares(squares, challenge);
      for (let i = 0; i < challengeSquares.length; i++) {
        let currentSquare = challengeSquares[i];
        if (currentSquare) {
          currentSquare.letter = challenge.answer[i];
          currentSquare.challenges.push(challenge);
        }

      }
    });

    return squares;
  }

  const getChallengeSquares = (squares, challenge) => {
    let returnSquares = [];
    for (let index = 0; index < challenge.answer.length; index++) {
      const letter = challenge.answer[index];
      let x = challenge.x;
      let y = challenge.y;
      switch (challenge.direction) {
        case 'left':
          x -= (index);
          break;
        case 'right':
          x += (index);
          break;
        case 'down':
          y += (index);
          break;
        case 'up':
          y -= (index);
          break;
        default:
          break;
      }
      returnSquares.push(squares[x][y]);
    }
    return returnSquares;
  }

  const [challenges, setChallenges] = useState(getChallenges());
  const [squares, setSqaures] = useState(getSquares(challenges));
  const [selectedSquare, setSelectedSquare] = useState();
  const [selectedSquares, setSelectedSquares] = useState();

  const squareClicked = (x, y) => {
    console.log('App clicked: ' + x + ' ' + y);
    setSelectedSquare({ x, y });

    if (squares[x][y].challenges && squares[x][y].challenges.length > 0) {
      setSelectedSquares(getChallengeSquares(squares, squares[x][y].challenges[0]).map(square => ({ x: square.x, y: square.y })));
      //alert(squares[x][y].challenges[0].answer);
    }
    else{
      setSelectedSquares();
    }
  };

  const escFunction = (e) => {
    console.log('pressed: ' + String.fromCharCode(e.which));
  }

  useEffect(() => {
    document.addEventListener("keypress", escFunction, false);
  });

  return (
    <div>
      <Board
        selectedSquare={selectedSquare}
        selectedSquares={selectedSquares}
        squares={squares}
        width={board.width}
        height={board.height}
        squareClicked={(x, y) => squareClicked(x, y)}
      />
    </div>
  );
}

export default App;


