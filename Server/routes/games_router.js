/* eslint-disable no-console */
import express from 'express';

export const gamesRouter = express.Router();

gamesRouter.post('/', async (req, res) => {
  try {
    const boardData = {
      type: '2',
      horizontalDirection: 'rtl',
      width: 13,
      height: 13,
      challenges: [
        { question: "מבנייני הפועל בדקדוק ", answer: "קל", x: 3, y: 8, questionX: 3, questionY: 7, direction: 'down' },
        { question: "חודש", answer: "ירח", x: 8, y: 6, questionX: 8, questionY: 5, direction: 'down' },
        { question: "זוג עצמות בפנים", answer: "לסת", x: 1, y: 6, questionX: 1, questionY: 5, direction: 'down' },
        { question: "משירי אריאל זילבר", answer: "שמש שמש", x: 11, y: 3, questionX: 12, questionY: 3, direction: 'down' },
        { question: "טלה", answer: "שה", x: 10, y: 4, questionX: 10, questionY: 3, direction: 'down' },
        { question: "נוזל לציפורניים", answer: "לק", x: 0, y: 0, questionX: 1, questionY: 0, direction: 'down' },
        { question: "בירת מלטה", answer: "ולטה", x: 1, y: 1, questionX: 1, questionY: 0, direction: 'down' },
        { question: "אחד המקשים במקלדת", answer: "טאב", x: 2, y: 1, questionX: 2, questionY: 0, direction: 'down' },
        { question: "אות יוונית", answer: "קסי", x: 3, y: 0, questionX: 4, questionY: 0, direction: 'down' },
        { question: "גם כן", answer: "נמי", x: 5, y: 1, questionX: 5, questionY: 0, direction: 'down' },
        { question: "זכרונו לברכה ר\"ת", answer: "זל", x: 6, y: 1, questionX: 6, questionY: 0, direction: 'down' },
        { question: "עיר ההימורים בארהב", answer: "לאס וגאס", x: 7, y: 1, questionX: 7, questionY: 0, direction: 'down' },
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
        { question: "אפר חם שנותרו בו גיצים, גחלת", answer: "רמצ", x: 8, y: 10, questionX: 8, questionY: 9, direction: 'down' },
        { question: "סנטימטר ר\"ת", answer: "סמ", x: 9, y: 11, questionX: 9, questionY: 10, direction: 'down' },
        { question: "תקלה בתוכנת מחשב", answer: "באג", x: 11, y: 10, questionX: 11, questionY: 9, direction: 'down' },

        { question: "עיר בפולין", answer: "ירוסלב", x: 7, y: 9, questionX: 8, questionY: 9, direction: 'left' },
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
        { question: "תואר לשחמטאי", answer: "רב אמן", x: 8, y: 10, questionX: 9, questionY: 10, direction: 'left' },
        { question: "מחודשי השנה", answer: "שבט", x: 12, y: 10, questionX: 12, questionY: 9, direction: 'left' },
        { question: "בן מעמד אצולה גרמני", answer: "יונקר", x: 4, y: 11, questionX: 5, questionY: 11, direction: 'left' },
        { question: "חבר", answer: "אנסמבל", x: 11, y: 11, questionX: 12, questionY: 11, direction: 'left' },
        { question: "צאצא ממין זכר", answer: "בן", x: 1, y: 12, questionX: 2, questionY: 12, direction: 'left' },
        { question: "מוסרי", answer: "אתי", x: 5, y: 12, questionX: 6, questionY: 12, direction: 'left' },
        { question: "מאכל בליל הסדר", answer: "מצה", x: 9, y: 12, questionX: 10, questionY: 12, direction: 'left' },
        { question: "סמל צבאי", answer: "תג", x: 12, y: 12, questionX: 12, questionY: 11, direction: 'left' },

        { questionType: "image", answer: "ירדן הראל", x: 6, y: 4, questionX: 5, questionY: 4, imageX: 5, imageY: 4, direction: 'down', imageId: '1' },
        { questionType: "image", answer: "הראל מויאל", x: 9, y: 2, questionX: 10, questionY: 2, imageX: 12, imageY: 0, direction: 'left', imageId: '2' },
      ]
    };
    const response = {
      boardData: boardData
    };
    res.json(response);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

