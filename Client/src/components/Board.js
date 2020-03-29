import React, { useEffect, useContext } from 'react';
import AppContext from '../helpers/AppContext';
import Panzoom from '@panzoom/panzoom';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import './App.css';
import Square from './Square';

function Board(props) {
    const appContext = useContext(AppContext);

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

    const renderBoard = () => {
        const board = [];

        for (let y = 0; y < props.height; y++) {
            const row = [];
            for (let x = 0; x < props.width; x++) {
                const id = x + (y * props.width);
                row.push(
                    <Square
                        key={id}
                        selected={isSelected(id)}
                        isSolved={isSolved(id)}
                        challengeSelected={isChallengeSelected(id)}
                        squareClicked={() => squareClicked(id)}
                        currentLetter={props.letters[id]}
                        otherPlayersLetter={props.otherPlayersLetters[id]}
                        horizontalDirection={props.horizontalDirection}
                        {...props.squares[id]}
                    />)
            }
            board.push(
                <div key={y} style={{ display: "flex", flex: "1", flexDirection: "row", maxHeight: "60px" }}>{row}</div>
            );
        }

        return board;
    }

    useEffect(() => {
        if (appContext.isMobileDevice) {
            const element = document.getElementById('boardDiv')
            const panzoom = Panzoom(element, {
                maxScale: 1.5,
                contain: "outside"
            })
        }
    }, []);



    return (
        <React.Fragment>
            {!appContext.isMobileDevice &&
                <TransformWrapper
                    defaultScale={1}
                    defaultPositionX={100}
                    defaultPositionY={200}
                    pan={{ paddingSize: 0 }}
                    doubleClick={{ disabled: true }}
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
            }
            {appContext.isMobileDevice &&

                /* <div className="App" style={{ width: "1000px", height: "1000px" }}> */
                < div id="boardContainer" className="App" style={{ overflow: "hidden", width: "100%", height: "250px" }}>
                    <div id="boardDiv" className="App" style={{ display: "flex", flexDirection: "column", width: props.width * props.squareSize + "px", height: props.height * props.squareSize + "px" }}>
                        {renderBoard()}
                    </div>
                </div>
            }
        </React.Fragment >
    );
}

export default Board;

