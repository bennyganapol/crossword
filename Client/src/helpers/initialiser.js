/* eslint no-param-reassign: ["error", { "props": false }] */
import axios from 'axios';
import { Img1, Img2 } from '../Images/img1'

export const getBoardData = async (boardId) => {
  const res = await axios.post(`${window.location.protocol}//${window.location.hostname}:4000/games/${boardId}`);
  const { boardData } = res.data;
  const { challenges } = boardData;

  for (let i = 0; i < challenges.length; i += 1) {
    if (!challenges[i].id) {
      challenges[i].id = i;
    }
  }
  return boardData;
}

export const mapLetter = (letter) => {
  let returnMappedLetter = letter;

  const lettersMapping = {
    ן: 'נ',
    ם: 'מ',
    ץ: 'צ',
    ף: 'פ',
    ך: 'כ',
  };

  if (lettersMapping[letter]) {
    returnMappedLetter = lettersMapping[letter];
  }

  return returnMappedLetter;
}

const trySortSquareChallenges = (questionSquare) => {
  if (questionSquare.challenges && questionSquare.challenges.length > 1) {
    const arrowTypeOrder = [];
    arrowTypeOrder.upRight = 0;
    arrowTypeOrder.upLeft = 0;
    arrowTypeOrder.left = 1;
    arrowTypeOrder.right = 1;
    arrowTypeOrder.leftDown = 2;
    arrowTypeOrder.rightDown = 2;
    arrowTypeOrder.downLeft = 3;
    arrowTypeOrder.downRight = 3;
    arrowTypeOrder.down = 4;

    if (arrowTypeOrder[questionSquare.challenges[0].arrowType] > arrowTypeOrder[questionSquare.challenges[1].arrowType]) {
      questionSquare.challenges = [questionSquare.challenges[1], questionSquare.challenges[0]];
    }
  }
}

const getChallengeArrowType = (questionX, questionY, x, y, direction) => {
  let arrowType = '';

  if (direction === 'down') {
    if (questionX === x) {
      arrowType = 'down';
    } else if (questionX < x) {
      arrowType = 'rightDown';
    } else {
      arrowType = 'leftDown';
    }
  } else if (direction === 'left') {
    if (questionY === y) {
      arrowType = 'left';
    } else if (questionY < y) {
      arrowType = 'downLeft';
    } else {
      arrowType = 'upLeft';
    }
  } else if (direction === 'right') {
    if (questionY === y) {
      arrowType = 'right';
    } else if (questionY > y) {
      arrowType = 'downRight';
    } else {
      arrowType = 'upRight';
    }
  }

  return arrowType;
}

const handleWhiteSpacesAndMultiword = (challenge) => {
  if (challenge.answer) {
    // Triming and spliting by spaces
    const answerParts = challenge.answer.split(/(\s+)/).filter((e) => e.trim().length > 0);
    if (answerParts.length > 1) {
      challenge.multi = answerParts.map((part) => part.length);
    }
    challenge.answer = answerParts.join(' '); // This is the full answer (with spaces).
    challenge.boardAnswer = answerParts.join(''); // This is the on board answer, spaces removed and letter will be mapped.
  }
}

export const getSquare = (squares, x, y, boardWidth, boardHeight) => {
  if (boardWidth && boardHeight) {
    return squares[(y * boardWidth) + x];
  }

  return squares.find((square) => square.x === x && square.y === y)
}

export const getChallengeSquares = (squares, challenge) => {
  const returnSquares = [];
  if (challenge.boardAnswer) {
    for (let index = 0; index < challenge.boardAnswer.length; index += 1) {
      let { x } = challenge;
      let { y } = challenge;
      switch (challenge.direction) {
        case 'left':
          x -= (index);
          break;
        case 'right':
          x += (index);
          break;
        case 'down':
          y += (index);
          break;
        case 'up':
          y -= (index);
          break;
        default:
          break;
      }
      const newSquare = getSquare(squares, x, y);
      if (newSquare) {
        returnSquares.push(newSquare);
      }
    }
  }

  return returnSquares;
}

export const getSquares = (challenges, boardWidth, boardHeight) => {
  const squares = [];

  for (let y = 0; y < boardHeight; y += 1) {
    for (let x = 0; x < boardWidth; x += 1) {
      squares.push({
        id: (y * boardWidth) + x,
        x,
        y,
        challenges: [],
      });
    }
  }
  challenges.forEach((challenge) => {
    // Set question square for challenge
    handleWhiteSpacesAndMultiword(challenge);

    if (challenge.questionX != null && challenge.questionY != null) {
      const questionSquare = getSquare(squares, challenge.questionX, challenge.questionY, boardWidth, boardHeight);
      if (questionSquare) {
        questionSquare.isQuestionSquare = true;
        // if (challenge.imageId) {
        //     questionSquare.image = Img1;
        // }

        challenge.arrowType = getChallengeArrowType(challenge.questionX, challenge.questionY, challenge.x, challenge.y, challenge.direction);
        questionSquare.challenges.push(challenge);
        trySortSquareChallenges(questionSquare);
      }
    }

    // Set image square for image challenges
    if (challenge.imageX != null && challenge.imageY != null) {
      const imageSquare = getSquare(squares, challenge.imageX, challenge.imageY, boardWidth, boardHeight);
      if (imageSquare) {
        imageSquare.isQuestionSquare = true;

        if (challenge.imageId === '1') {
          imageSquare.image = Img1;
        } else if (challenge.imageId === '2') {
          imageSquare.image = Img2;
        }

        // challenge.arrowType = getChallengeArrowType(challenge.questionX, challenge.questionY, challenge.x, challenge.y, challenge.direction);
        if (challenge.questionX !== challenge.imageX && challenge.questionY && challenge.imageX) {
          imageSquare.challenges.push(challenge);
          trySortSquareChallenges(imageSquare);
        }
      }
    }


    // Set answer squares for challenge
    const challengeSquares = getChallengeSquares(squares, challenge);
    for (let i = 0; i < challengeSquares.length; i += 1) {
      const currentSquare = challengeSquares[i];
      if (currentSquare) {
        currentSquare.answerLetter = mapLetter(challenge.boardAnswer[i]);
        currentSquare.challenges.push(challenge);
      }
    }
  });

  return squares;
}


export const getNextSquare = (squares, squareId, direction, nextSize = 1) => {
  const currentSquare = squares[squareId];
  if (!currentSquare) {
    return null;
  }
  let { x } = currentSquare;
  let { y } = currentSquare;
  switch (direction) {
    case 'left':
      x -= nextSize;
      break;
    case 'right':
      x += nextSize;
      break;
    case 'down':
      y += nextSize;
      break;
    case 'up':
      y -= nextSize;
      break;
    default:
      break;
  }

  const nextSquare = getSquare(squares, x, y);

  return (nextSquare && nextSquare.answerLetter) ? nextSquare.id : squareId;
}
