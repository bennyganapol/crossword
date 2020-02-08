import React, { useState } from 'react';
import './App.css';
import Square from './Square';

function Board(props) {
    const squareClicked = (x, y) => {
        props.squareClicked(x, y);
    };

    const isSelected = (x, y) => {
        return (props.selectedSquare && x === props.selectedSquare.x && y === props.selectedSquare.y);
    }

    const isChallengeSelected = (x, y) => {
        return (props.selectedSquares && props.selectedSquares.some(s => s.x === x && s.y === y ));
    }

    return (
        <div className="App" style={{ display: "flex", flexDirection: "column", width: "600px", height: "600px" }}>
            {[...Array(props.height).keys()].map((y) =>
                <div style={{ display: "flex", flex: "1", flexDirection: "row" }}>
                    {[...Array(props.width).keys()].map(x =>
                        <Square
                            selected={isSelected(x+1, y+1)}
                            challengeSelected={isChallengeSelected(x+1, y+1)}
                            squareClicked={() => squareClicked(x + 1, y + 1)}
                             {...props.squares[x + 1][y + 1]}
                        />)}
                </div>
            )
            }
        </div>
    );

}

export default Board;

