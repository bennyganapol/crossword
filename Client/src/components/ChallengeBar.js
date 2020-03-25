import React from 'react';
import Square from './Square';


function ChallengeBar(props) {

    const squareClicked = (id) => {
        props.squareClicked(id);
    };

    const isSelected = (id) => {
        return (props.selectedSquareId === id);
    }

    const isSolved = (id) => {
        return (props.solvedIds.includes(id));
    }

    const getWidth = () => {
        let lettersWidth = props.challengeSquares.length * 60;
        if (props.selectedChallenge.multi && props.selectedChallenge.multi.length >= 2) {
            lettersWidth += (props.selectedChallenge.multi.length - 1) * 30;
        }
        return lettersWidth;
    }

    const renderSquares = () => {
        const squares = [];
        let spacesIndexes = null;
        if (props.selectedChallenge.multi && props.selectedChallenge.multi.length >= 2) {
            spacesIndexes = [props.selectedChallenge.multi[0]]
            for (let i = 1; i < props.selectedChallenge.multi; i++) {
                spacesIndexes[i] = spacesIndexes[i - 1] + props.selectedChallenge.multi[i];
            }
        }


        for (let i = 0; i < props.challengeSquares.length; i++) {
            const square = props.challengeSquares[i];
            if (spacesIndexes && spacesIndexes.includes(i)) {
                squares.push(<div
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: "0.5", }}
                        ></ div>);
            }
            squares.push(
                <Square
                        selected={isSelected(square.id)}
                        isSolved={isSolved(square.id)}
                        challengeSelected={true}
                        squareClicked={() => squareClicked(square.id)}
                        currentLetter={props.letters[square.id]}
                        {...square}
                    />
                    );
                }
                return squares;
            }
        
        
            return (
        <div style={{padding : "10px"}}>
                        <div style={{textAlign: "right", height: "35px", fontSize: "25px"}}>{props.selectedChallenge.question}</div>
                        <div style={{ display: "flex", flex: "1", marginRight:0, marginLeft: "auto", flexDirection: (props.horizontalDirection === 'rtl') ? "row-reverse" : "row", width: getWidth() + "px", height: "60px" }}>
                            {/* {props.challengeSquares.map(square =>
                    <Square
                        selected={isSelected(square.id)}
                        isSolved={isSolved(square.id)}
                        challengeSelected={true}
                        squareClicked={() => squareClicked(square.id)}
                        currentLetter={props.letters[square.id]}
                        {...square}
                    />
                )} */}
                            {renderSquares()}

                        </div>
                    </div>
                    );
                }
                
                
                export default ChallengeBar;
