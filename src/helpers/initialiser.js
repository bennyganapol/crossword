import { Img1 } from '../Images/img1'

export const getChallenges = () => {
    const challenges =
        [
            { question: "מבנייני הפועל בדקדוק ", answer: "קל", x: 3, y: 8, questionX: 3, questionY: 7, direction: 'down' },
            { question: "חודש", answer: "ירח", x: 8, y: 6, questionX: 8, questionY: 5, direction: 'down' },
            { question: "זוג עצמות בפנים", answer: "לסת", x: 1, y: 6, questionX: 1, questionY: 5, direction: 'down' },
            { question: "משירי אריאל זילבר", answer: "שמששמש", x: 11, y: 3, questionX: 12, questionY: 3, direction: 'down' },
            { question: "טלה", answer: "שה", x: 10, y: 4, questionX: 10, questionY: 3, direction: 'down' },
            { question: "נוזל לציפורניים", answer: "לק", x: 0, y: 0, questionX: 1, questionY: 0, direction: 'down' },
            { question: "בירת מלטה", answer: "ולטה", x: 1, y: 1, questionX: 1, questionY: 0, direction: 'down' },
            { question: "אחד המקשים במקלדת", answer: "טאב", x: 2, y: 1, questionX: 2, questionY: 0, direction: 'down' },
            { question: "אות יוונית", answer: "קסי", x: 3, y: 0, questionX: 4, questionY: 0, direction: 'down' },
            { question: "גם כן", answer: "נמי", x: 5, y: 1, questionX: 5, questionY: 0, direction: 'down' },
            { question: "זכרונו לברכה", answer: "זל", x: 6, y: 1, questionX: 6, questionY: 0, direction: 'down' },
            { question: "עיר ההימורים בארהב", answer: "לאסוגאס", x: 7, y: 1, questionX: 7, questionY: 0, direction: 'down' },
            { question: "מין עוף טרופי", answer: "קורול", x: 8, y: 0, questionX: 9, questionY: 0, direction: 'down' },
            { question: "קידומת הולנדית", answer: "ון", x: 4, y: 2, questionX: 4, questionY: 1, direction: 'down' },
            { question: "מחשבה", answer: "הרהור", x: 9, y: 2, questionX: 9, questionY: 1, direction: 'down' },
            { question: "תמים", answer: "נאיבי", x: 0, y: 3, questionX: 0, questionY: 2, direction: 'down' },
            { question: "אם כן", answer: "ובכן", x: 2, y: 8, questionX: 2, questionY: 7, direction: 'down' },
            { question: "מיכל כדורים בכלי ירי", answer: "מחסנית", x: 4, y: 7, questionX: 5, questionY: 7, direction: 'down' },
            { question: "סיום", answer: "תומ", x: 5, y: 8, questionX: 5, questionY: 7, direction: 'down' },
            { question: "טלוויזיה בלווין", answer: "יס", x: 9, y: 8, questionX: 9, questionY: 7, direction: 'down' },
            { question: "דברן", answer: "פטפטן", x: 10, y: 7, questionX: 10, questionY: 6, direction: 'down' },
            { question: "נוטה להתפשר", answer: "ותרן", x: 0, y: 9, questionX: 0, questionY: 8, direction: 'down' },
            { question: "חלק ברגל", answer: "עקב", x: 1, y: 10, questionX: 1, questionY: 9, direction: 'down' },
            { question: "אות באנגלית", answer: "וי", x: 3, y: 11, questionX: 3, questionY: 10, direction: 'down' },
            { question: "בכי מקוטע", answer: "יבבה", x: 7, y: 9, questionX: 7, questionY: 8, direction: 'down' },
            { question: "אפר חם שנותרו בו גיצים, גחלת", answer: "רמצ", x: 8, y: 10, questionX: 8, questionY:9, direction: 'down' },
            { question: "סנטימטר רת", answer: "סמ", x: 9, y: 11, questionX: 9, questionY: 10, direction: 'down' },
            { question: "תקלה בתוכנת מחשב", answer: "באג", x: 11, y: 10, questionX: 11, questionY: 9, direction: 'down' },

            { question: "עיר בפולין", answer: "ירוסלב", x: 7, y: 9, questionX: 8, questionY:9, direction: 'left' },
            { question: "רצועה, קו", answer: "פס", x: 10, y: 9, questionX: 11, questionY: 9, direction: 'left' },
            { question: "מרבד", answer: "שטיח", x: 11, y: 8, questionX: 12, questionY: 8, direction: 'left' },
            { question: "מעקב", answer: "התחקות", x: 6, y: 8, questionX: 7, questionY: 8, direction: 'left' },
            { question: "מסולם התווים", answer: "סי", x: 1, y: 7, questionX: 2, questionY: 7, direction: 'left' },
            { question: "מחסום לפי החיה", answer: "רסנ", x: 8, y: 7, questionX: 9, questionY: 7, direction: 'left' },
            { question: "מפקד פלוגה רת", answer: "מפ", x: 11, y: 7, questionX: 12, questionY: 7, direction: 'left' },
            { question: "בירת ערב הסעודית", answer: "ריאד", x: 9, y: 6, questionX: 10, questionY: 6, direction: 'left' },
            { question: "זז", answer: "מש", x: 12, y: 6, questionX: 12, questionY: 5, direction: 'left' },
            { question: "מעמד, מדרגה", answer: "שלב", x: 2, y: 6, questionX: 2, questionY: 5, direction: 'left' },
            { question: "מתגורר", answer: "גר", x: 7, y: 5, questionX: 8, questionY: 5, direction: 'left' },
            { question: "התעכבו, נשארו", answer: "שהו", x: 11, y: 5, questionX: 12, questionY: 5, direction: 'left' },
            { question: "אות בעברית", answer: "הא", x: 1, y: 4, questionX: 2, questionY: 4, direction: 'left' },
            { question: "מרמטכלי צהל", answer: "משה לוי", x: 11, y: 4, questionX: 12, questionY: 4, direction: 'left' },
            { question: "כרס", answer: "בטן", x: 2, y: 3, questionX: 3, questionY: 3, direction: 'left' },
            { question: "מטבע יפני", answer: "ין", x: 5, y: 3, questionX: 6, questionY: 3, direction: 'left' },
            { question: "אי געשי באנטרטיקה", answer: "רוס", x: 9, y: 3, questionX: 10, questionY: 3, direction: 'left' },
            { question: "עיר בהולנד", answer: "ולזן", x: 8, y: 1, questionX: 9, questionY: 1, direction: 'left' },
            { question: "מלאי", answer: "סטוק", x: 3, y: 1, questionX: 4, questionY: 1, direction: 'left' },
            { question: "עכשיו", answer: "כעת", x: 2, y: 10, questionX: 3, questionY: 10, direction: 'left' },
            { question: "תואר לשחמטאי", answer: "רבאמן", x: 8, y: 10, questionX: 9, questionY: 10, direction: 'left' },
            { question: "מחודשי השנה", answer: "שבט", x: 12, y: 10, questionX: 12, questionY: 9, direction: 'left' },
            { question: "בן מעמד אצולה גרמני", answer: "יונקר", x: 4, y: 11, questionX: 5, questionY: 11, direction: 'left' },
            { question: "חבר", answer: "אנסמבל", x: 11, y: 11, questionX: 12, questionY: 11, direction: 'left' },
            { question: "צאצא ממין זכר", answer: "בן", x: 1, y: 12, questionX: 2, questionY: 12, direction: 'left' },
            { question: "מוסרי", answer: "אתי", x: 5, y: 12, questionX: 6, questionY: 12, direction: 'left' },
            { question: "מאכל בליל הסדר", answer: "מצה", x: 9, y: 12, questionX: 10, questionY: 12, direction: 'left' },
            { question: "סמל צבאי", answer: "תג", x: 12, y: 12, questionX: 12, questionY: 11, direction: 'left' },
            
             { questionType:"image", answer: "ירדןהראל", x: 6, y: 4, questionX: 5, questionY: 4, direction: 'down', imageId: '0'},
             { questionType:"image", answer: "הראלמויאל", x: 9, y: 2, questionX: 12, questionY: 0, direction: 'left', imageId: '0'},
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
                challenge.arrowType = getChallengeArrowType(challenge.questionX, challenge.questionY, challenge.x, challenge.y, challenge.direction);
                questionSquare.arrowType = challenge.arrowType;
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
        else if (questionY < y) {
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
