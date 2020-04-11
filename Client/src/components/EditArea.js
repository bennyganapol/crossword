import React, { useState, useEffect, useRef, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import EditChallenge from './EditChallenge'

function EditArea(props) {

    const [boardProperties, setBoardProperties] = useState();
    const [challenges, setChallenges] = useState();


    const getCurrentBoardData = () => {
        const currentBoardData = props.boardData;
        currentBoardData.width = boardProperties.width;
        currentBoardData.height = boardProperties.height;

        return currentBoardData;
    }

    const previewOnClick = (e) => {
        if (props.previewOnClick) {
            const currentBoardData = getCurrentBoardData();
            props.previewOnClick(currentBoardData);
        }
    }

    const widthRangeOnChange = (e) => {
        setBoardProperties({ ...boardProperties, width: e.target.value })
    }

    const heightRangeOnChange = (e) => {
        setBoardProperties({ ...boardProperties, height: e.target.value })
    }

    const onChallengeClicked = (id) => {
        if (props.onChallengeClicked) {
            props.onChallengeClicked(id);
        }
    }
    const onEditChallengeClicked = (e) => {
        e.stopPropagation();
        alert('editTest');
    }



    useEffect(() => {
        setBoardProperties(
            {
                width: props.boardData.width,
                height: props.boardData.height
            }
        );
        setChallenges(props.boardData.challenges);
    }, []);

    return (
        <>
            {boardProperties &&
                <>
                    <div className="edit-area-title-1">Edit area</div >
                    <div>
                        <Button variant="primary" onClick={previewOnClick} size="sm">Preview</Button>
                    </div>
                    <div className="edit-area-title-2">Board properties</div>
                    <Container>
                        <Row>
                            <Col sm={4}>Board type:</Col>
                            <Col sm={8}>{props.boardData.type}</Col>
                        </Row>
                        <Row>
                            <Col sm={4}>Board direction:</Col>
                            <Col sm={8}>{props.boardData.horizontalDirection}</Col>
                        </Row>

                        <Row>
                            <Col sm={4}>Width:</Col>
                            <Col sm={1}>{boardProperties.width}</Col>
                            <Col sm={7}><Form.Control type="range" value={boardProperties.width} onChange={widthRangeOnChange} custom min={1} max={20} /></Col>
                        </Row>
                        <Row>
                            <Col sm={4}>Height:</Col>
                            <Col sm={1}>{boardProperties.height}</Col>
                            <Col sm={7}><Form.Control type="range" value={boardProperties.height} onChange={heightRangeOnChange} custom min={1} max={20} /></Col>
                        </Row>

                    </Container>


                    <div className="edit-area-title-2">Challenges</div>


                    <div className="edit-area-challenges">
                        {
                            challenges.map(challenge =>
                                <EditChallenge
                                onChallengeClicked={() => onChallengeClicked(challenge.id)}    
                                challenge={challenge}

                                
                                />
                                // <div className="edit-area-challenge" onClick={() => onChallengeClicked(challenge.id)}>
                                //     <div className="edit-challenge-location"><Button variant="primary" onClick={editTest} size="sm">Edit</Button></div>
                                //     <div className="edit-challenge-question">{challenge.question}</div>
                                //     <div className="edit-challenge-answer">{challenge.answer}</div>
                                //     <div className="edit-challenge-location">x:{challenge.x} y:{challenge.y}</div>
                                //     <div className="edit-challenge-location">x:{challenge.questionX} y:{challenge.questionY}</div>
                                // </div>
                            )
                        }
                    </div>


                </>
            }
        </>
    );
}

export default EditArea;



