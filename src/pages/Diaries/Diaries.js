import React from 'react'
import RegularButton from '../../components/buttons/RegularButton';
import ReturnHome from '../../components/buttons/ReturnHome';
import { useNavigate } from 'react-router';

function Diaries() {

    const navigate = useNavigate();

    return (
        <>
            <h2>Diarios de progreso</h2>
            <div className='many-buttons-container screen-for-buttons-container osu-bg'>
                <RegularButton title='Crear diario' callback={() => navigate('/creatediary')}></RegularButton>
                <RegularButton title='Mis diarios' callback={() => navigate('/mydiaries')}></RegularButton>
            </div>
            <ReturnHome></ReturnHome>
        </>
    )
}

export default Diaries