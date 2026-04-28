import React, { useState } from 'react'
import ReturnHome from '../../components/buttons/ReturnHome';
import { useNavigate } from 'react-router';
import QuizButton from '../../components/buttons/QuizButton';
import '../../styles/pages/_setupquiz.scss';
import RedCornerButton from '../../components/buttons/RedCornerButton';
import KyuButton from '../../components/buttons/KyuButton';

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
        if (!startGame) navigate('/quiz', { state: { kyu: kyu, time: time, mode: mode, questions: questions, order: order } });
    }

    const capitalizeFirstLetter = (val) => {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    const styleObject = [
        {
            color: "black",
            border: 'black'
        },
        {
            color: "brown",
            border: 'black'
        },
        {
            color: "brown",
            border: 'brown'
        },
        {
            color: "#2DA64C",
            border: 'brown'
        },
        {
            color: "#2DA64C",
            border: '#2DA64C'
        },
        {
            color: "yellow",
            border: 'green'
        },
        {
            color: "yellow",
            border: 'yellow'
        },
        {
            color: "blue",
            border: 'yellow'
        },
        {
            color: "blue",
            border: 'blue'
        },
        {
            color: "orange",
            border: 'blue'
        },
        {
            color: "orange",
            border: 'orange'
        },
    ]

    const buttons = [];
    for (let i = 10; i >= 1; i--) {
        const kyuName = insertText(i);
        kyus.push(kyuName);
        buttons.push(
            <KyuButton key={i} title={capitalizeFirstLetter(kyuName)} callback={() => handleKyu(kyuName)} styleColor={styleObject[i].color} styleBorder={styleObject[i].border}></KyuButton>
        );
    }
    buttons.push(<KyuButton key={11} title='Sho-dan' callback={() => handleKyu('sho-dan')} styleColor={styleObject[0].color} styleBorder={styleObject[0].border}></KyuButton>);
    buttons.push(<KyuButton key={12} title='Ni-dan' callback={() => handleKyu('ni-dan')} styleColor={styleObject[0].color} styleBorder={styleObject[0].border}></KyuButton>)

    kyus.push('sho-dan', 'ni-dan');

    return (
        <>
            <h2>
                Configuración de Partida
            </h2>

            <div className='main-quizsetup-container dragon-bg'> { /* este será un form algo diferente al resto */}

                <div className='grouping-sections-container'>
                    <div className='quiz-buttons-container'>
                        <h3 className='quiz-header'>
                            Kyu
                        </h3>
                        <ul className='double-grid-container'>
                            {buttons}
                        </ul>
                    </div>
                </div>

                <div className='grouping-sections-container'>
                    <div className='quiz-buttons-container'
                        style={{ visibility: visibilityQuestions ? 'visible' : 'hidden' }}>
                        <h3 className='quiz-header'>
                            Número de preguntas
                        </h3>
                        <ul className='double-grid-container'>
                            <QuizButton title='10' disabledCondition={chekNumQuestions(1)} callback={() => handleQuestions(10)}></QuizButton>
                            <QuizButton title='20' disabledCondition={chekNumQuestions(2)} callback={() => handleQuestions(20)}></QuizButton>
                            <QuizButton title='50' disabledCondition={chekNumQuestions(5)} callback={() => handleQuestions(50)}></QuizButton>
                            <QuizButton title='Todas' callback={() => handleQuestions(null)}></QuizButton>
                        </ul>
                    </div>

                    <div className='quiz-buttons-container'
                        style={{ visibility: visibilityMode ? 'visible' : 'hidden' }}>
                        <h3 className='quiz-header'>
                            Modo
                        </h3>
                        <ul className='double-grid-container'>
                            <QuizButton title='Escriptura' callback={() => handleMode(true)}></QuizButton>
                            <QuizButton title='Tap' callback={() => handleMode(false)}></QuizButton>
                        </ul>
                    </div>
                </div>

                <div className='grouping-sections-container'>
                    <div className='quiz-buttons-container'
                        style={{ visibility: visibilityOrder ? 'visible' : 'hidden' }}>
                        <h3 className='quiz-header'>
                            Orden
                        </h3>
                        <ul className='double-grid-container'>
                            <QuizButton title='Ordenado' callback={() => handleOrder(true)} disabledCondition={questions !== null}></QuizButton>
                            <QuizButton title='Aleatorio' callback={() => handleOrder(false)}></QuizButton>
                        </ul>
                    </div>

                    <div className='quiz-buttons-container'
                        style={{ visibility: visibilityTime ? 'visible' : 'hidden' }}>
                        <h3 className='quiz-header'>
                            Tiempo
                        </h3>
                        <ul className='double-grid-container'>
                            <QuizButton title='30s' callback={() => handleTime(30)}></QuizButton>
                            <QuizButton title='60s' callback={() => handleTime(60)}></QuizButton>
                            <QuizButton title='Sin tiempo' callback={() => handleTime(null)}></QuizButton>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='startgame-container'>
                {
                    !startGame &&
                    <RedCornerButton title='Comienza la partida' callback={() => goToConfigureGame()}></RedCornerButton>
                }
            </div>
            <ReturnHome></ReturnHome>
        </>
    )
}

export default SetupQuiz