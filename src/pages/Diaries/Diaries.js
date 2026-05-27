import React from 'react'
import { Link } from 'react-router'


function Diaries() {

    return (
        <>
            <h3 className='description-feature'>Mantén un progreso con algún ejercicio que busques mejorar, recuerda anotar cuanto haces cada dia y asi ver lo lejos que has llegado</h3>

            <nav className='resources-navigation osu-bg animate__animated animate__fadeInUp'>
                <div className='regular-iconed'>
                    <Link to="/creatediary" className='regular-button-link contents-menu-button'>
                        <p>Crear diario</p>
                    </Link>
                </div>
                <div className='regular-iconed'>
                    <Link to="/mydiaries" className='regular-button-link contents-menu-button'>
                        <p>Mis diarios</p>
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Diaries