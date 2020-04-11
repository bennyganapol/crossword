import React, { useState, useEffect, useRef, useContext } from 'react';
import './App.css';
import AppContext from '../helpers/AppContext';
import Board from './Board';
import ChallengeBar from './ChallengeBar';
import EditArea from './EditArea';
import { getBoardData, getSquares, getChallengeSquares, getSquare, getNextSquare, mapLetter } from '../helpers/initialiser'

function EditBoard(props) {
    const appContext = useContext(AppContext);

    // const [challenges, setChallenges] = useState();
    const [boardData, setBoardData] = useState();
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

    const squareSelected = (newSelectedId, challenge) => {
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

            const newChallenge = challenge != null ? challenge : newSelectedSquare.challenges[newChallengeIndex];
            // const newChallenge = newSelectedSquare.challenges[newChallengeIndex];
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
                }
            }
        }
        else if (key === "ArrowRight") {
            const selectedSquare = squares[selectedSquareId];
            const newSquare = getSquare(squares, Math.min(selectedSquare.x + 1, boardData.width - 1), selectedSquare.y);
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
            const newSquare = getSquare(squares, selectedSquare.x, Math.min(selectedSquare.y + 1, boardData.height - 1));
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
            }
        }
    }

    const initBoardData = async () => {
        const newBoardData = await getBoardData();
        setBoardData(newBoardData);
        setSquares(getSquares(newBoardData.challenges, newBoardData.width, newBoardData.height));
    }

    const previewOnClick = (newBoardData) =>{
        setBoardData(newBoardData);
        setSquares(getSquares(newBoardData.challenges, newBoardData.width, newBoardData.height));
    }

    const onChallengeClicked = (id) => {
        const challenge = boardData.challenges[id];
        const challengeSquare = getSquare(squares, challenge.questionX, challenge.questionY);
        squareSelected(challengeSquare.id, challenge);
        // alert('showing ' + boardData.challenges[id].question);
    }

    useEffect(() => {
        initBoardData();
    }, []);

    useEffect(() => {
        document.addEventListener("keypress", keyPressedHandler, false);
        document.addEventListener("keydown", keyDownHandler, false);
        return () => {
            document.removeEventListener('keypress', keyPressedHandler);
            document.removeEventListener('keydown', keyDownHandler);
        };
    });

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

    return (
        <div className="desktop-app">
            {!boardData && <div>Loading...</div>}
            {boardData && squares &&
                <div className="edit-board" >
                    <div className="edit-board-preview">
                        <ChallengeBar
                            selectedChallenge={boardData.challenges[selectedChallengeId]}
                            challengeSquares={getChallengeSquares(squares, boardData.challenges[selectedChallengeId])}
                            selectedSquareId={selectedSquareId}
                            solvedIds={solvedIds}
                            letters={letters}
                            otherPlayersLetters={otherPlayersLetters}
                            horizontalDirection={boardData.horizontalDirection}
                            squareClicked={(id) => squareSelected(id, "clicked")}
                            editMode={true}
                        />
                        <Board
                            selectedSquareId={selectedSquareId}
                            solvedIds={solvedIds}
                            selectedSquares={selectedSquares}
                            squares={squares}
                            letters={letters}
                            otherPlayersLetters={otherPlayersLetters}
                            width={boardData.width}
                            height={boardData.height}
                            squareSize={60}
                            horizontalDirection={boardData.horizontalDirection}
                            squareClicked={(id) => squareSelected(id)}
                            hiddenKeyboardRef={hiddenKeyboardRef}
                            editMode={true}
                        />
                    </div>
                    <div className="edit-area">
                        <EditArea boardData={boardData}
                        previewOnClick={previewOnClick}
                        onChallengeClicked={onChallengeClicked}
                        />
                    </div>
                </div>
            }
        </div>
    );
}

export default EditBoard;


