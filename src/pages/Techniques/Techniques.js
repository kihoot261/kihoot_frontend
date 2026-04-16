import React from 'react'
import { useNavigate } from 'react-router';
import ReturnHome from '../../components/ReturnHome';
import RegularButton from '../../components/RegularButton';

function Techniques() {

    const navigate = useNavigate();

    return (
        <>
            <div>
                <RegularButton title='Crear técnica' callback={() => navigate('/createtechnique')}></RegularButton>
                <RegularButton title='Buscar técnicas' callback={() => navigate('/searchtechniques')}></RegularButton>
            </div>
            <ReturnHome></ReturnHome>
        </>
    )
}

export default Techniques