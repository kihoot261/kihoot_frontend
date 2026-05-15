import React from 'react'
import { useNavigate } from 'react-router';
import ReturnHome from '../../components/buttons/ReturnHome';
import RegularButton from '../../components/buttons/RegularButton';

function Events() {

    const navigate = useNavigate();

    return (
        <>
            <div className='many-buttons-container screen-for-buttons-container osu-bg'>
                <RegularButton title='Crear evento' callback={() => navigate('/createevent')}></RegularButton>
                <RegularButton title='Buscar eventos' callback={() => navigate('/searchevents')}></RegularButton>
            </div>
            <ReturnHome></ReturnHome>
        </>
    )
}

export default Events