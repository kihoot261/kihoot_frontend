// placeholder until backend solved
export default function configureGame(kyu, time, mode) {
    console.log(kyu, time, mode);
    return {
        questions: [
            {
                question: "what is this posture? (fudo dachi)", // esto sera la imagen en un futuro
                answers: [
                    "fudo-dachi",
                    "seiza",
                    "seiken-jodan-uke",
                    "morote-tsuki-gedan",
                ],
                correctAnswer: "fudo-dachi",
            },
            {
                question: "what is this posture? (seiza)",
                answers: [
                    "zenkutsu-dachi",
                    "yoi-dachi",
                    "seiza",
                    "seiken-oi-tsuki-jodan",
                ],
                correctAnswer: "seiza",
            },
            {
                question: "what is this posture? (zenkutsu dachi)",
                answers: [
                    "kin-geri",
                    "zenkutsu-dachi",
                    "hiza-ganmen-geri",
                    "seiza",
                ],
                correctAnswer: "zenkutsu-dachi",
            },
            {
                question: "what is this posture? (seiken oi tsuki jodan)",
                answers: [
                    "seiken-oi-tsuki-gedan",
                    "seiken-oi-tsuki-chudan",
                    "seiken-oi-tsuki-jodan",
                    "seiken-mae-gedan-barai",
                ],
                correctAnswer: "seiken-oi-tsuki-jodan",
            },
        ]
    }
}