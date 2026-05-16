import './styles/main.scss';
import { Outlet, useLocation } from 'react-router';
import Navbar from './components/Navbar';
import Header from './components/Header';
import './styles/utils/_common.scss';
import './styles/pages/_home.scss';
import Footer from './components/Footer';

function App() {

    const location = useLocation();
    const showOnlyOnHome = location.pathname === '/';

    return (
        <>
            {
                showOnlyOnHome ? (
                    <div className='App'>
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
                ) : (
                    <div className='App'>
                        <Header></Header>
                        <Outlet></Outlet>
                        <Footer></Footer>
                    </div>
                )
            }

        </>
    );
}

export default App;
