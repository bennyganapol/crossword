import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './Board';
import { getChallenges, getSquares, getChallengeSquares, getSquare, getNextSquare } from '../helpers/initialiser'

function App() {
  const board = { width: 10, height: 10, type: '2', defaultTypeDirection: 'right' };

  const [challenges, setChallenges] = useState(getChallenges());
  const [squares, setSqaures] = useState(getSquares(challenges, board.width, board.height));
  const [selectedSquareId, setSelectedSquareId] = useState();
  const [selectedSquares, setSelectedSquares] = useState([]);
  const [solvedIds, setSolvedIds] = useState([]);
  const [selectDirection, setSelectDirection] = useState();
  const [letters, setLetters] = useState([]);

  const squareClicked = (newSelectedId) => {
    console.log('App clicked: ' + newSelectedId);
    const previousSelectedSquareId = selectedSquareId;
    const isSelectedAgain = (newSelectedId === previousSelectedSquareId);
    const newSelectedSquare = squares[newSelectedId];

    setSelectedSquareId(newSelectedId);

    if (newSelectedSquare.challenges && newSelectedSquare.challenges.length > 0) {
      let newChallengeId = 0;
      if (newSelectedSquare.challenges.length === 1) {
        newChallengeId = 0;
      }
      else {
        if (isSelectedAgain) {
          if (selectDirection === newSelectedSquare.challenges[0].direction) {
            newChallengeId = 1;
          }
          else {
            newChallengeId = 0;
          }
        }
        else {
          if (newSelectedSquare.challenges[0].direction === selectDirection) {
            newChallengeId = 0;
          }
          else {
            newChallengeId = 1;
          }
        }
      }
      setSelectedSquares(getChallengeSquares(squares, newSelectedSquare.challenges[newChallengeId]).map(square => ({ id: square.id })));
      setSelectDirection(newSelectedSquare.challenges[newChallengeId].direction);
    }
    else {
      setSelectedSquares();
    }
  };

  const keyPressedHandler = (e) => {
    let letter = String.fromCharCode(e.which);
    console.log('pressed: ' + letter);
    if (selectedSquareId) {
      const selectedSquare = squares[selectedSquareId];
      if (selectedSquare && selectedSquare.answerLetter && !solvedIds.includes(selectedSquareId)) {
        const newLetters = letters.slice();
        newLetters[selectedSquareId] = letter;
        setLetters(newLetters);

        checkAnswer(selectedSquare, newLetters)
      }

      const nextSquareId = getNextSquare(squares, selectedSquareId, selectDirection);
      setSelectedSquareId(nextSquareId);
    }
  }

  const checkAnswer = (selectedSquare, newLetters) => {
    for (let i = 0; i < selectedSquare.challenges.length; i++) {
      const challengeSquares = getChallengeSquares(squares, selectedSquare.challenges[i]);
      let challengeCompleted = true;
      for (let s = 0; s < challengeSquares.length; s++) {
        const square = challengeSquares[s];
        if (square.answerLetter !== newLetters[square.id]) {
          challengeCompleted = false;
          break;
        }
      }

      if (challengeCompleted) {
        const newSolvedIds = solvedIds.slice();
        for (let s = 0; s < challengeSquares.length; s++) {
          const square = challengeSquares[s];
          if (!newSolvedIds.includes(square.id)) {
            newSolvedIds.push(square.id)
          }
        }
        setSolvedIds(newSolvedIds);
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keypress", keyPressedHandler, false);
    return () => {
      document.removeEventListener('keypress', keyPressedHandler);
    };
  });

  return (
    <div>
      <Board
        selectedSquareId={selectedSquareId}
        solvedIds={solvedIds}
        selectedSquares={selectedSquares}
        squares={squares}
        letters={letters}
        width={board.width}
        height={board.height}
        squareClicked={(x, y) => squareClicked(x, y)}
      />
    </div>
  );
}

export default App;


