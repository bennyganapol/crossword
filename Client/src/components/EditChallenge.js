import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function EditChallenge(props) {
  const { challenge, horizontalDirection, isSelected } = props;
  const [editMode, setEditMode] = useState(false);
  const [newChallenge, setNewChallenge] = useState(challenge);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const onChallengeClicked = (id) => {
    if (props.onChallengeClicked) {
      props.onChallengeClicked(id);
    }
  };

  const onEditClicked = (e) => {
    e.stopPropagation();
    setEditMode(true);
  };

  const onDoneClicked = (e) => {
    e.stopPropagation();
    setEditMode(false);
    if (props.onChallengeDoneEdit) {
      props.onChallengeDoneEdit(newChallenge);
    }
  };

  const onDeleteClicked = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  }

  const onDeleteApproved = () => {
    setShowDeleteModal(false);
    setEditMode(false);
    if (props.onDeleteClicked) {
      props.onDeleteClicked(challenge);
    }
  }

  const onCancelClicked = (e) => {
    e.stopPropagation();
    setNewChallenge(challenge)
    setEditMode(false);
  }

  const handleChange = (e) => {
    let newValue = e.target.value;
    if (e.target.name === 'x' || e.target.name === 'y' || e.target.name === 'questionX' || e.target.name === 'questionY') {
      // eslint-disable-next-line radix
      newValue = parseInt(e.target.value);
      if (!newValue) {
        newValue = '';
      }
    }
    setNewChallenge({ ...newChallenge, [e.target.name]: newValue });
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  }

  useEffect(() => {
    setNewChallenge(challenge);
  }, [challenge]);

  return (
    <>
      {editMode !== true
        && (
          <div
            id={`editchallenge${challenge.id}`}
            className={`edit-area-challenge ${isSelected ? 'selected-challenge' : ''}`}
            role="button"
            tabIndex={0}
            onClick={() => onChallengeClicked(challenge.id)}
          >
            <div className="edit-challenge-location">
              <Button variant="primary" onClick={onEditClicked} size="sm">Edit</Button>
            </div>
            <div className="edit-challenge-question">{challenge.question}</div>
            <div className="edit-challenge-answer">{challenge.answer}</div>
            <div className="edit-challenge-location">{challenge.direction}</div>
          </div>
        )}
      {editMode === true
        && (
          <Form>
            <div className={`edit-area-challenge editMode ${isSelected ? 'selected-challenge' : ''}`} id={`editchallenge${challenge.id}`}>
              <div className="edit-challenge-location">
                <Button variant="primary" onClick={onDoneClicked} size="sm">Done</Button>
                <Button variant="danger" onClick={onDeleteClicked} size="sm">Delete</Button>
                <Button variant="secondary" onClick={onCancelClicked} size="sm">Cancel</Button>
              </div>
              <div className="edit-challenge-question">
                <Form.Control name="question" onChange={handleChange} value={newChallenge.question} size="sm" />
              </div>
              <div className="edit-challenge-answer">
                <Form.Control name="answer" onChange={handleChange} value={newChallenge.answer} size="sm" />
              </div>
              <div className="edit-challenge-location">
                <Form.Control as="select" name="direction" value={newChallenge.direction} onChange={handleChange} size="sm" custom>
                  <option value="down">Down</option>
                  {horizontalDirection === 'ltr' && <option value="right">Right</option>}
                  {horizontalDirection === 'rtl' && <option value="left">Left</option>}
                </Form.Control>
                <div>
                  <Form.Control id="editX" name="x" onChange={handleChange} value={newChallenge.x} size="sm" />
                  <Form.Control id="editY" name="y" onChange={handleChange} value={newChallenge.y} size="sm" />
                </div>
                <div>
                  <Form.Control id="questionX" name="questionX" onChange={handleChange} value={newChallenge.questionX} size="sm" />
                  <Form.Control id="questionY" name="questionY" onChange={handleChange} value={newChallenge.questionY} size="sm" />
                </div>
              </div>
            </div>
          </Form>
        )}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete challenge</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this challenge?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onDeleteApproved}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditChallenge;
