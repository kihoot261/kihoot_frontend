import React, { useState, useEffect, useRef } from 'react'
import { useConfigureGame } from '../api/quizData';
import { useNavigate, useLocation } from 'react-router-dom';
import ReturnHome from '../components/ReturnHome';

function Quiz() {

  const [displayQuestion, setDisplayQuestion] = useState(0);
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [amountCorrect, setAmountCorrect] = useState(0);
  const [clickable, setClickable] = useState(true);
  const navigate = useNavigate();
  const amountCorrectRef = useRef(0);
  const location = useLocation();
  const { kyu, time, mode, questions, order } = location.state;

  useEffect(() => {
    amountCorrectRef.current = amountCorrect;
  }, [amountCorrect]);

  const quizData = useConfigureGame(kyu, questions, order);
  if (quizData.questions === null) {
    return <div>Loading quiz...</div>; // canviar a un spinner o algo
  }

  const handleAnswer = (index) => {
    setDisplayAnswer(true);
    setClickable(false);
    if (quizData.questions[displayQuestion].correctAnswer === index) {
      setAnswerCorrect(true);
      setAmountCorrect(prev => {
        const next = prev + 1;
        amountCorrectRef.current = next;
        return next;
      });
    } else {
      setAnswerCorrect(false);
    }
    setTimeout(() => {
      setClickable(true);
      setDisplayAnswer(false);
      if (displayQuestion < quizData.questions.length - 1) {
        setDisplayQuestion(displayQuestion + 1);
      }
      else {
        navigate('/results', { state: { corrects: amountCorrectRef.current, total: quizData.questions.length } });
      }
    }, 3000)
  }

  const fixAnswer = (answer) => {
    return answer.replaceAll('-', ' ');
  }

  return (
    <>
      <div className='quiz-container'>
        <h2>Quiz</h2>
        <h3>Pregunta {displayQuestion + 1}/{quizData.questions.length}</h3>
        {displayAnswer &&
          <>
            {
              answerCorrect ? <h3 className='correct-answer'>Correct!</h3>
                :
                <>
                  <h3 className='incorrect-answer'>Incorrect!</h3>
                  <h3>Correct answer is: {fixAnswer(quizData.questions[displayQuestion].correctAnswer)}</h3>
                </>
            }
          </>
        }
        <div>
          <img src={quizData.questions[displayQuestion].question} alt='tecnique-img' className='img-tecnica'></img>
          {
            quizData.questions[displayQuestion].answers.map((answer, index) => {
              return (
                <button key={index} disabled={!clickable} onClick={() => handleAnswer(answer)}>
                  <h3>
                    {fixAnswer(answer)}
                  </h3>
                </button>
              )
            })
          }
        </div>
      </div>
      <ReturnHome></ReturnHome>
    </>

  )
}

export default Quiz