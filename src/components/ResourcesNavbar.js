import React from 'react';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClipboardQuestion } from '@fortawesome/free-solid-svg-icons';


const ResourcesNavbar = () => {
    return (
        <nav className='iconed-navigation'>
            <ul>
                <li className='regular-iconed'>
                    <Link to="/setupflashcards" className='regular-button-link contents-menu-button'>
                        <FontAwesomeIcon className="fa-lg" icon={faClipboardQuestion} />
                        <p>Flashcards</p>
                    </Link>
                </li>
                <li className='regular-iconed'>
                    <Link to="/calendar" className='regular-button-link contents-menu-button'>
                        <FontAwesomeIcon className="fa-lg" icon={faCalendar} />
                        <p>Calendario</p>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default ResourcesNavbar