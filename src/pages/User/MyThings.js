import React from 'react';
import { useNavigate } from 'react-router';
import ReturnHome from '../../components/buttons/ReturnHome';
import RegularButton from '../../components/buttons/RegularButton';
import '../../styles/pages/_mythings.scss';


function MyThings() {

    const navigate = useNavigate()

    return (
        <>
            <h2>Mis cosas</h2>
            <div className='many-buttons-container screen-for-buttons-container bridge-bg'>
                <RegularButton title='Mis rutinas' callback={() => navigate('/myroutines')}></RegularButton>
                <RegularButton title='Mis técnicas' callback={() => navigate('/mytechniques')}></RegularButton>
                {
            
                    /*
                    <RegularButton title='Mis eventos'></RegularButton>
                    <RegularButton title='Mis diarios'></RegularButton>
                */
                }

            </div>
            <ReturnHome></ReturnHome>
        </>
    )
}

export default MyThings