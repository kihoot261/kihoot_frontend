import React from 'react'
import { useNavigate } from 'react-router'
import ReturnHome from '../../components/buttons/ReturnHome';
import '../../styles/pages/_setupflashcards.scss';
import RegularButton from '../../components/buttons/RegularButton';

function SetupFlashcards() {
    const navigate = useNavigate();
    return (
        <>
        <h2>Flashcards</h2>
            <div className='many-buttons-container screen-for-buttons-container kanku-bg-mod kanku-bg'>
                <RegularButton title='Números en japonés' callback={() => navigate('/flashcards', { state: { genre: 'numbers' }})}></RegularButton>
                <RegularButton title='Partes de la mano' callback={() => navigate('/flashcards', { state: { genre: 'partes_de_la_mano' }})}></RegularButton>
                <RegularButton title='Vocabulario en japonés' callback={() => navigate('/flashcards', { state: { genre: 'vocabulario_japones' }})}></RegularButton>
                <RegularButton title='Curiosidades' callback={() => navigate('/flashcards', { state: { genre: 'curiosidades' }})}></RegularButton>
            </div>
            <ReturnHome></ReturnHome>
        </>

    )
}

export default SetupFlashcards