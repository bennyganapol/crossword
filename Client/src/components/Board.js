import React, { useEffect, useContext, useRef } from 'react';
import Panzoom from '@panzoom/panzoom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import AppContext from '../helpers/AppContext';
import './App.css';
import Square from './Square';

function Board(props) {
  const appContext = useContext(AppContext);
  const panzoomRef = useRef();

  const squareClicked = (id) => {
    props.squareClicked(id);
  };

  const squareRightClicked = (id) => {
    if (props.squareRightClicked) {
      props.squareRightClicked(id);
    }
  };

  const isSelected = (id) => (props.selectedSquareId === id);

  const isSolved = (id) => (props.solvedIds.includes(id));

  const isChallengeSelected = (id) => (props.selectedSquares && props.selectedSquares.some((s) => s.id === id));

  const renderBoard = () => {
    const board = [];

    for (let y = 0; y < props.height; y += 1) {
      const row = [];
      for (let x = 0; x < props.width; x += 1) {
        const id = x + (y * props.width);
        row.push(
          <Square
            key={id}
            selected={isSelected(id)}
            isSolved={isSolved(id)}
            challengeSelected={isChallengeSelected(id)}
            squareClicked={() => squareClicked(id)}
            squareRightClicked={() => squareRightClicked(id)}
            currentLetter={props.letters[id]}
            otherPlayersLetter={props.otherPlayersLetters ? props.otherPlayersLetters[id] : null}
            horizontalDirection={props.horizontalDirection}
            editMode={props.editMode}
            {...props.squares[id]}
          />,
        )
      }
      board.push(
        <div
          key={y}
          style={{
            display: 'flex', flex: '1', flexDirection: 'row', maxHeight: '60px',
          }}
        >
          {row}
        </div>,
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
        contain: 'outside',
        focal: { x: 20, y: 20 },
      });

      element.addEventListener('panzoomend', () => {
        props.hiddenKeyboardRef.current.blur();
      })

      element.addEventListener('panzoomzoom', (event) => {
        const root = document.documentElement;
        const { scale } = event.detail;
        root.style.setProperty('--board-padding-bottom', `${200 / scale}px`);
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
      const { x, y } = props.squares[props.selectedSquareId];
      const scale = panzoom.getScale();
      panzoom.pan(10000, 10000);
      panzoom.pan(
        -(x + 0.5) * 60 + window.innerWidth / 2 / scale,
        -(y - 1.5) * 60,
        { relative: true },
      );
    }
  }, [props.selectedSquareId]);


  return (
    <div className="board">
      {!appContext.isMobileDevice
        && (
          <TransformWrapper
            defaultScale={1}
            defaultPositionX={100}
            defaultPositionY={200}
            pan={{ paddingSize: 0 }}
            doubleClick={{ disabled: true }}
          >
            {({
              zoomIn, zoomOut, resetTransform,
            }) => (
                <>
                  <div className="tools">
                    <button onClick={zoomIn}>+</button>
                    <button onClick={zoomOut}>-</button>
                    <button onClick={resetTransform}>x</button>
                  </div>
                  <TransformComponent>
                    <div
                      className="App"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: `${props.width * props.squareSize}px`,
                        height: `${props.height * props.squareSize}px`,
                      }}
                    >
                      {renderBoard()}
                    </div>
                  </TransformComponent>
                </>
              )}
          </TransformWrapper>
        )}
      {appContext.isMobileDevice

        /* <div className="App" style={{ width: "1000px", height: "1000px" }}> */
        && (
          <div
            id="boardContainer"
            className="App"
            style={{
              overflow: 'hidden', width: '100%', height: '0', display: 'inline-block', paddingBottom: '100%',
            }}
          >
            <div id="boardDiv"
              style={{
                width: `${props.width * props.squareSize}px`,
              }}
            >
              <div
                className="board-div"
                style={{
                  width: `${props.width * props.squareSize}px`,
                  height: `${props.height * props.squareSize}px`,
                  // paddingBottom: window.innerWidth / 2 + "px"
                }}
              >
                {renderBoard()}
              </div>
              <div className="board-keyboard-auto-padding" />
            </div>
          </div>
        )}
    </div>
  );
}

export default Board;
