import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { useConfigureFlashcards } from '../../api/flashcardsData';
import Loading from '../../components/Loading';
import '../../styles/pages/_flashcards.scss';
import { motion, AnimatePresence } from 'framer-motion';

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
                <AnimatePresence mode='wait'>
                    {
                        !showAnswer ? (
                            <motion.div
                                key="question"
                                initial={{ rotateY: 90, opacity: 0 }}
                                animate={{ rotateY: 0, opacity: 1 }}
                                exit={{ rotateY: -90, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className='flashcard-inner-container flashcard-inner-container--question'
                            >
                                <h3>{currentCard.question}</h3>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="answer"
                                initial={{ rotateY: 90, opacity: 0 }}
                                animate={{ rotateY: 0, opacity: 1 }}
                                exit={{ rotateY: -90, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className='flashcard-inner-container flashcard-inner-container--answer'
                            >
                                <h3>{currentCard.answer}</h3>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>
        </>
    );
}

export default Flashcards