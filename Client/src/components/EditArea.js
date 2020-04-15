import React, { useState } from 'react';
import {
  Form, Button, Container, Row, Col,
} from 'react-bootstrap';
import EditChallenge from './EditChallenge'

function EditArea(props) {
  const { boardData } = props;
  const [boardProperties, setBoardProperties] = useState({
    width: boardData.width,
    height: boardData.height,
  });
  // const [challenges, setChallenges] = useState(boardData.challenges);

  const getCurrentBoardData = () => {
    const currentBoardData = props.boardData;
    // currentBoardData.challenges = boardData.challenges;
    currentBoardData.width = boardProperties.width;
    currentBoardData.height = boardProperties.height;

    return currentBoardData;
  }

  const refreshBoard = () => {
    if (props.refreshBoard) {
      const currentBoardData = getCurrentBoardData();
      props.refreshBoard(currentBoardData);
    }
  }

  const previewOnClick = () => {
    refreshBoard();
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

  const onChallengeDoneEdit = (challenge) => {
    const newChallenges = boardData.challenges.slice();
    newChallenges[challenge.id] = challenge;
    // setChallenges(newChallenges);
    if (props.onChallengesChanged) {
      props.onChallengesChanged(newChallenges);
    }
  }

  const onDeleteClicked = (challenge) => {
    const newChallenges = boardData.challenges.slice();
    delete newChallenges[challenge.id];
    // setChallenges(newChallenges);
    if (props.onChallengesChanged) {
      props.onChallengesChanged(newChallenges);
    }
  }

  // const onEditChallengeClicked = (e) => {
  //   e.stopPropagation();
  //   // eslint-disable-next-line no-alert
  //   alert('editTest');
  // }

  return (
    <>
      {boardProperties && (
        <>
          <div className="edit-area-title-1">Edit area</div>
          <div>
            <Button variant="primary" onClick={previewOnClick} size="sm">Preview</Button>
          </div>
          <div className="edit-area-title-2">Board properties</div>
          <Container>
            <Row>
              <Col sm={4}>Board type:</Col>
              <Col sm={8}>{boardData.type}</Col>
            </Row>
            <Row>
              <Col sm={4}>Board direction:</Col>
              <Col sm={8}>{boardData.horizontalDirection}</Col>
            </Row>

            <Row>
              <Col sm={4}>Width:</Col>
              <Col sm={1}>{boardProperties.width}</Col>
              <Col sm={7}>
                <Form.Control type="range" value={boardProperties.width} onChange={widthRangeOnChange} custom min={1} max={20} />
              </Col>
            </Row>
            <Row>
              <Col sm={4}>Height:</Col>
              <Col sm={1}>{boardProperties.height}</Col>
              <Col sm={7}>
                <Form.Control type="range" value={boardProperties.height} onChange={heightRangeOnChange} custom min={1} max={20} />
              </Col>
            </Row>

          </Container>


          <div className="edit-area-title-2">Challenges</div>


          <div className="edit-area-challenges">
            {
              boardData.challenges.map((challenge) => (
                <EditChallenge
                  challenge={challenge}
                  onChallengeClicked={() => onChallengeClicked(challenge.id)}
                  onChallengeDoneEdit={onChallengeDoneEdit}
                  onDeleteClicked={onDeleteClicked}
                  horizontalDirection={boardData.horizontalDirection}
                />
              ))
            }
          </div>
        </>
      )}
    </>
  );
}

export default EditArea;
