import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useConfigureGame } from '../../api/quizData';
import ReturnHome from '../../components/ReturnHome';
import Loading from '../../components/Loading';
import { useLocation, useNavigate } from 'react-router';
import RegularButton from '../../components/RegularButton';
import '../../styles/pages/_quiz.scss';
import RedCornerButton from '../../components/RedCornerButton';

function Quiz() {

    const [displayQuestion, setDisplayQuestion] = useState(0);
    const [displayAnswer, setDisplayAnswer] = useState(false);
    const [answerCorrect, setAnswerCorrect] = useState(false);
    const [amountCorrect, setAmountCorrect] = useState(0);
    const [amountIncorrect, setAmountIncorrect] = useState(0);
    const [clickable, setClickable] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const amountCorrectRef = useRef(0);
    const amountIncorrectRef = useRef(0);
    const location = useLocation();
    const { kyu, time, mode, questions, order } = location.state;

    const [seconds, setSeconds] = useState(time);
    const [isActive, setIsActive] = useState(true);

    const quizData = useConfigureGame(kyu, questions, order);

    const handleAnswer = useCallback((answer) => {
        setDisplayAnswer(true);
        setClickable(false);
        setInputValue('');
        if (quizData.questions[displayQuestion].correctAnswer === answer) {
            setAnswerCorrect(true);
            setAmountCorrect(prev => {
                const next = prev + 1;
                amountCorrectRef.current = next;
                return next;
            });
        } else {
            setAnswerCorrect(false);
            setAmountIncorrect(prev => {
                const next = prev + 1;
                amountIncorrectRef.current = next;
                return next;
            });
        }
        setTimeout(() => {
            setClickable(true);
            setSeconds(time);
            setDisplayAnswer(false);
            setIsActive(true);
            if (displayQuestion < quizData.questions.length - 1) {
                setDisplayQuestion(displayQuestion + 1);
            }
            else {
                navigate('/results', { state: { corrects: amountCorrectRef.current, total: quizData.questions.length } });
            }
        }, 3000) //cambiar tiempo respuesta
    }, [displayQuestion, navigate, quizData, time])

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const fixAnswer = (answer) => {
        return answer.replaceAll('-', ' ');
    }

    const fixInput = (answer) => {
        let auxAnswer = answer.toLowerCase().split(' ');
        const filtered = auxAnswer.filter(str => /^[a-zA-Z]+$/.test(str));
        let finalAnswer = '';
        filtered.forEach((word) => {
            finalAnswer += (word + '-')
        });
        return finalAnswer.slice(0, -1);
    }

    const displayResult = () => {
        if (!answerCorrect) {
            return <>
                <h3 className='game-titles--incorrect'>Incorrecto!</h3>
                <h3>Correct answer is: {fixAnswer(quizData.questions[displayQuestion].correctAnswer)}</h3>
            </>
        }
        else {
            return <h3 className='game-titles--correct'>Correcto!</h3>;
        }
    }

    useEffect(() => {
        let interval = null;
        if (isActive && !displayAnswer && seconds > 0) {
            interval = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);
        } else if (seconds === 0) {
            setIsActive(false);
            handleAnswer('');
        }
        return () => clearInterval(interval);
    }, [isActive, seconds, displayAnswer, handleAnswer]);

    useEffect(() => {
        amountCorrectRef.current = amountCorrect;
    }, [amountCorrect]);

    if (quizData.questions === null) {
        return <Loading></Loading>; // canviar a un spinner o algo
    }

    return (
        <>
            <div>
                <h2>Quiz</h2>
                <div className='score-ingame-container'>
                    <h3 className='game-titles'>Aciertos: <span className='game-titles--correct'>{amountCorrect}</span></h3>
                    <h3>Pregunta {displayQuestion + 1}/{quizData.questions.length}</h3>
                    <h3 className='game-titles'>Fallos: <span className='game-titles--incorrect'>{amountIncorrect}</span></h3>
                </div>

                {
                    displayAnswer &&
                    <>
                        {
                            displayResult()
                        }
                    </>
                }

                <div className='quiz-questions-main-container'>
                    <img src={quizData.questions[displayQuestion].question} alt='tecnique-img' className='quiz-image'></img>
                    {
                        time !== null && <div> {isActive ? `${seconds} queden seconds` : "S'ha acabat el temps!"} </div>
                    }

                    <div className='quiz-questions-buttons-container'>
                        {
                            !mode && quizData.questions[displayQuestion].answers.map((answer, index) => {
                                return (
                                    <RedCornerButton disabled={!clickable} key={index} title={fixAnswer(answer)} callback={() => handleAnswer(answer)}></RedCornerButton>
                                )
                            })
                        }
                    </div>

                    {
                        mode && // hay que añadir la posibilidad de que por ejemplo shudan = chudan
                        <div className='write-quiz-answer-container'>
                            <p>Nombre técnica: </p>
                            <input type="text"
                                value={inputValue}
                                onChange={handleChange}
                                placeholder="Tecnica..."></input>
                            <RegularButton disabled={!clickable} title='Envia' callback={() => handleAnswer(fixInput(inputValue))}></RegularButton>
                        </div>
                    }
                </div>
            </div>
            <ReturnHome></ReturnHome>
        </>

    )
}

export default Quiz