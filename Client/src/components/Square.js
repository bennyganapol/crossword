/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  FiArrowRight, FiArrowLeft, FiArrowDown, FiCornerDownLeft, FiCornerLeftDown, FiCornerRightDown, FiCornerUpLeft,
} from 'react-icons/fi';

function Square(props) {
  const styles = {
    questionSqaure: {
      backgroundColor: 'Lightgray',
      fontSize: '10px',
    },
    selectedSquare: {
      backgroundColor: 'Yellow',
    },
    solvedSquare: {
      backgroundColor: 'LightGreen',
    },
    selectedChallenge: {
      backgroundColor: 'LightBlue',
    },
    splittedSquare: {
      flexDirection: 'column',
    },
  }


  const getLetter = () => {
    let letterSpan = null;
    if (props.editMode === true) {
      letterSpan = <span style={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.2)' }}>{props.answerLetter}</span>;
    } else if (props.currentLetter) {
      letterSpan = <span style={{ fontWeight: 'bold' }}>{props.currentLetter}</span>;
    } else if (props.otherPlayersLetter && !props.challengeSelected && !props.selected) {
      letterSpan = <span style={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.2)' }}>{props.otherPlayersLetter}</span>;
    }
    return letterSpan;
  }

  const getArrow = (arrowType) => {
    let arrow = null;
    switch (arrowType) {
      case 'right':
        arrow = (
          <FiArrowRight style={{
            position: 'absolute', zIndex: '10', fontSize: '20px', marginLeft: '50%', left: '45%',
          }}
          />
        )
        break;
      case 'left':
        arrow = (
          <FiArrowLeft style={{
            position: 'absolute', zIndex: '10', fontSize: '20px', marginRight: '50%', right: '45%',
          }}
          />
        )
        break;
      case 'down':
        arrow = (
          <FiArrowDown style={{
            position: 'absolute', zIndex: '10', fontSize: '20px', marginTop: '50%', top: '45%',
          }}
          />
        )
        break;
      case 'rightDown':
        arrow = (
          <FiCornerRightDown style={{
            position: 'absolute', zIndex: '10', fontSize: '20px', marginLeft: '50%', left: '45%',
          }}
          />
        )
        break;
      case 'leftDown':
        arrow = (
          <FiCornerLeftDown style={{
            position: 'absolute', zIndex: '10', fontSize: '20px', marginRight: '50%', right: '45%',
          }}
          />
        )
        break;
      case 'downLeft':
        arrow = (
          <FiCornerDownLeft style={{
            position: 'absolute', zIndex: '10', fontSize: '20px', marginTop: '50%', top: '45%',
          }}
          />
        )
        break;
      case 'upLeft':
        arrow = (
          <FiCornerUpLeft style={{
            position: 'absolute', zIndex: '10', fontSize: '20px', marginBottom: '50%', bottom: '45%',
          }}
          />
        )
        break;

      default:
        break;
    }
    return arrow;
  }

  const getMultiWordPart = (challenge) => {
    let multiWordPart = null;
    if (challenge.multi) {
      multiWordPart = ' (';
      const multiwordArray = challenge.multi.slice();
      if (props.horizontalDirection === 'rtl') {
        multiwordArray.reverse();
      }

      multiWordPart += multiwordArray.join(',');
      multiWordPart += ') ';
    }
    return multiWordPart;
  }

  const getQuestion = () => {
    let questionContent = null;
    if (props.isQuestionSquare && props.challenges && props.challenges.length > 0) {
      if (props.challenges.length === 1) {
        questionContent = (
          <>
            {getArrow(props.challenges[0].arrowType)}
            {props.challenges[0].question}
            {getMultiWordPart(props.challenges[0])}
          </>
        )
      } else {
        questionContent = (
          <>
            <div style={{
              display: 'flex', flex: '1', alignItems: 'center', justifyContent: 'center', width: '100%', borderBottom: '1px solid gray',
            }}
            >
              {getArrow(props.challenges[0].arrowType)}
              {props.challenges[0].question}
              {getMultiWordPart(props.challenges[0])}
            </div>
            <div style={{
              display: 'flex', flex: '1', alignItems: 'center', justifyContent: 'center', width: '100%',
            }}
            >
              {getArrow(props.challenges[1].arrowType)}
              {props.challenges[1].question}
              {getMultiWordPart(props.challenges[1])}
            </div>
          </>
        );
      }
    }
    return questionContent;
  }

  const onContextMenuHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.squareRightClicked) {
      props.squareRightClicked();
    }
  }

  return (
    <div
      onClick={props.squareClicked}
      onContextMenu={onContextMenuHandler}
      title={props.editMode ? `x:${props.x} y: ${props.y}` : ''}
      style={({
        border: '1px solid gray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '1',
        position: 'relative',
        ...((props.challengeSelected) ? styles.selectedChallenge : null),
        ...((props.isSolved === true) ? styles.solvedSquare : null),
        ...((props.isQuestionSquare || !props.answerLetter) ? styles.questionSqaure : null),
        ...((props.selected) ? styles.selectedSquare : null),
        ...((props.challenges && props.challenges.length >= 2 && props.isQuestionSquare) ? styles.splittedSquare : null),
      })}
    >
      {props.image && (
        <div
          onClick={props.squareClicked}
          style={{
            position: 'absolute', width: '178px', height: '178px', right: '0px', top: '0px', zIndex: '20',
          }}
        >
          <img alt="c" src={props.image} style={{ width: '178px', height: '178px' }} />
        </div>
      )}

      {getQuestion()}
      {getLetter()}


    </div>
  );
}

export default Square;
