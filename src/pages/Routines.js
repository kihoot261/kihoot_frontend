import React from 'react'
import { useNavigate } from 'react-router';
import ReturnHome from '../components/ReturnHome';
import RegularButton from '../components/RegularButton';

function Routines() {

    const navigate = useNavigate();

    return (
        <>
            <div>
                <RegularButton title='Crear rutina entrenamiento' callback={() => navigate('/createroutine')}></RegularButton>
                <RegularButton title='Buscar rutinas entrenamiento' callback={() => navigate('/searchroutines')}></RegularButton>
            </div>
            <ReturnHome></ReturnHome>
        </>
    )
}

export default Routines