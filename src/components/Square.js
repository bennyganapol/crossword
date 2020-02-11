import React from 'react';

function Square(props) {
    const styles = {
        questionSqaure: {
            backgroundColor: "Lightgray",
            fontSize: "10px"
        },
        selectedSquare: {
            backgroundColor: "Yellow",
        },
        solvedSquare: {
            backgroundColor: "LightGreen",
        },
        selectedChallenge: {
            backgroundColor: "LightBlue",
        }
    }

    const getQuestion = () =>{
        if (props.isQuestionSquare && props.challenges && props.challenges.length > 0) {
            return props.challenges[0].question;
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
            {getQuestion()}
            {props.answerLetter}
            {props.currentLetter}
            
        </div >
    );

}

export default Square;




