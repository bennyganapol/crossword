import React from 'react';

function Square(props) {
    const styles = {
        questionSqaure: {
            backgroundColor: "Lightgray",
        },
        selectedSquare: {
            backgroundColor: "LightGreen",
        },
        solvedSquare: {
            backgroundColor: "Yellow",
        },
        selectedChallenge: {
            backgroundColor: "LightBlue",
        }
    }



    return (
        <div
            onClick={props.squareClicked}

            style={Object.assign(
                { border: "1px solid gray", flex: "1" },
                (props.challengeSelected) ? styles.selectedChallenge : null,
                (props.selected) ? styles.selectedSquare : null,
                (props.isSolved === true) ? styles.solvedSquare: null,
                (props.isQuestionSquare || !props.answerLetter) ? styles.questionSqaure : null,
            )}
        >
            {/* {props.number} */}
            {props.answerLetter}
            {props.currentLetter}
            
        </div >
    );

}

export default Square;




