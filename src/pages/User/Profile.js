import React from 'react'
import ReturnHome from '../../components/buttons/ReturnHome';
import { UserAuth } from '../../utils/AuthContext';
import { Navigate, useNavigate } from 'react-router';
import RegularButton from '../../components/buttons/RegularButton';
import '../../styles/pages/_profile.scss';

function Profile() {

    const navigate = useNavigate();
    const { session } = UserAuth();

    return (
        <>
            <h2>Acceder al perfil</h2>
            {!session ?
                (
                    <div className='many-buttons-container screen-for-buttons-container bridge-bg'>
                        <RegularButton title='Inicia sesión' callback={() => navigate('/login')}></RegularButton>
                        <RegularButton title='Registrarse' callback={() => navigate('/register')}></RegularButton>
                    </div>
                ) : (
                    <Navigate to={'/myprofile'}></Navigate>
                )
            }
            <ReturnHome></ReturnHome>
        </>
    )
}

export default Profile