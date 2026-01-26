import React, { useState, useEffect, useRef } from 'react'
import quizData from '../api/quizData';
import { useNavigate } from 'react-router-dom';

function Quiz() {

  const [displayQuestion, setDisplayQuestion] = useState(0);
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [amountCorrect, setAmountCorrect] = useState(0);
  const [clickable, setClickable] = useState(true);
  const navigate = useNavigate();
  const amountCorrectRef = useRef(0);

  useEffect(() => {
    amountCorrectRef.current = amountCorrect;
  }, [amountCorrect]);

  const handleAnswer = (index) => {
    setDisplayAnswer(true);
    setClickable(false);
    if (quizData.questions[displayQuestion].correctAnswerIndex === index) {
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
        console.log(amountCorrectRef.current);
        navigate('/results', { state: { corrects: amountCorrect, total: quizData.questions.length} });
      }
    }, 3000)
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
                <button key={index} disabled={!clickable} onClick={() => handleAnswer(index)}>
                  <h3>
                    {answer}
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