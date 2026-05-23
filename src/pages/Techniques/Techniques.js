import React from 'react'
import { Link } from 'react-router';

function Techniques() {

    return (
        <>
            <h3 className='description-feature'>Crea videos de técnicas para que otros usuarios te ayuden a mejorar, o mira videos de otros usuarios para mejorar y ayudar</h3>
            <nav className='resources-navigation mawashi-bg'>
                <div className='regular-iconed'>
                    <Link to="/createtechnique" className='regular-button-link contents-menu-button'>
                        <p>Crear técnica</p>
                    </Link>
                </div>
                <div className='regular-iconed'>
                    <Link to="/searchtechniques" className='regular-button-link contents-menu-button'>
                        <p>Buscar técnicas</p>
                    </Link>
                </div>
            </nav>
        </>

    )
}

export default Techniques