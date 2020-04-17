import React, { useState } from 'react';
import {
  Form, Button, Container, Row, Col, Modal,
} from 'react-bootstrap';
import EditChallenge from './EditChallenge'

function EditArea(props) {
  const { boardData } = props;
  const [boardProperties, setBoardProperties] = useState({
    width: boardData.width,
    height: boardData.height,
  });
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

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
    if (props.onChallengesChanged) {
      props.onChallengesChanged(newChallenges);
    }
  }

  const onDeleteClicked = (challenge) => {
    const newChallenges = boardData.challenges.slice();
    delete newChallenges[challenge.id];
    if (props.onChallengesChanged) {
      props.onChallengesChanged(newChallenges);
    }
  }

  const addNewChallengeOnClick = () => {
    const newChallenge = {
      question: '',
      answer: '',
      direction: 'down',
    };
    const newChallenges = boardData.challenges.slice();
    newChallenges.unshift(newChallenge);

    if (props.onChallengesChanged) {
      props.onChallengesChanged(newChallenges);
    }
  }

  const deleteAllChallengesApproved = () => {
    setShowDeleteAllModal(false)
    if (props.onChallengesChanged) {
      props.onChallengesChanged([]);
    }
  }

  const isChallengSelected = (challengeId) => challengeId === props.selectedChallengeId

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
          <div>
            <Button variant="primary" onClick={addNewChallengeOnClick} size="sm">New</Button>
            {' '}
            <Button variant="primary" onClick={() => setShowDeleteAllModal(true)} size="sm">Delete all</Button>
          </div>
          <div className="edit-area-challenges">
            {
              boardData.challenges.map((challenge) => (
                <EditChallenge
                  key={challenge.id}
                  isSelected={isChallengSelected(challenge.id)}
                  challenge={challenge}
                  onChallengeClicked={() => onChallengeClicked(challenge.id)}
                  onChallengeDoneEdit={onChallengeDoneEdit}
                  onDeleteClicked={onDeleteClicked}
                  horizontalDirection={boardData.horizontalDirection}
                  boardLatestEvent={props.boardLatestEvent}
                />
              ))
            }
          </div>
          <Modal show={showDeleteAllModal} onHide={() => setShowDeleteAllModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Delete all challenges</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete all challenges?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDeleteAllModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={deleteAllChallengesApproved}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}

export default EditArea;
