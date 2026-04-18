import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { useConfigureFlashcards } from '../../api/flashcardsData';
import ReturnHome from '../../components/ReturnHome';
import Loading from '../../components/Loading';

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
                navigate('/info');
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
            <div onClick={handleCardClick}>
                {!showAnswer ? (
                    <div>
                        <h2>{currentCard.question}</h2>
                    </div>
                ) : (
                    <div>
                        <h2>{currentCard.answer}</h2>
                    </div>
                )}
            </div>
            <ReturnHome />
        </>
    );
}

export default Flashcards