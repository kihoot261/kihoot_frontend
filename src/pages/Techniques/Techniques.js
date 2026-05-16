import React from 'react'
import { useNavigate } from 'react-router';
import RegularButton from '../../components/buttons/RegularButton';

function Techniques() {

    const navigate = useNavigate();

    return (
        <>
            <div className='many-buttons-container screen-for-buttons-container mawashi-bg'>
                <RegularButton title='Crear técnica' callback={() => navigate('/createtechnique')}></RegularButton>
                <RegularButton title='Buscar técnicas' callback={() => navigate('/searchtechniques')}></RegularButton>
            </div>
        </>
    )
}

export default Techniques