import React, { useState, useEffect, useRef, useContext } from 'react';
import './App.css';
import Game from './Game';
import { getBoardData } from '../helpers/initialiser'
function App() {

    const [boardData, setBoardData] = useState();


    const getChallengesData = async () => {
        const newBoardData = await getBoardData();
        // const newChallenges = boardData.challenges;
        setBoardData(newBoardData);
        // setSquares(getSquares(newChallenges, board.width, board.height));
    }


    useEffect(() => {
        getChallengesData();
    }, []);

    return (
        <>
            {boardData &&
                <Game
                    challenges={boardData.challenges}
                    boardWidth={boardData.width}
                    boardHeight={boardData.width}
                    boardType={boardData.type}
                    horizontalDirection={boardData.horizontalDirection}
                />
            }
        </>
    );
}

export default App;