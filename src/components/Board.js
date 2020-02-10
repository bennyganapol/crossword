import React from 'react';
import './App.css';
import Square from './Square';
import { getSquare } from '../helpers/initialiser'

function Board(props) {
    const squareClicked = (id) => {
        props.squareClicked(id);
    };

    const isSelected = (id) => {
        return (props.selectedSquareId === id);
    }

    const isSolved = (id) => {
        return (props.solvedIds.includes(id));
    }

    const isChallengeSelected = (id) => {
        return (props.selectedSquares && props.selectedSquares.some(s => s.id === id));
    }

    const getLetter = (id) => {
        let letter = null;
        if (props.letters && props.letters[id]) {
            letter = props.letters[id];
        }
        return letter;
    }

    const renderBoard = () => {
        const board = [];
        
        for (let y = 0; y < props.height; y++) {
            const row = [];
            for (let x = 0; x < props.width; x++) {
                const id = x + (y * props.width);
                row.push(
                    <Square
                        selected={isSelected(id)}
                        isSolved={isSolved(id)}
                        challengeSelected={isChallengeSelected(id)}
                        squareClicked={() => squareClicked(id)}
                        currentLetter={props.letters[id]}
                        {...props.squares[id]}
                    />)
            }
            board.push(
                <div style={{ display: "flex", flex: "1", flexDirection: "row" }}>{row}</div>
            );
        }

        return board;
    }



    return (
        <div className="App" style={{ display: "flex", flexDirection: "column", width: "600px", height: "600px" }}>
            {renderBoard()}
        </div>
    );

}

export default Board;

