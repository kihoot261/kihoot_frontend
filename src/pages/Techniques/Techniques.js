import React from 'react'
import { useNavigate } from 'react-router';
import ReturnHome from '../../components/buttons/ReturnHome';
import RegularButton from '../../components/buttons/RegularButton';

function Techniques() {

    const navigate = useNavigate();

    return (
        <>
            <div className='many-buttons-container screen-for-buttons-container mawashi-bg'>
                <RegularButton title='Crear técnica' callback={() => navigate('/createtechnique')}></RegularButton>
                <RegularButton title='Buscar técnicas' callback={() => navigate('/searchtechniques')}></RegularButton>
            </div>
            <ReturnHome></ReturnHome>
        </>
    )
}

export default Techniques