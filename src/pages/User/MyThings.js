import React from 'react';
import { useNavigate } from 'react-router';
import RegularButton from '../../components/buttons/RegularButton';
import '../../styles/pages/_profile.scss';


function MyThings() {

    const navigate = useNavigate()

    return (
        <>
            <h2>Mis cosas</h2>
            <div className='many-buttons-container screen-for-buttons-container bridge-bg bridge-mythings'>
                <RegularButton title='Mis rutinas' callback={() => navigate('/myroutines')}></RegularButton>
                <RegularButton title='Mis técnicas' callback={() => navigate('/mytechniques')}></RegularButton>
                <RegularButton title='Mis diarios' callback={() => navigate('/diaries')}></RegularButton>
                <RegularButton title='Mis eventos' callback={() => navigate('/myevents')}></RegularButton>
            </div>
        </>
    )
}

export default MyThings