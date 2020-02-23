import React, { useState, useEffect } from 'react';
import Square from './Square';


function ChallengeBar(props) {

    const squareClicked = (id) => {
        console.info('squareClicked ' + id);
        props.squareClicked(id);
    };

    const isSelected = (id) => {
        return (props.selectedSquareId === id);
    }

    const isSolved = (id) => {
        return (props.solvedIds.includes(id));
    }

    return (
        <div>
            <div>{props.selectedChallenge.question}</div>
            <div style={{ display: "flex", flex: "1", flexDirection: (props.horizontalDirection === 'rtl')? "row-reverse" : "row", width: props.challengeSquares.length * 60 + "px" , height:"60px" }}>
                {/* {props.challengeSquares.map(square => square.answerLetter)} */}
                {props.challengeSquares.map(square =>
                    <Square
                        selected={isSelected(square.id)}
                        isSolved={isSolved(square.id)}
                        challengeSelected={true}
                        squareClicked={() => squareClicked(square.id)}
                        currentLetter={props.letters[square.id]}
                        {...square}
                    />
                )}

            </div>
        </div>
    );
}


export default ChallengeBar;
