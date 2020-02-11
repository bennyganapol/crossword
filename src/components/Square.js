import React from 'react';
import { FiArrowRight, FiArrowLeft, FiArrowDown, FiCornerDownLeft, FiCornerDownRight, FiCornerLeftDown, FiCornerRightDown, FiCornerUpLeft, FiCornerUpRight } from "react-icons/fi";

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

    const getQuestion = () => {
        if (props.isQuestionSquare && props.challenges && props.challenges.length > 0) {
            return props.challenges[0].question;
        }
    }



    return (
        <div
            onClick={props.squareClicked}

            style={Object.assign(
                { border: "1px solid gray", flex: "1", position: "relative" },
                (props.challengeSelected) ? styles.selectedChallenge : null,
                (props.selected) ? styles.selectedSquare : null,
                (props.isSolved === true) ? styles.solvedSquare : null,
                (props.isQuestionSquare || !props.answerLetter) ? styles.questionSqaure : null,
            )}
        >
            {props.arrowType === 'right' &&
                <div style={{ position: "absolute", fontSize:"20px", left: "60%", top:"40%", backgroundColor: "", height: "100%", width: "100%" }} >
                    <FiArrowRight style={{position: "relative", zIndex: "10"}} />
                </div>
            }
            {props.arrowType === 'left' &&
                <div style={{ position: "absolute", fontSize:"20px", left: "50%", top:"50%", backgroundColor: "", height: "100%", width: "100%" }} >
                    <FiArrowLeft style={{position: "relative", zIndex: "10"}} />
                </div>
            }
            {props.arrowType === 'down' &&
                <div style={{ position: "absolute", fontSize:"20px", top:"90%", backgroundColor: "", height: "100%", width: "100%" }} >
                    <FiArrowDown style={{position: "relative", zIndex: "10"}} />
                </div>
            }
            {props.arrowType === 'rightDown' &&
                <div style={{ position: "absolute", fontSize:"20px", left: "60%", top:"20%", backgroundColor: "", height: "100%", width: "100%" }} >
                    <FiCornerRightDown style={{position: "relative", zIndex: "10"}} />
                </div>
            }
            {props.arrowType === 'leftDown' &&
                <div style={{ position: "absolute", fontSize:"20px", left: "-60%", top:"20%", backgroundColor: "", height: "100%", width: "100%" }} >
                    <FiCornerLeftDown style={{position: "relative", zIndex: "10"}} />
                </div>
            }

            {getQuestion()}
            {props.answerLetter}
            {props.currentLetter}
            
        </div >
    );

}

export default Square;




