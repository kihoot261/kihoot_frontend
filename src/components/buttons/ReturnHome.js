import React from 'react'
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import '../../styles/components/_buttons.scss'

const ReturnHome = () => {

    const navigate = useNavigate();

    return (
        <div className='home-button-container'>
            <button className='home' onClick={() => navigate('/')}>
                <FontAwesomeIcon icon={faHouse} className="fa-lg" />
                <p>Home</p>
            </button>
        </div>
    )
}

export default ReturnHome