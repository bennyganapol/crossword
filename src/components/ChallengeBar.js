import React, { useState, useEffect } from 'react';


function ChallengeBar(props) {

    return (
        <div>
            <div>{props.selectedChallenge.question}</div>
            <div>{props.challengeSquares.map(square => square.answerLetter)}</div>
        </div>
    );
}


export default ChallengeBar;
