const quizData = {
    questions: [
        {
            question: "what will <code>console.log('Hello World')</code> log to the console?",
            answers: [
                "'Hello World'",
                "Hello World",
                "String",
                "None of the above",
            ],
            correctAnswerIndex: 1,
        },
        {
            question: "what will <code>console.log(15)</code> log to the console?",
            answers: [
                "Number",
                "'15'",
                "15",
                "None of the above",
            ],
            correctAnswerIndex: 2,
        },
        {
            question: "what will <code>console.log(15 + 5)</code> log to the console?",
            answers: [
                "155",
                "'155'",
                "20",
                "'20'",
            ],
            correctAnswerIndex: 2,
        },
        {
            question: "what will <code>console.log('15 + 20')</code> log to the console?",
            answers: [
                "35",
                "1520",
                "'35'",
                "15 + 20",
            ],
            correctAnswerIndex: 3,
        },
    ]
}

export default quizData;