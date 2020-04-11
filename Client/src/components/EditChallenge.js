import React, { useState, useEffect, useRef, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';


function EditChallenge(props) {

    // const [challenges, setChallenges] = useState();

    const onChallengeClicked = (id) => {
        if (props.onChallengeClicked) {
            props.onChallengeClicked(id);
        }
    }
    const editTest = (e) => {
        e.stopPropagation();
        alert('editTest');
    }

    return (
        <div className="edit-area-challenge" onClick={() => onChallengeClicked(props.challenge.id)}>
            <div className="edit-challenge-location"><Button variant="primary" onClick={editTest} size="sm">Edit</Button></div>
            <div className="edit-challenge-question">{props.challenge.question}</div>
            <div className="edit-challenge-answer">{props.challenge.answer}</div>
            <div className="edit-challenge-location">x:{props.challenge.x} y:{props.challenge.y}</div>
            <div className="edit-challenge-location">x:{props.challenge.questionX} y:{props.challenge.questionY}</div>
        </div>
    );
}

export default EditChallenge;



