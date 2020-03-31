import React, { useContext } from 'react';
import AppContext from '../helpers/AppContext';
import Square from './Square';


function ChallengeBar(props) {

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

    const challengeBarSquareSize = appContext.isMobileDevice ? 40 : 60;

    const getWidth = () => {
        let lettersWidth = props.challengeSquares.length * challengeBarSquareSize;
        if (props.selectedChallenge.multi && props.selectedChallenge.multi.length >= 2) {
            const spaceBetweenWords =  challengeBarSquareSize / 4;
            lettersWidth += (props.selectedChallenge.multi.length - 1) * spaceBetweenWords;
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
                    key={i}
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
        <div className="challenge-bar">
            <div className="challenge-bar-question">{props.selectedChallenge.question}</div>
            <div className="challenge-bar-answer" style={{ flexDirection: (props.horizontalDirection === 'rtl') ? "row-reverse" : "row", width: getWidth() + "px", height: challengeBarSquareSize + "px" }}>
                {renderSquares()}
            </div>
        </div>
    );
}


export default ChallengeBar;
