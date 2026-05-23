import React from 'react'
import { useLocation, useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../../styles/components/_buttons.scss'

const BackButton = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const goBack = () => {
        location.pathname === '/myprofile' ? navigate('/') : navigate(-1);
    }

    return (
        <div>
            <button className='home home--back-button' onClick={() => goBack()}>
                <FontAwesomeIcon icon={faArrowLeft} className="fa-lg" />
                <p>Back</p>
            </button>
        </div>
    )
}

export default BackButton