import React from 'react';

function Square(props) {
    const styles = {
        questionSqaure: {
            backgroundColor: "Lightgray",
        },
        selectedSquare: {
            backgroundColor: "LightGreen",
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
                (props.isQuestionSquare) ? styles.questionSqaure : null,
            )}
        >
            {/* {props.number} */}
            {props.letter}
        </div >
    );

}

export default Square;




