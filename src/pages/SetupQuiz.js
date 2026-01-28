// esta página configurará el quiz, pero se hará en un futuro
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SetupQuiz() {
  const [kyu, setKyu] = useState('');
  const [time, setTime] = useState(0);
  const [mode, setMode] = useState(false);
  const navigate = useNavigate();

  const handleKyu = (kyuParam) => {
    setKyu(kyuParam)
  }

  const handleMode = (modeParam) => {
    setMode(modeParam);
  }

  const handleTime = (timeParam) => {
    setTime(timeParam);
  }

  const insertText = (index) => {
    return 'kyu' + index.toString();
  }

  const goToConfigureGame = () => {
    navigate('/quiz', { state: { kyu: kyu, time: time, mode: mode } });
  }

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  const buttons = [];
  for (let i = 10; i >= 1; i--) {
    buttons.push(
      <button key={i} onClick={() => handleKyu(insertText(i))}>
        {capitalizeFirstLetter(insertText(i))}
      </button>
    );
  }
  buttons.push(<button key={11} onClick={() => handleKyu('sho-dan')}>Sho-dan</button>)
  buttons.push(<button key={12} onClick={() => handleKyu('ni-dan')}>Ni-dan</button>)

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
      <div>
        <h2>
          Mode
        </h2>
        <ul>
          <button onClick={() => handleMode(true)}>Escriptura</button>
          <button onClick={() => handleMode(false)}>Tap</button>
        </ul>
      </div>
      <div>
        <h2>
          Temps
        </h2>
        <ul>
          <button onClick={() => handleTime(30)}>30s</button>
          <button onClick={() => handleTime(60)}>60s</button>
          <button onClick={() => handleTime(null)}>Sense temps</button>
        </ul>
      </div>
      <button onClick={() => goToConfigureGame()}>
        Start Game
      </button>
    </>
  )
}

export default SetupQuiz