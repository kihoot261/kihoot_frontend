import React from 'react'
import { useNavigate } from 'react-router';
import ReturnHome from '../../components/ReturnHome';
import RegularButton from '../../components/RegularButton';

function Routines() {

    const navigate = useNavigate();

    return (
        <>
        <h2>Rutinas de entrenamiento</h2>
            <div className='many-buttons-container screen-for-buttons-container tsuki-bg'>
                <RegularButton title='Crear rutina entrenamiento' callback={() => navigate('/createroutine')}></RegularButton>
                <RegularButton title='Buscar rutinas entrenamiento' callback={() => navigate('/searchroutines')}></RegularButton>
            </div>
            <ReturnHome></ReturnHome>
        </>
    )
}

export default Routines