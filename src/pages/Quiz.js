import React, { useState, useEffect, useRef } from 'react'
import configureGame from '../api/quizData';
import { useNavigate, useLocation } from 'react-router-dom';

function Quiz() {

  const [displayQuestion, setDisplayQuestion] = useState(0);
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [amountCorrect, setAmountCorrect] = useState(0);
  const [clickable, setClickable] = useState(true);
  const navigate = useNavigate();
  const amountCorrectRef = useRef(0);
  const location = useLocation();
  const { kyu, time, mode } = location.state;

  useEffect(() => {
    amountCorrectRef.current = amountCorrect;
  }, [amountCorrect]);

  const quizData = configureGame(kyu, time, mode);

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
              answerCorrect ? <h3 className='correct-answer'>Correct!</h3> : <h3 className='incorrect-answer'>Incorrect!</h3>
            }
          </>
        }

        <div>
          <h3 dangerouslySetInnerHTML={{ __html: quizData.questions[displayQuestion].question }}></h3>
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
    </>

  )
}

export default Quiz