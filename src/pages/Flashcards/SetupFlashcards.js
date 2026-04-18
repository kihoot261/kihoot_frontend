import React from 'react'
import RegularButton from '../../components/RegularButton'
import { useNavigate } from 'react-router'

function SetupFlashcards() {
    const navigate = useNavigate();
    return (
        <>
            <ul>
                <RegularButton title='Números en japonés' callback={() => navigate('/flashcards', { state: { genre: 'numbers' }})}></RegularButton>
                <RegularButton title='Partes de la mano' callback={() => navigate('/flashcards', { state: { genre: 'partes_de_la_mano' }})}></RegularButton>
                <RegularButton title='Vocabulario en japonés' callback={() => navigate('/flashcards', { state: { genre: 'vocabulario_japones' }})}></RegularButton>
                <RegularButton title='Curiosidades' callback={() => navigate('/flashcards', { state: { genre: 'curiosidades' }})}></RegularButton>
            </ul>
        </>

    )
}

export default SetupFlashcards