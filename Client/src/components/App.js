import React, { useState, useEffect } from 'react';

import './App.css';
import Board from './Board';
import ChallengeBar from './ChallengeBar';
import { socket, socketManager } from '../helpers/SocketManager';
import {
  getChallenges,
  getSquares,
  getChallengeSquares,
  getSquare,
  getNextSquare,
  mapLetter,
} from '../helpers/initialiser';

function App() {
  const board = {
    width: 13,
    height: 13,
    type: '2',
    horizontalDirection: 'rtl',
  };

  const [challenges, setChallenges] = useState();
  const [squares, setSquares] = useState();
  const [selectedSquareId, setSelectedSquareId] = useState();
  const [selectedSquares, setSelectedSquares] = useState([]);
  const [selectedChallengeId, setSelectedChallengeId] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [solvedChallengesIds, setSolvedChallengesIds] = useState([]);
  const [selectDirection, setSelectDirection] = useState();
  const [letters, setLetters] = useState([]);

  const squareSelected = (newSelectedId) => {
    const previousSelectedSquareId = selectedSquareId;
    const isSelectedAgain = newSelectedId === previousSelectedSquareId;
    const newSelectedSquare = squares[newSelectedId];

    setSelectedSquareId(newSelectedId);

    if (
      newSelectedSquare.challenges &&
      newSelectedSquare.challenges.length > 0
    ) {
      let newChallengeIndex = 0;
      if (newSelectedSquare.challenges.length === 1) {
        newChallengeIndex = 0;
      } else {
        if (isSelectedAgain || newSelectedSquare.isQuestionSquare) {
          if (selectedChallengeId === newSelectedSquare.challenges[0].id) {
            newChallengeIndex = 1;
          } else {
            newChallengeIndex = 0;
          }
        } else {
          if (newSelectedSquare.challenges[0].direction === selectDirection) {
            newChallengeIndex = 0;
          } else {
            newChallengeIndex = 1;
          }
        }
      }

      const newChallenge = newSelectedSquare.challenges[newChallengeIndex];
      const challengeSquares = getChallengeSquares(
        squares,
        newChallenge,
      ).map((square) => ({ id: square.id }));
      setSelectedSquares(challengeSquares);
      setSelectDirection(newChallenge.direction);
      setSelectedChallengeId(newChallenge.id);
      if (newSelectedSquare.isQuestionSquare === true) {
        setSelectedSquareId(challengeSquares[0].id);
      }
    } else {
      setSelectedSquares();
    }
  };

  const keyPressedHandler = (e) => {
    let letter = mapLetter(String.fromCharCode(e.which));
    if (selectedSquareId != null) {
      const selectedSquare = squares[selectedSquareId];
      if (
        selectedSquare &&
        selectedSquare.answerLetter &&
        !solvedIds.includes(selectedSquareId)
      ) {
        const newLetters = letters.slice();
        newLetters[selectedSquareId] = letter;
        setLetters(newLetters);

        checkAnswer(selectedSquare, newLetters);
      }

      const nextSquareId = getNextSquare(
        squares,
        selectedSquareId,
        selectDirection,
      );
      setSelectedSquareId(nextSquareId);
    }
  };

  const keyDownHandler = (e) => {
    const { key } = e;
    if (key === 'Backspace') {
      let deleteSquareIds = [selectedSquareId];

      const currentSquare = squares[selectedSquareId];

      if (!currentSquare) {
        return;
      }

      let currentChallenge = null;
      if (currentSquare.challenges && currentSquare.challenges.length > 0) {
        if (
          currentSquare.challenges.length === 1 ||
          currentSquare.challenges[0].direction === selectDirection
        ) {
          currentChallenge = currentSquare.challenges[0];
        } else {
          currentChallenge = currentSquare.challenges[1];
        }
      }

      if (
        currentSquare.x === currentChallenge.x &&
        currentSquare.y === currentChallenge.y
      ) {
        deleteSquareIds.push(selectedSquareId);
      } else if (
        letters[selectedSquareId] != null &&
        !solvedIds.includes(selectedSquareId)
      ) {
        deleteSquareIds.push(selectedSquareId);
      } else {
        const previousSquare = getNextSquare(
          squares,
          selectedSquareId,
          selectDirection,
          -1,
        );
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
    } else if (key === 'ArrowRight') {
      const selectedSquare = squares[selectedSquareId];
      const newSquare = getSquare(
        squares,
        Math.min(selectedSquare.x + 1, board.width - 1),
        selectedSquare.y,
      );
      // setSelectedSquareId();
      squareSelected(newSquare.id);
    } else if (key === 'ArrowLeft') {
      const selectedSquare = squares[selectedSquareId];
      const newSquare = getSquare(
        squares,
        Math.max(selectedSquare.x - 1, 0),
        selectedSquare.y,
      );
      squareSelected(newSquare.id);
    } else if (key === 'ArrowUp') {
      const selectedSquare = squares[selectedSquareId];
      const newSquare = getSquare(
        squares,
        selectedSquare.x,
        Math.max(selectedSquare.y - 1, 0),
      );
      squareSelected(newSquare.id);
    } else if (key === 'ArrowDown') {
      const selectedSquare = squares[selectedSquareId];
      const newSquare = getSquare(
        squares,
        selectedSquare.x,
        Math.min(selectedSquare.y + 1, board.height - 1),
      );
      squareSelected(newSquare.id);
    }
  };

  const checkAnswer = (selectedSquare, newLetters) => {
    for (let i = 0; i < selectedSquare.challenges.length; i++) {
      const challengeSquares = getChallengeSquares(
        squares,
        selectedSquare.challenges[i],
      );
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
        const newSolvedChallengesIds = solvedChallengesIds.slice();
        for (let s = 0; s < challengeSquares.length; s++) {
          const square = challengeSquares[s];
          if (!newSolvedIds.includes(square.id)) {
            newSolvedIds.push(square.id);
          }
        }
        if (!newSolvedChallengesIds.includes(selectedSquare.challenges[i].id)) {
          newSolvedChallengesIds.push(selectedSquare.challenges[i].id);
        }

        socketManager.challengeSolved(selectedSquare.challenges[i].id);
        setSolvedIds(newSolvedIds);
        setSolvedChallengesIds(newSolvedChallengesIds);
      }
    }
  };

  const getChallengesData = async () => {
    const newChallenges = await getChallenges();
    setChallenges(newChallenges);
    setSquares(getSquares(newChallenges, board.width, board.height));
  };

  const ioInChallengeSolved = (challengeId) => {
    const newLetters = letters.slice();
    const newSolvedIds = solvedIds.slice();
    const newSolvedChallengesIds = solvedChallengesIds.slice();

    const challenge = challenges[challengeId];
    const challengeSquares = getChallengeSquares(squares, challenge);

    for (let i = 0; i < challengeSquares.length; i++) {
      const square = challengeSquares[i];
      newLetters[square.id] = square.answerLetter;
      if (!newSolvedIds.includes(square.id)) {
        newSolvedIds.push(square.id);
      }
    }

    if (!newSolvedChallengesIds.includes(challengeId)) {
      newSolvedChallengesIds.push(challengeId);
    }

    setLetters(newLetters);
    setSolvedIds(newSolvedIds);
    setSolvedChallengesIds(newSolvedChallengesIds);
  };

  useEffect(() => {
    document.addEventListener('keypress', keyPressedHandler, false);
    document.addEventListener('keydown', keyDownHandler, false);
    socket.on('challengeSolved', ioInChallengeSolved);

    return () => {
      document.removeEventListener('keypress', keyPressedHandler);
      document.removeEventListener('keydown', keyDownHandler);
      socket.off('challengeSolved');
    };
  });

  useEffect(() => {
    getChallengesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {!challenges && <div>Loading...</div>}
      {challenges && squares && (
        <div>
          <span>
            {solvedChallengesIds.length}\{challenges.length}
          </span>
          {solvedChallengesIds.length === challenges.length && (
            <span> Game won !</span>
          )}
          <ChallengeBar
            selectedChallenge={challenges[selectedChallengeId]}
            challengeSquares={getChallengeSquares(
              squares,
              challenges[selectedChallengeId],
            )}
            selectedSquareId={selectedSquareId}
            solvedIds={solvedIds}
            letters={letters}
            horizontalDirection={board.horizontalDirection}
            squareClicked={(id) => squareSelected(id, 'clicked')}
          />
          <Board
            selectedSquareId={selectedSquareId}
            solvedIds={solvedIds}
            selectedSquares={selectedSquares}
            squares={squares}
            letters={letters}
            width={board.width}
            height={board.height}
            squareSize={60}
            horizontalDirection={board.horizontalDirection}
            squareClicked={(id) => squareSelected(id, 'clicked')}
          />
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
