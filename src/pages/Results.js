import React from 'react'
import { useLocation } from 'react-router-dom';
import ReturnHome from '../components/ReturnHome';

function Results() {

    const location = useLocation();
    const { corrects, total } = location.state;

    return (
        <>
            <h1 className='result-display'>
                Percentatge d'encerts: {corrects / total * 100}%
            </h1>
            <ReturnHome></ReturnHome>
        </>
    )
}

export default Results