import {Img1} from '../Images/img1'

export const getChallenges = () => {
    const challenges =
        [
            
            { question: "שחקן גרמני", answer: "טוני", x: 7, y: 4, questionX: 8, questionY: 4, direction: 'left' },
            { question: "Where", answer: "here", x: 2, y: 1, questionX: 1, questionY: 1, direction: 'right' },
            { question: "would you", answer: "yes", x: 2, y: 2, questionX: 1, questionY: 2, direction: 'right' },
            { question: "really", answer: "maybe", x: 3, y: 5, questionX: 3, questionY: 4, direction: 'down' },
            { question: "who", answer: "man", x: 2, y: 6, questionX: 1, questionY: 6, direction: 'right' },
            { question: "something to smoke", answer: "weed", x: 3, y: 0, questionX: 4, questionY: 0, direction: 'down' },
            { questionType:"image", answer: "ירדןהראל", x: 9, y: 0, questionX: 8, questionY: 0, direction: 'down', imageId: '0'},
        ];
    for (let i = 0; i < challenges.length; i++) {
        challenges[i].id = i;
    }
    return challenges;
}

export const getSquares = (challenges, boardWidth, boardHeight) => {
    const squares = [];

    for (let y = 0; y < boardHeight; y++) {
        for (let x = 0; x < boardWidth; x++) {
            squares.push({
                id: (y * boardWidth) + x,
                x,
                y,
                challenges: [],
            });
        }
    }

    challenges.forEach(challenge => {

        if (challenge.questionX != null && challenge.questionY != null) {
            let questionSquare = getSquare(squares, challenge.questionX, challenge.questionY, boardWidth, boardHeight);
            if (questionSquare) {
                questionSquare.isQuestionSquare = true;
                if (challenge.imageId) {
                    questionSquare.image = Img1;
                }

                questionSquare.challenges.push(challenge);
                questionSquare.arrowType = getChallengeArrowType(challenge.questionX, challenge.questionY, challenge.x, challenge.y, challenge.direction);
            }
        }

        let challengeSquares = getChallengeSquares(squares, challenge);
        for (let i = 0; i < challengeSquares.length; i++) {
            let currentSquare = challengeSquares[i];
            if (currentSquare) {
                currentSquare.answerLetter = challenge.answer[i];
                currentSquare.challenges.push(challenge);
            }

        }
    });

    return squares;
}

const getChallengeArrowType = (questionX, questionY, x, y, direction) => {
    let arrowType = '';

    if (direction === 'down') {
        if (questionX === x) {
            arrowType = 'down';
        }
        else if (questionX < x) {
            arrowType = 'rightDown';
        }
        else {
            arrowType = 'leftDown';
        }
    }
    else if (direction === 'left') {
        if (questionY === y) {
            arrowType = 'left';
        }
        else if (questionY > y) {
            arrowType = 'downLeft';
        }
        else {
            arrowType = 'upLeft';
        }
    }
    else if (direction === 'right') {
        if (questionY === y) {
            arrowType = 'right';
        }
        else if (questionY > y) {
            arrowType = 'downRight';
        }
        else {
            arrowType = 'upRight';
        }
    }

    return arrowType;
}

export const getChallengeSquares = (squares, challenge) => {
    let returnSquares = [];
    for (let index = 0; index < challenge.answer.length; index++) {
        let x = challenge.x;
        let y = challenge.y;
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
        returnSquares.push(getSquare(squares, x, y));
    }
    return returnSquares;
}

export const getNextSquare = (squares, squareId, direction, nextSize = 1) => {
    const currentSquare = squares[squareId];
    if (!currentSquare) {
        return null;
    }
    let x = currentSquare.x;
    let y = currentSquare.y;
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

export const getSquare = (squares, x, y, boardWidth, boardHeight) => {
    if (boardWidth && boardHeight) {
        return squares[(y * boardWidth) + x];
    }

    else return squares.find(square => square.x === x && square.y === y)
}
