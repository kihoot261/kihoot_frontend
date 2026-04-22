import React from 'react'
import ReturnHome from '../../components/ReturnHome';
import { UserAuth } from '../../utils/AuthContext';
import { Navigate, useNavigate } from 'react-router';
import RegularButton from '../../components/RegularButton';
import '../../styles/pages/_profile.scss';

function Profile() {

    const navigate = useNavigate();
    const { session } = UserAuth();

    return (
        <>
            <h2>Acceder al perfil</h2>
            {!session ?
                (
                    <ul className='access-profile-container bridge-bg'>
                        <RegularButton title='Inicia sesión' callback={() => navigate('/login')}></RegularButton>
                        <RegularButton title='Registrarse' callback={() => navigate('/register')}></RegularButton>
                    </ul>
                ) : (
                    <Navigate to={'/myprofile'}></Navigate>
                )
            }
            <ReturnHome></ReturnHome>
        </>
    )
}

export default Profile