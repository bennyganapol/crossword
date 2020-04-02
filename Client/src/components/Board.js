import React, { useEffect, useContext, useRef } from 'react';
import AppContext from '../helpers/AppContext';
import Panzoom from '@panzoom/panzoom';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import './App.css';
import Square from './Square';

function Board(props) {
    const appContext = useContext(AppContext);
    const panzoomRef = useRef();

    const squareClicked = (id) => {
        props.squareClicked(id);
    }

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
                maxScale: 1.3,
                minScale: 0.5,
                startScale: 1,
                animate: true,
                contain: "outside",
            });

            element.addEventListener('panzoomend', (event) => {
                props.hiddenKeyboardRef.current.blur();
                
              })

            panzoomRef.current = panzoom;
            return () => {
                panzoomRef.current.destroy();
            };
        }
    }, []);

    useEffect(() => {
        if (appContext.isMobileDevice && props.selectedSquareId) {
            const panzoom = panzoomRef.current;
            // alert(panzoom.getPan().x + " " + panzoom.getPan().y);
            // alert(props.selectedSquareId);
            // const xDif = ((props.width * 60) / 2) - ((props.squares[props.selectedSquareId].x + 0.5) * 60)
            // const yDif = ((props.width * 60) / 2) - ((props.squares[props.selectedSquareId].y + 0.5) * 60)
            const {x , y } = props.squares[props.selectedSquareId];
            const scale = panzoom.getScale();
            panzoom.pan(-((x + 0.5) * 60) + (210), -((y + 0.5) * 60) + 60 * scale);
            
        }

    }, [props.selectedSquareId]);



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
                < div id="boardContainer" className="App" style={{ overflow: "hidden", width: "100%", height: "0", display: "inline-block", paddingBottom: "100%" }}>
                    <div id="boardDiv" className="board-div" style={{ width: props.width * props.squareSize + "px", height: props.height * props.squareSize + "px" }}>
                        {renderBoard()}
                    </div>
                </div>
            }
        </React.Fragment >
    );
}

export default Board;

