import React from 'react'
import ReturnHome from '../../components/ReturnHome';
import { Link } from 'react-router';

function Info() {

    return (
        <>
            <h2>Info</h2>

            <nav>
                <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem' }}>
                    <li><Link to="/setupflashcards">Flashcards</Link></li>
                </ul>
            </nav>
            <a href='https://drive.google.com/file/d/1aARJ_t44nUn4o9suCYEJe1kyGFKTV6Xc/view?usp=drive_link'>Referencia pase grados</a>
            <p>
                Pots enviar-me un email a: <a href='mailto:kihoot261@gmail.com'>kihoot261@gmail.com</a> en cas de tenir una suggerencia o veure un error
            </p>
            <ReturnHome></ReturnHome>
        </>
    )
}

export default Info