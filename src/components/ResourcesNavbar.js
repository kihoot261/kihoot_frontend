import React from 'react';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCalendar, faClipboardQuestion, faEnvelope } from '@fortawesome/free-solid-svg-icons';


const ResourcesNavbar = () => {
    return (
        <nav className='main-navigation animate__animated animate__backInUp'>
            <div className='resources-navigation-section'>
                <div className='section-2-resources'>
                    <div className='regular-iconed'>
                        <Link to="/setupflashcards" className='regular-button-link contents-menu-button'>
                            <FontAwesomeIcon className="fontawesome-icon" icon={faClipboardQuestion} />
                            <p>Flashcards</p>
                        </Link>
                    </div>
                    <div className='regular-iconed'>
                        <Link to="/calendar" className='regular-button-link contents-menu-button'>
                            <FontAwesomeIcon className="fontawesome-icon" icon={faCalendar} />
                            <p>Calendario</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='resources-navigation-section'>
                <div className='section-2-resources'>
                    <div className='regular-iconed'>
                        <Link to='https://drive.google.com/file/d/1aARJ_t44nUn4o9suCYEJe1kyGFKTV6Xc/view?usp=drive_link' className='regular-button-link contents-menu-button'>
                            <FontAwesomeIcon className="fontawesome-icon special-icon" icon={faBook} />
                            <p className='regular-button-link'>Referencia pase grados</p>
                        </Link>
                    </div>
                    <div className='regular-iconed'>
                        <Link to='mailto:kihoot261@gmail.com' className='regular-button-link contents-menu-button'>
                            <FontAwesomeIcon className="fontawesome-icon" icon={faEnvelope} />
                            <p className='regular-button-link'>Contacto</p>
                        </Link>
                    </div>
                </div>

            </div>

        </nav>
    )
}

export default ResourcesNavbar