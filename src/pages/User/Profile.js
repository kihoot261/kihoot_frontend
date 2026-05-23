import React from 'react'
import { UserAuth } from '../../utils/AuthContext';
import { Navigate } from 'react-router';
import '../../styles/pages/_profile.scss';
import { Link } from 'react-router';

function Profile() {

    const { session } = UserAuth();

    return (
        <>
            <h2>Acceder al perfil</h2>
            {!session ?
                (
                    <nav className='resources-navigation bridge-bg'>
                        <div className='regular-iconed'>
                            <Link to="/login" className='regular-button-link contents-menu-button'>
                                <p>Inicia sesión</p>
                            </Link>
                        </div>
                        <div className='regular-iconed'>
                            <Link to="/register" className='regular-button-link contents-menu-button'>
                                <p>Registrarse</p>
                            </Link>
                        </div>
                    </nav>
                ) : (
                    <Navigate to={'/myprofile'}></Navigate>
                )
            }
        </>
    )
}

export default Profile