import React, {
  useState, useEffect,
} from 'react';
import './App.css';
import Board from './Board';
// import ChallengeBar from './ChallengeBar';
import EditArea from './EditArea';
import {
  getBoardData, getSquares, getChallengeSquares, getSquare,
} from '../helpers/initialiser'

function EditBoard() {
  const [boardData, setBoardData] = useState();
  const [squares, setSquares] = useState();
  const [selectedSquareId, setSelectedSquareId] = useState();
  const [selectedSquares, setSelectedSquares] = useState([]);
  const [selectedChallengeId, setSelectedChallengeId] = useState(0);
  const [selectDirection, setSelectDirection] = useState();
  const emptyArray = [];
  const [boardLatestEvent, setBoardLatestEvent] = useState();

  const squareSelected = (newSelectedId, challenge) => {
    const previousSelectedSquareId = selectedSquareId;
    const isSelectedAgain = (newSelectedId === previousSelectedSquareId);
    const newSelectedSquare = squares[newSelectedId];

    setSelectedSquareId(newSelectedId);

    if (newSelectedSquare.challenges && newSelectedSquare.challenges.length > 0) {
      let newChallengeIndex = 0;
      if (newSelectedSquare.challenges.length === 1) {
        newChallengeIndex = 0;
      } else if (isSelectedAgain || (newSelectedSquare.isQuestionSquare)) {
        if (selectedChallengeId === newSelectedSquare.challenges[0].id) {
          newChallengeIndex = 1;
        } else {
          newChallengeIndex = 0;
        }
      } else if (newSelectedSquare.challenges[0].direction === selectDirection) {
        newChallengeIndex = 0;
      } else {
        newChallengeIndex = 1;
      }

      const newChallenge = challenge != null ? challenge : newSelectedSquare.challenges[newChallengeIndex];
      // const newChallenge = newSelectedSquare.challenges[newChallengeIndex];
      const challengeSquares = getChallengeSquares(squares, newChallenge).map((square) => ({ id: square.id }));
      setSelectedSquares(challengeSquares);
      setSelectDirection(newChallenge.direction);
      setSelectedChallengeId(newChallenge.id);
      const challengeElement = document.getElementById(`editchallenge${newChallenge.id}`);
      challengeElement.focus();
      challengeElement.blur();
      if (newSelectedSquare.isQuestionSquare === true && challengeSquares && challengeSquares[0]) {
        setSelectedSquareId(challengeSquares[0].id);
      }
    } else {
      setSelectedSquares();
    }
  };

  const squareRightClicked = (squareId) => {
    const square = squares[squareId];
    setBoardLatestEvent(
      {
        event: 'squareRightClicked',
        x: square.x,
        y: square.y,
      },
    );
  }
  const refreshBoard = (newBoardData) => {
    // for (let i = 0; i < newBoardData.challenges.length; i += 1) {
    //   if (!newBoardData.challenges[i].id) {
    //     newBoardData.challenges[i].id = i;
    //   }
    // }
    setBoardData(newBoardData);
    setSquares(getSquares(newBoardData.challenges, newBoardData.width, newBoardData.height));
  }

  const initBoardData = async () => {
    const newBoardData = await getBoardData();
    refreshBoard(newBoardData);
    // setSquares(getSquares(newBoardData.challenges, newBoardData.width, newBoardData.height));
  }

  const onChallengeClicked = (id) => {
    const challenge = boardData.challenges[id];
    const challengeSquare = getSquare(squares, challenge.questionX, challenge.questionY);
    if (challengeSquare) {
      squareSelected(challengeSquare.id, challenge);
    } else {
      setSelectedChallengeId(id);
      setSelectedSquareId();
      setSelectedSquares();
    }
  }

  const onChallengesChanged = (newChallenges) => {
    const newChallengesCopy = newChallenges.slice();

    for (let i = 0; i < newChallengesCopy.length; i += 1) {
      if (newChallengesCopy[i]) {
        newChallengesCopy[i].id = i;
      }
    }

    const newBoardData = { ...boardData, challenges: newChallengesCopy };
    refreshBoard(newBoardData);
  }


  useEffect(() => {
    initBoardData();
  }, []);

  return (
    <div className="desktop-app">
      {!boardData && <div>Loading...</div>}
      {boardData && squares && (
        <div className="edit-board">
          <div className="edit-board-preview">
            {/* <ChallengeBar
              selectedChallenge={boardData.challenges[selectedChallengeId]}
              challengeSquares={getChallengeSquares(squares, boardData.challenges[selectedChallengeId])}
              selectedSquareId={selectedSquareId}
              solvedIds={emptyArray}
              letters={emptyArray}
              horizontalDirection={boardData.horizontalDirection}
              squareClicked={(id) => squareSelected(id)}
              editMode
            /> */}
            <Board
              selectedSquareId={selectedSquareId}
              solvedIds={emptyArray}
              selectedSquares={selectedSquares}
              squares={squares}
              letters={emptyArray}
              width={boardData.width}
              height={boardData.height}
              squareSize={60}
              horizontalDirection={boardData.horizontalDirection}
              squareClicked={squareSelected}
              squareRightClicked={squareRightClicked}
              editMode
            />
          </div>
          <div className="edit-area">
            <EditArea
              boardData={boardData}
              boardLatestEvent={boardLatestEvent}
              selectedChallengeId={selectedChallengeId}
              refreshBoard={refreshBoard}
              onChallengeClicked={onChallengeClicked}
              onChallengesChanged={onChallengesChanged}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default EditBoard;
