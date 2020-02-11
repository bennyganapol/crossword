import Square from "../components/Square";

export const getChallenges = () => {
    const challenges =
        [
            { question: "Where", answer: "here", x: 2, y: 1, questionX: 1, questionY: 1, direction: 'right' },
            { question: "would you", answer: "yes", x: 2, y: 2, questionX: 1, questionY: 2, direction: 'right' },
            { question: "really", answer: "maybe", x: 3, y: 5, questionX: 3, questionY: 4, direction: 'down' },
            { question: "who", answer: "man", x: 2, y: 6, questionX: 1, questionY: 6, direction: 'right' },
            { question: "something to smoke", answer: "weed", x: 3, y: 0, questionX: 4, questionY: 0, direction: 'down' },

        ];
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
    
    if(direction === 'down'){
        if (questionX == x) {
            arrowType = 'down';
        }
        else if (questionX < x) {
            arrowType = 'rightDown';
        }
        else{
            arrowType = 'leftDown';
        }
    }
    else if(direction === 'left'){
        if (questionY == y) {
            arrowType = 'left';
        }
        else if (questionY > y) {
            arrowType = 'downLeft';
        }
        else{
            arrowType = 'upLeft';
        }
    }
    else if(direction === 'right'){
        if (questionY == y) {
            arrowType = 'right';
        }
        else if (questionY > y) {
            arrowType = 'downRight';
        }
        else{
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

export const getNextSquare = (squares, squareId, direction, ) => {
    const currentSquare = squares[squareId];
    let x = currentSquare.x;
    let y = currentSquare.y;
    switch (direction) {
        case 'left':
            x -= 1
            break;
        case 'right':
            x += 1;
            break;
        case 'down':
            y += 1;
            break;
        case 'up':
            y -= 1;
            break;
        default:
            break;
    }

    const nextSquare = getSquare(squares, x, y);

    return (nextSquare && nextSquare.answerLetter) ? nextSquare.id : null;
}

export const getSquare = (squares, x, y, boardWidth, boardHeight) => {
    if (boardWidth && boardHeight) {
        return squares[(y * boardWidth) + x];
    }

    else return squares.find(square => square.x === x && square.y === y)
}
