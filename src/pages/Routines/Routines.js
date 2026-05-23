import React from 'react'
import { Link } from 'react-router'

function Routines() {


    return (
        <>
            <h3 className='description-feature'>Crea tus propias rutinas de entrenamiento o consulta y guarda las que otros usuarios han creado</h3>
            <nav className='resources-navigation tsuki-bg'>
                <div className='regular-iconed'>
                    <Link to="/createroutine" className='regular-button-link contents-menu-button'>
                        <p>Crear rutina entrenamiento</p>
                    </Link>
                </div>
                <div className='regular-iconed'>
                    <Link to="/searchroutines" className='regular-button-link contents-menu-button'>
                        <p>Buscar rutinas entrenamiento</p>
                    </Link>
                </div>
            </nav>
        </>

    )
}

export default Routines