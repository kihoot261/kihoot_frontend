import React from 'react'
import '../../styles/pages/_info.scss';
import ResourcesNavbar from '../../components/ResourcesNavbar';

function Info() {

    return (
        <div>
            <div className='kanji-kyoku-bg animate__animated animate__fadeInUp'>
                <h2 className='main-h2-title'>Recursos</h2>
            </div>
            <ResourcesNavbar></ResourcesNavbar>
        </div>
    )
}

export default Info