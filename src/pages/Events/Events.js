import React from 'react'
import { Link } from 'react-router';

function Events() {

    return (
        <>
            <h3 className='description-feature'>Organiza eventos en comunidad o asiste a eventos organizados</h3>
            <nav className='resources-navigation osu-bg'>
                <div className='regular-iconed'>
                    <Link to="/createevent" className='regular-button-link contents-menu-button'>
                        <p>Crear evento</p>
                    </Link>
                </div>
                <div className='regular-iconed'>
                    <Link to="/searchevents" className='regular-button-link contents-menu-button'>
                        <p>Buscar eventoss</p>
                    </Link>
                </div>
            </nav>
        </>

    )
}

export default Events