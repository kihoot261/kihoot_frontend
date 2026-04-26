import './styles/main.scss';
import { Outlet, useLocation } from 'react-router';
import Navbar from './components/Navbar';
import Header from './components/Header';
import './styles/utils/_common.scss';
import './styles/pages/_home.scss';

function App() {

    const location = useLocation();
    const showOnlyOnHome = location.pathname === '/';

    return (
        <>
            {
                showOnlyOnHome ?
                    <div className='App gradient'>
                        <div className='kanji-kyoku-bg'>
                            <h1 className='yuji-boku-regular kihoot-title'>Kihoot</h1>
                            <div className='header-position'>
                                <Header></Header>
                            </div>
                        </div>
                        <div>
                            <Navbar></Navbar>
                        </div>
                    </div>
                    :
                    <Header></Header>
            }
            <Outlet></Outlet>
        </>
    );
}

export default App;
