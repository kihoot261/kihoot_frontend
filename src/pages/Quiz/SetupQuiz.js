import React, { useState, useEffect } from 'react'
import ReturnHome from '../../components/ReturnHome';
import { useNavigate } from 'react-router';
import RegularButton from '../../components/RegularButton';

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
      <RegularButton key={i} title={capitalizeFirstLetter(kyuName)} callback={() => handleKyu(kyuName)}></RegularButton>
    );
  }
  buttons.push(<RegularButton key={11} title='Sho-dan' callback={() => handleKyu('sho-dan')}></RegularButton>);
  buttons.push(<RegularButton key={12} title='Ni-dan' callback={() => handleKyu('ni-dan')}></RegularButton>)

  kyus.push('sho-dan', 'ni-dan');

  useEffect(() => {
    if (order && questions !== null) {
      setVisibilityMode(false);
      setVisibilityTime(false);
      setVisibilityOrder(false);
      setOrder(false);
    }
  }, [order, questions])

  return (
    <>
      <h1>
        Configuración de Partida
      </h1>

      <div> { /* este será un form algo diferente al resto */ }
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
            Número de preguntas
          </h2>
          <ul>
            <RegularButton title='10' disabled={chekNumQuestions(1)} callback={() => handleQuestions(10)}></RegularButton>
            <RegularButton title='20' disabled={chekNumQuestions(2)} callback={() => handleQuestions(20)}></RegularButton>
            <RegularButton title='50' disabled={chekNumQuestions(5)} callback={() => handleQuestions(50)}></RegularButton>
            <RegularButton title='Totes' callback={() => handleQuestions(null)}></RegularButton>
          </ul>
        </div>

        <div style={{ visibility: visibilityMode ? 'visible' : 'hidden' }}>
          <h2>
            Modo
          </h2>
          <ul>
            <RegularButton title='Escriptura' callback={() => handleMode(true)}></RegularButton>
            <RegularButton title='Tap' callback={() => handleMode(false)}></RegularButton>
          </ul>
        </div>

        <div style={{ visibility: visibilityOrder ? 'visible' : 'hidden' }}>
          <h2>
            Orden
          </h2>
          <ul>
            <RegularButton title='Ordenat' callback={() => handleOrder(true)} disabled={questions !== null}></RegularButton>
            <RegularButton title='Aleatori' callback={() => handleOrder(false)}></RegularButton>
          </ul>
        </div>

        <div style={{ visibility: visibilityTime ? 'visible' : 'hidden' }}>
          <h2>
            Tiempo
          </h2>
          <ul>
            <RegularButton title='30s' callback={() => handleTime(30)}></RegularButton>
            <RegularButton title='60s' callback={() => handleTime(60)}></RegularButton>
            <RegularButton title='Sin tiempo' callback={() => handleTime(null)}></RegularButton>
          </ul>
        </div>
        <RegularButton title='Comienza la partida' disabled={startGame} callback={() => goToConfigureGame()}></RegularButton>
      </div>


      <ReturnHome></ReturnHome>


    </>
  )
}

export default SetupQuiz