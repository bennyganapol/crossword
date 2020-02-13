import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './Board';
import { getChallenges, getSquares, getChallengeSquares, getSquare, getNextSquare } from '../helpers/initialiser'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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

  const keyDownHandler = (e) => {
    const { key, keyCode } = e;
    //alert(keyCode + ' ' + key);
    //alert(key);
    if (key === "Backspace") {
      let deleteSquareIds = [selectedSquareId];

      const currentSquare = squares[selectedSquareId];

      if (!currentSquare) {
        return;
      }
      
      let currentChallenge = null;
      if (currentSquare.challenges && currentSquare.challenges.length > 0) {
        if (currentSquare.challenges.length === 1 || currentSquare.challenges[0].direction === selectDirection) {
          currentChallenge = currentSquare.challenges[0];
        }
        else{
          currentChallenge = currentSquare.challenges[1];
        }
      }

      if (currentSquare.x === currentChallenge.x && currentSquare.y === currentChallenge.y) {
        deleteSquareIds.push(selectedSquareId);
      }
      else if (letters[selectedSquareId] != null && !solvedIds.includes(selectedSquareId)) {
        deleteSquareIds.push(selectedSquareId);
      }
      else {
        const previousSquare = getNextSquare(squares, selectedSquareId, selectDirection, -1);
        deleteSquareIds.push(previousSquare);
        setSelectedSquareId(previousSquare);
      }

      for (let i = 0; i < deleteSquareIds.length; i++) {
        const deleteID = deleteSquareIds[i];
        if (letters[deleteID] != null && !solvedIds.includes(deleteID)) {
          const newLetters = letters.slice();
          newLetters[deleteID] = null;
          setLetters(newLetters);
        }
      }
    }
    else if (key === "ArrowRight") {
      const selectedSquare = squares[selectedSquareId];
      const newSquare = getSquare(squares, Math.min(selectedSquare.x + 1, board.width - 1), selectedSquare.y);
      // setSelectedSquareId();
      squareClicked(newSquare.id);
    }
    else if (key === "ArrowLeft") {
      const selectedSquare = squares[selectedSquareId];
      const newSquare = getSquare(squares, Math.max(selectedSquare.x - 1, 0), selectedSquare.y);
      squareClicked(newSquare.id);
    }
    else if (key === "ArrowUp") {
      const selectedSquare = squares[selectedSquareId];
      const newSquare = getSquare(squares, selectedSquare.x, Math.max(selectedSquare.y - 1, 0));
      squareClicked(newSquare.id);
    }
    else if (key === "ArrowDown") {
      const selectedSquare = squares[selectedSquareId];
      const newSquare = getSquare(squares, selectedSquare.x, Math.min(selectedSquare.y + 1, board.height - 1));
      squareClicked(newSquare.id);
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
    document.addEventListener("keydown", keyDownHandler, false);
    return () => {
      document.removeEventListener('keypress', keyPressedHandler);
      document.removeEventListener('keydown', keyDownHandler);
    };
  });

  return (
    <TransformWrapper
      defaultScale={1}
      defaultPositionX={200}
      defaultPositionY={100}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <div className="tools">
            <button onClick={zoomIn}>+</button>
            <button onClick={zoomOut}>-</button>
            <button onClick={resetTransform}>x</button>
          </div>
          <TransformComponent>

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
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
}

export default App;


