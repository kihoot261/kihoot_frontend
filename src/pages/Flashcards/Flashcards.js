import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { useConfigureFlashcards } from '../../api/flashcardsData';
import ReturnHome from '../../components/ReturnHome';
import Loading from '../../components/Loading';
import '../../styles/pages/_flashcards.scss';

function Flashcards() {
    const location = useLocation();
    const { genre } = location.state;
    const data = useConfigureFlashcards(genre);
    const flashcards = data.flashcards;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const currentCard = flashcards[currentIndex];

    const navigate = useNavigate();

    const handleCardClick = () => {
        if (showAnswer) {
            if (currentIndex < flashcards.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setShowAnswer(false);
            } else {
                navigate('/setupflashcards');
            }
        } else {
            setShowAnswer(true);
        }
    };

    if (data === null || !flashcards?.length) {
        return <Loading />;
    }

    return (
        <>
            <h2>Flashcards</h2>
            <div onClick={handleCardClick} className='kanji-kyoku-bg flashcard-container'>
                {!showAnswer ? (
                    <div className='flashcard-inner-container flashcard-inner-container--question'>
                        <h3>{currentCard.question}</h3>
                    </div>
                ) : (
                    <div className='flashcard-inner-container flashcard-inner-container--answer'>
                        <h3>{currentCard.answer}</h3>
                    </div>
                )}
            </div>
            <ReturnHome />
        </>
    );
}

export default Flashcards