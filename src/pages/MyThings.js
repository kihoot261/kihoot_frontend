import React from 'react'
import { useNavigate } from 'react-router'
import ReturnHome from '../components/ReturnHome'

function MyThings() {

    const navigate = useNavigate()

    return (
        <>
            <h2>Mis cosas</h2>
            <ul>
                <button onClick={() => navigate('/myroutines')}>Mis rutinas</button>
                <button onClick={() => navigate('/')}>Mis técnicas</button>
                <button onClick={() => navigate('/')}>Mis eventos</button>
                <button onClick={() => navigate('/')}>Mis diarios</button>
            </ul>
            <ReturnHome></ReturnHome>
        </>
    )
}

export default MyThings