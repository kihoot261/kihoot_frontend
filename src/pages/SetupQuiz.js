// esta página configurará el quiz, pero se hará en un futuro
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ReturnHome from '../components/ReturnHome';

function SetupQuiz() {
  const [kyu, setKyu] = useState([]);

  const [questions, setQuestions] = useState(0);
  const [visibilityQuestions, setVisibilityQuestions] = useState(false);

  const [mode, setMode] = useState(false);
  const [visibilityMode, setVisibilityMode] = useState(false);

  const [order, setOrder] = useState(false);
  const [visibilityOrder, setVisibilityOrder] = useState(false);

  const [time, setTime] = useState(0);
  const [visibilityTime, setVisibilityTime] = useState(false);

  const [startGame, setStartGame] = useState(true);

  const navigate = useNavigate();
  let kyus = [];

  const handleKyu = (kyuParam) => {
    setKyu([]);
    setVisibilityQuestions(true);
    for (let i = 0; i < kyus.length; ++i) {
      if (kyus[i] !== kyuParam) {
        setKyu(current => [...current, kyus[i]]);
      }
      else {
        setKyu(current => [...current, kyuParam]);
        break;
      }
    }
  }

  const handleQuestions = (questionsParam) => {
    setQuestions(questionsParam);
    setVisibilityMode(true);
  }

  const handleMode = (modeParam) => {
    setMode(modeParam);
    setVisibilityOrder(true);
  }

  const handleOrder = (orderParam) => {
    setOrder(orderParam);
    setVisibilityTime(true);
  }

  const handleTime = (timeParam) => {
    setTime(timeParam);
    setStartGame(false);
  }

  const chekNumQuestions = (size) => {
    return kyu.length < size ? true : false;
  }

  const insertText = (index) => {
    return 'kyu' + index.toString();
  }

  const goToConfigureGame = () => {
    navigate('/quiz', { state: { kyu: kyu, time: time, mode: mode, questions: questions, order: order } });
  }

  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  const buttons = [];
  for (let i = 10; i >= 1; i--) {
    const kyuName = insertText(i);
    kyus.push(kyuName);
    buttons.push(
      <button key={i} onClick={() => handleKyu(kyuName)}>
        {capitalizeFirstLetter(kyuName)}
      </button>
    );
  }
  buttons.push(<button key={11} onClick={() => handleKyu('sho-dan')}>Sho-dan</button>);
  buttons.push(<button key={12} onClick={() => handleKyu('ni-dan')}>Ni-dan</button>);
  kyus.push('sho-dan', 'ni-dan');

  return (
    <>
      <h1>
        Configuració de Partida
      </h1>

      <div>
        <h2>
          Kyu
        </h2>
        <ul>
          {buttons}
        </ul>
      </div>

      <div style={{ visibility: visibilityQuestions ? 'visible' : 'hidden' }}>
        <h2>
          Número de preguntes
        </h2>
        <ul>
          <button onClick={() => handleQuestions(10)} disabled={chekNumQuestions(1)}>10</button>
          <button onClick={() => handleQuestions(20)} disabled={chekNumQuestions(2)}>20</button>
          <button onClick={() => handleQuestions(50)} disabled={chekNumQuestions(5)}>50</button>
          <button onClick={() => handleQuestions(null)}>Totes</button>
        </ul>
      </div>

      <div style={{ visibility: visibilityMode ? 'visible' : 'hidden' }}>
        <h2>
          Mode
        </h2>
        <ul>
          <button onClick={() => handleMode(true)}>Escriptura</button>
          <button onClick={() => handleMode(false)}>Tap</button>
        </ul>
      </div>

      <div style={{ visibility: visibilityOrder ? 'visible' : 'hidden' }}>
        <h2>
          Ordre
        </h2>
        <ul>
          <button onClick={() => handleOrder(true)}>Ordenat</button>
          <button onClick={() => handleOrder(false)}>Aleatori</button>
        </ul>
      </div>

      <div style={{ visibility: visibilityTime ? 'visible' : 'hidden' }}>
        <h2>
          Temps
        </h2>
        <ul>
          <button onClick={() => handleTime(30)}>30s</button>
          <button onClick={() => handleTime(60)}>60s</button>
          <button onClick={() => handleTime(null)}>Sense temps</button>
        </ul>
      </div>

      <button onClick={() => goToConfigureGame()} disabled={startGame}>
        Comença partida
      </button>
      <div>
        <ReturnHome></ReturnHome>
      </div>

    </>
  )
}

export default SetupQuiz