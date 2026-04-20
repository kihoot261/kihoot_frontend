import React from 'react';
import { Link } from 'react-router';
import '../styles/components/_navbar.scss';
import '../styles/utils/_common.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faFileLines, faDumbbell, faHandFist, faCircleUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <nav className='iconed-navigation'>
            <ul>
                <li className='regular'>
                    <Link to="/setupquiz" className='regular-button-link contents-menu-button'>
                        <FontAwesomeIcon className="fa-lg" icon={faFileLines} />
                        <p>Quiz</p>
                    </Link>
                </li>
                <li className='regular'>
                    <Link to="/info" className='regular-button-link contents-menu-button'>
                        <FontAwesomeIcon className="fa-lg" icon={faCircleInfo} />
                        <p>Recursos</p>
                    </Link>
                </li>
                <li className='regular'>
                    <Link to="/routines" className= 'regular-button-link contents-menu-button'>
                        <FontAwesomeIcon className="fa-lg" icon={faDumbbell} />
                        <p>Rutinas de entrenamiento</p>
                    </Link>
                </li>
                <li className='regular'>
                    <Link to="/techniques" className='regular-button-link contents-menu-button'>
                        <FontAwesomeIcon className="fa-lg" icon={faHandFist} />
                        <p>Técnicas</p>
                    </Link>
                </li>
                <li className='regular'>
                    <Link to="/profile" className='regular-button-link contents-menu-button'>
                        <FontAwesomeIcon className="fa-lg" icon={faCircleUser} />
                        <p>Perfil</p>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;   