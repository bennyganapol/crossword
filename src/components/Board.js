import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import './App.css';
import Square from './Square';

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

    // const getLetter = (id) => {
    //     let letter = null;
    //     if (props.letters && props.letters[id]) {
    //         letter = props.letters[id];
    //     }
    //     return letter;
    // }

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
                        horizontalDirection={props.horizontalDirection}
                        {...props.squares[id]}
                    />)
            }
            board.push(
                <div style={{ display: "flex", flex: "1", flexDirection: "row", maxHeight:"60px" }}>{row}</div>
            );
        }

        return board;
    }



    return (
        <TransformWrapper
            defaultScale={1}
            defaultPositionX={100}
            defaultPositionY={200}
            pan={{ paddingSize: 0 }}
        >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <React.Fragment>
                    <div className="tools">
                        <button onClick={zoomIn}>+</button>
                        <button onClick={zoomOut}>-</button>
                        <button onClick={resetTransform}>x</button>
                    </div>
                    <TransformComponent>
                        <div className="App" style={{ display: "flex", flexDirection: "column", width: props.width * props.squareSize + "px", height: props.height * props.squareSize + "px" }}>
                            {renderBoard()}
                        </div>
                    </TransformComponent>
                </React.Fragment>
            )}
        </TransformWrapper>
    );
}

export default Board;

