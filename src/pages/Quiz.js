import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useConfigureGame } from '../api/quizData';
import { useNavigate, useLocation } from 'react-router-dom';
import ReturnHome from '../components/ReturnHome';

function Quiz() {

  const [displayQuestion, setDisplayQuestion] = useState(0);
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [amountCorrect, setAmountCorrect] = useState(0);
  const [clickable, setClickable] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const amountCorrectRef = useRef(0);
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
    }, 3000)
  }, [displayQuestion, navigate, quizData, time])

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
    return <div>Loading quiz...</div>; // canviar a un spinner o algo
  }

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
        <h3 className='incorrect-answer'>Incorrect!</h3>
        <h3>Correct answer is: {fixAnswer(quizData.questions[displayQuestion].correctAnswer)}</h3>
      </>
    }
    else {
      return <h3 className='correct-answer'>Correct!</h3>;
    }
  }

  return (
    <>
      <div className='quiz-container'>
        <h2>Quiz</h2>
        <h3>Pregunta {displayQuestion + 1}/{quizData.questions.length}</h3>
        {displayAnswer &&
          <>
            {
              displayResult()
            }
          </>
        }
        <div>
          <img src={quizData.questions[displayQuestion].question} alt='tecnique-img' className='img-tecnica'></img>
          {
            time !== null && <div> {isActive ? `${seconds} queden seconds` : "S'ha acabat el temps!"} </div>
          }
          {
            !mode && quizData.questions[displayQuestion].answers.map((answer, index) => {
              return (
                <button key={index} disabled={!clickable} onClick={() => handleAnswer(answer)}>
                  <h3>
                    {fixAnswer(answer)}
                  </h3>
                </button>
              )
            })
          }
          {
            mode &&
            <>
              <p>Nom tecnica: </p>
              <input type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Tecnica..."></input>
              <button disabled={!clickable} onClick={() => handleAnswer(fixInput(inputValue))}>Envia</button>
            </>
          }
        </div>
      </div>
      <ReturnHome></ReturnHome>
    </>

  )
}

export default Quiz