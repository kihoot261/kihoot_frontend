import React from 'react';
import { Link } from 'react-router';
import '../styles/components/_navbar.scss';
import '../styles/utils/_common.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faFileLines, faDumbbell, faHandFist, faCircleUser, faCalendar } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <nav className='main-navigation'>
            <div className='main-navigation-section'>
                <div className='section-2-buttons'>
                    <div className='regular-iconed'>
                        <Link to="/setupquiz" className='regular-button-link contents-menu-button'>
                            <FontAwesomeIcon className="fontawesome-icon" icon={faFileLines} />
                            <p>Quiz</p>
                        </Link>
                    </div>
                    <div className='regular-iconed'>
                        <Link to="/info" className='regular-button-link contents-menu-button'>
                            <FontAwesomeIcon className="fontawesome-icon" icon={faCircleInfo} />
                            <p>Recursos</p>
                        </Link>
                    </div>
                </div>
                <div className='section-2-buttons'>
                    <div className='regular-iconed'>
                        <Link to="/routines" className='regular-button-link bigger-button contents-menu-button'>
                            <FontAwesomeIcon className="fontawesome-icon" icon={faDumbbell} />
                            <p>Rutinas de entrenamiento</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='main-navigation-section'>
                <div className='section-2-buttons'>
                    <div className='regular-iconed'>
                        <Link to="/events" className='regular-button-link contents-menu-button'>
                            <FontAwesomeIcon className="fontawesome-icon" icon={faCalendar} />
                            <p>Eventos</p>
                        </Link>
                    </div>
                    <div className='regular-iconed'>
                        <Link to="/techniques" className='regular-button-link contents-menu-button'>
                            <FontAwesomeIcon className="fontawesome-icon" icon={faHandFist} />
                            <p>Técnicas</p>
                        </Link>
                    </div>
                </div>
                <div className='single-long-button'>
                    <div className='regular-iconed'>
                        <Link to="/profile" className='regular-button-link bigger-button contents-menu-button'>
                            <FontAwesomeIcon className="fontawesome-icon" icon={faCircleUser} />
                            <p>Perfil</p>
                        </Link>
                    </div>
                </div>

            </div>


        </nav>
    );
};

export default Navbar;   