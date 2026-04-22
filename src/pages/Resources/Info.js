import React from 'react'
import ReturnHome from '../../components/ReturnHome';
import '../../styles/pages/_info.scss';
import ResourcesNavbar from '../../components/ResourcesNavbar';

function Info() {

    return (
        <div className='App gradient'>
            <div className='App kyoku-kanji-bg'>
                <h2 className='main-h2-title'>Info</h2>
            </div>
            <div>
                <ResourcesNavbar></ResourcesNavbar>
                <div className='email'>
                    <a href='https://drive.google.com/file/d/1aARJ_t44nUn4o9suCYEJe1kyGFKTV6Xc/view?usp=drive_link'>Referencia pase grados</a>
                    <p >
                        Puedes enviarme un email a: <a href='mailto:kihoot261@gmail.com'>kihoot261@gmail.com</a> en caso de tener una sugerencia o ver un error
                    </p>
                </div>
                <ReturnHome></ReturnHome>
            </div>

        </div>
    )
}

export default Info