import React from 'react'
import { useNavigate } from 'react-router'
import ReturnHome from '../components/ReturnHome'
import RegularButton from '../components/RegularButton'

function MyThings() {

    const navigate = useNavigate()

    return (
        <>
            <h2>Mis cosas</h2>
            <ul>
                <RegularButton title='Mis rutinas' callback={() => navigate('/myroutines')}></RegularButton>
                <RegularButton title='Mis técnicas'></RegularButton>
                <RegularButton title='Mis eventos'></RegularButton>
                <RegularButton title='Mis diarios'></RegularButton>
            </ul>
            <ReturnHome></ReturnHome>
        </>
    )
}

export default MyThings