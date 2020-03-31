import React, { useState, useEffect, useRef, useContext } from 'react';
import './App.css';
import AppContext from '../helpers/AppContext';
import Board from './Board';
import ChallengeBar from './ChallengeBar';
import { socket, socketManager } from '../helpers/SocketManager';
import { getChallenges, getSquares, getChallengeSquares, getSquare, getNextSquare, mapLetter } from '../helpers/initialiser'
// import Keyboard from "react-simple-keyboard";
// import "react-simple-keyboard/build/css/index.css";

function App() {
  const board = { width: 13, height: 13, type: '2', horizontalDirection: 'rtl' };

  const appContext = useContext(AppContext);

  const [challenges, setChallenges] = useState();
  const [squares, setSquares] = useState();
  const [selectedSquareId, setSelectedSquareId] = useState();
  const [selectedSquares, setSelectedSquares] = useState([]);
  const [selectedChallengeId, setSelectedChallengeId] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [solvedChallengesIds, setSolvedChallengesIds] = useState([]);
  const [selectDirection, setSelectDirection] = useState();
  const [letters, setLetters] = useState([]);
  const [otherPlayersLetters, setOtherPlayersLetters] = useState([]);


  const hiddenKeyboardRef = useRef(null);
  const [hiddenKeyboard, setHiddenKeyboard] = useState("a");

  // "react-simple-keyboard
  // const [input, setInput] = useState("");
  // const [layout, setLayout] = useState("default");
  // const keyboard = useRef();

  const toggleFullScreen = () => {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      requestFullScreen.call(docEl);
    }
    else {
      cancelFullScreen.call(doc);
    }
  }

  const squareSelected = (newSelectedId) => {
    const previousSelectedSquareId = selectedSquareId;
    const isSelectedAgain = (newSelectedId === previousSelectedSquareId);
    const newSelectedSquare = squares[newSelectedId];

    setSelectedSquareId(newSelectedId);

    if (newSelectedSquare.challenges && newSelectedSquare.challenges.length > 0) {
      let newChallengeIndex = 0;
      if (newSelectedSquare.challenges.length === 1) {
        newChallengeIndex = 0;
      }
      else {
        if (isSelectedAgain || (newSelectedSquare.isQuestionSquare)) {
          if (selectedChallengeId === newSelectedSquare.challenges[0].id) {
            newChallengeIndex = 1;
          }
          else {
            newChallengeIndex = 0;
          }
        }
        else {
          if (newSelectedSquare.challenges[0].direction === selectDirection) {
            newChallengeIndex = 0;
          }
          else {
            newChallengeIndex = 1;
          }
        }
      }

      const newChallenge = newSelectedSquare.challenges[newChallengeIndex];
      const challengeSquares = getChallengeSquares(squares, newChallenge).map(square => ({ id: square.id }));
      setSelectedSquares(challengeSquares);
      setSelectDirection(newChallenge.direction);
      setSelectedChallengeId(newChallenge.id);
      if (newSelectedSquare.isQuestionSquare === true) {
        setSelectedSquareId(challengeSquares[0].id);
      }
      if (appContext.isMobileDevice) {
        hiddenKeyboardRef.current.focus();
      }
    }
    else {
      setSelectedSquares();
    }
  };

  const keyPressedHandler = (e) => {
    const char = (e.letter) ? e.letter : String.fromCharCode(e.which);
    let letter = mapLetter(char);
    if (selectedSquareId != null) {
      const selectedSquare = squares[selectedSquareId];
      if (selectedSquare && selectedSquare.answerLetter && !solvedIds.includes(selectedSquareId)) {
        const newLetters = letters.slice();
        newLetters[selectedSquareId] = letter;
        setLetters(newLetters);
        checkAnswer(selectedSquare, newLetters)
        socketManager.challengeTyping(selectedSquareId, letter);
      }

      const nextSquareId = getNextSquare(squares, selectedSquareId, selectDirection);
      setSelectedSquareId(nextSquareId);
    }
  }

  const keyDownHandler = (e) => {
    const { key } = e;
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
        else {
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
        const deleteId = deleteSquareIds[i];
        if (letters[deleteId] != null && !solvedIds.includes(deleteId)) {
          const newLetters = letters.slice();
          newLetters[deleteId] = null;
          setLetters(newLetters);
          socketManager.challengeTyping(deleteId, "");
        }
      }
    }
    else if (key === "ArrowRight") {
      const selectedSquare = squares[selectedSquareId];
      const newSquare = getSquare(squares, Math.min(selectedSquare.x + 1, board.width - 1), selectedSquare.y);
      // setSelectedSquareId();
      squareSelected(newSquare.id);
    }
    else if (key === "ArrowLeft") {
      const selectedSquare = squares[selectedSquareId];
      const newSquare = getSquare(squares, Math.max(selectedSquare.x - 1, 0), selectedSquare.y);
      squareSelected(newSquare.id);
    }
    else if (key === "ArrowUp") {
      const selectedSquare = squares[selectedSquareId];
      const newSquare = getSquare(squares, selectedSquare.x, Math.max(selectedSquare.y - 1, 0));
      squareSelected(newSquare.id);
    }
    else if (key === "ArrowDown") {
      const selectedSquare = squares[selectedSquareId];
      const newSquare = getSquare(squares, selectedSquare.x, Math.min(selectedSquare.y + 1, board.height - 1));
      squareSelected(newSquare.id);
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
        const newSolvedChallengesIds = solvedChallengesIds.slice();
        for (let s = 0; s < challengeSquares.length; s++) {
          const square = challengeSquares[s];
          if (!newSolvedIds.includes(square.id)) {
            newSolvedIds.push(square.id)
          }
        }
        if (!newSolvedChallengesIds.includes(selectedSquare.challenges[i].id)) {
          newSolvedChallengesIds.push(selectedSquare.challenges[i].id)
        }

        setSolvedIds(newSolvedIds);
        setSolvedChallengesIds(newSolvedChallengesIds);
        socketManager.challengeSolved(selectedSquare.challenges[i].id);
      }
    }
  }

  const getChallengesData = async () => {
    const newChallenges = await getChallenges();
    setChallenges(newChallenges);
    setSquares(getSquares(newChallenges, board.width, board.height));
  }

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
        newSolvedIds.push(square.id)
      }
    }

    if (!newSolvedChallengesIds.includes(challengeId)) {
      newSolvedChallengesIds.push(challengeId)
    }

    setLetters(newLetters);
    setSolvedIds(newSolvedIds);
    setSolvedChallengesIds(newSolvedChallengesIds);
  }

  const ioInChallengeTyping = (squareId, letter) => {
    const newLetters = otherPlayersLetters.slice()
    newLetters[squareId] = letter;
    setOtherPlayersLetters(newLetters)
  }

  useEffect(() => {
    document.addEventListener("keypress", keyPressedHandler, false);
    document.addEventListener("keydown", keyDownHandler, false);
    socket.on('challengeSolved', ioInChallengeSolved);
    socket.on('challengeTyping', ioInChallengeTyping);

    return () => {
      document.removeEventListener('keypress', keyPressedHandler);
      document.removeEventListener('keydown', keyDownHandler);
      socket.off("challengeSolved");
      socket.off("challengeTyping");
    };
  });

  useEffect(() => {
    getChallengesData();
  }, []);

  const hiddenKeyboardOnChange = (e) => {
    if (e.target.value && e.target.value.length === 2) {
      const a = { letter: e.target.value[1] };
      keyPressedHandler(a);
    }
    else if (e.target.value.length === 0) {
      const b = { key: "Backspace" };
      keyDownHandler(b)
    }
    setHiddenKeyboard("a");
  }

  // "react-simple-keyboard
  // ******************   */


  // const onChange = input => {
  //   setInput(input);
  //   console.log("Input changed", input);
  // };

  // const handleShift = () => {
  //   const newLayoutName = layout === "default" ? "shift" : "default";
  //   setLayout(newLayoutName);
  // };

  // const onKeyPress = button => {
  //   console.log("Button pressed", button);

  //   const char = 'כ';
  //   // const a = { letter: 'd' };
  //   // keyPressedHandler(a);
  //   let letter = mapLetter(char);
  //   if (selectedSquareId != null) {
  //     const selectedSquare = squares[selectedSquareId];
  //     if (selectedSquare && selectedSquare.answerLetter && !solvedIds.includes(selectedSquareId)) {
  //       const newLetters = letters.slice();
  //       newLetters[selectedSquareId] = letter;
  //       setLetters(newLetters);
  //       checkAnswer(selectedSquare, newLetters)
  //       socketManager.challengeTyping(selectedSquareId, letter);
  //     }

  //     const nextSquareId = getNextSquare(squares, selectedSquareId, selectDirection);
  //     setSelectedSquareId(nextSquareId);
  //   }

  //   /**
  //    * If you want to handle the shift and caps lock buttons
  //    */
  //   // if (button === "{shift}" || button === "{lock}") handleShift();
  // };

  // const onChangeInput = event => {
  //   const input = event.target.value;
  //   setInput(input);
  //   keyboard.current.setInput(input);
  // };

  // const lay = {
  //   default: [
  //     "ק ר א ט ו ן ם פ",
  //     "ש ד ג כ ע י ח ל ך ף",
  //     "ז ס ב ה נ מ צ ת",
  //     "{space} {bksp}"
  //   ],
  //   default2: [
  //     "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
  //     "{tab} q w e r t y u i o p [ ] \\",
  //     "{lock} a s d f g h j k l ; ' {enter}",
  //     "{shift} z x c v b n m , . / {shift}",
  //     ".com @ {space}"
  //   ],
  //   shift: [
  //     "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
  //     "{tab} Q W E R T Y U I O P { } |",
  //     '{lock} A S D F G H J K L : " {enter}',
  //     "{shift} Z X C V B N M < > ? {shift}",
  //     ".com @ {space}"
  //   ]
  // };

  return (
    <div className={appContext.isMobileDevice ? "mobile-app" : "desktop-app"}>
      {!challenges && <div>Loading...</div>}
      {challenges && squares &&
        <React.Fragment>
          <div className="hidden-keyboard-div">
            <input className="hidden-keyboard-input" ref={hiddenKeyboardRef} type="text" value={hiddenKeyboard} onChange={hiddenKeyboardOnChange} ></input>
          </div>
          {/* <span>{solvedChallengesIds.length}\{challenges.length}</span>
          {(solvedChallengesIds.length === challenges.length) && <span> Game won !</span>} */}
          <ChallengeBar
            selectedChallenge={challenges[selectedChallengeId]}
            challengeSquares={getChallengeSquares(squares, challenges[selectedChallengeId])}
            selectedSquareId={selectedSquareId}
            solvedIds={solvedIds}
            letters={letters}
            otherPlayersLetters={otherPlayersLetters}
            horizontalDirection={board.horizontalDirection}
            squareClicked={(id) => squareSelected(id, "clicked")}
          />
          <Board
            selectedSquareId={selectedSquareId}
            solvedIds={solvedIds}
            selectedSquares={selectedSquares}
            squares={squares}
            letters={letters}
            otherPlayersLetters={otherPlayersLetters}
            width={board.width}
            height={board.height}
            squareSize={60}
            horizontalDirection={board.horizontalDirection}
            squareClicked={(id) => squareSelected(id, "clicked")}
          />
          {/* <div>
            <input
              value={input}
              placeholder={"Tap on the virtual keyboard to start"}
              onChange={onChangeInput}
            />
            <Keyboard
              keyboardRef={r => (keyboard.current = r)}
              layoutName={layout}
              layout={lay}
              onChange={onChange}
              onKeyPress={onKeyPress}
            />
          </div> */}
        </React.Fragment>
      }
    </div>
  );
}

export default App;


