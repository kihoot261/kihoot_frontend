import './styles/main.scss';
import { Outlet, useLocation, useNavigate } from 'react-router';
import Navbar from './components/Navbar';
import Header from './components/Header';
import './styles/utils/_common.scss';
import './styles/pages/_home.scss';
import Footer from './components/Footer';
import { UserAuth } from './utils/AuthContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import Loading from './components/Loading';
import TituloDescripción from './components/TituloDescripcion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import BlackCornerWhiteBgButton from './components/buttons/BlackCornerWhiteBgButton';
import BlackCornerWhiteBgButtonHome from './components/buttons/BlackCornerWhiteBgButtonHome';
import { scrollToSection } from './utils/methods';

function App() {

    const location = useLocation();
    const showOnlyOnHome = location.pathname === '/';
    const { searchEvents, searchRoutines, searchTechniques, session } = UserAuth();
    const [events, setEvents] = useState(null);
    const [routines, setRoutines] = useState(null);
    const [techniques, setTechniques] = useState(null);
    const [showContent, setShowContent] = useState(false);
    const contentRef = useRef(null);
    const navigate = useNavigate();

    const fetchEvents = useCallback(async () => {
        try {
            const searchedEvents = await searchEvents();
            const allEvents = searchedEvents.data;
            setEvents(allEvents);
        }
        catch (error) {
            console.error('Error searching events in Home:', error);
            return error;
        }
    }, [searchEvents])

    const fetchRoutines = useCallback(async () => {
        try {
            const searchedRoutines = await searchRoutines();
            const allRoutines = searchedRoutines.data;
            setRoutines(allRoutines);
        }
        catch (error) {
            console.error('Error searching routines in Home:', error);
            return error;
        }
    }, [searchRoutines])

    const fetchTechniques = useCallback(async () => {
        try {
            const searchedTechniques = await searchTechniques();
            const allTechniques = searchedTechniques.data;
            setTechniques(allTechniques);
        }
        catch (error) {
            console.error('Error searching techniques in Home:', error);
            return error;
        }
    }, [searchTechniques])

    useEffect(() => {
        if (session) {
            setShowContent(true);
        }
        if (!events) {
            fetchEvents();
        }
        if (!routines) {
            fetchRoutines();
        }
        if (!techniques) {
            fetchTechniques();
        }
        if (showContent && contentRef.current) {
            scrollToSection(contentRef);
        }
    }, [session, routines, events, techniques, showContent, fetchEvents, fetchRoutines, fetchTechniques])

    if (events === null || routines === null || techniques === null) {
        return <Loading></Loading>
    }


    return (
        <>
            <Header></Header>
            {
                showOnlyOnHome ? (
                    <div className='App App--home dragon-bg dragon-home'>
                        <div className='kanji-kyoku-bg home-page-kyoku animate__animated animate__fadeInUp'>
                            <h1 className='yuji-boku-regular kihoot-title'>Kihoot</h1>
                            <h2 className='logo-home'>Mejora tu experiencia como practicante de Karate Kyokushin</h2>
                        </div>
                        <div className='landing-page animate__animated animate__fadeInUp'>
                            <h2 className='landing-page-item'>
                                Practicar karate te apasiona, entrenar te encanta pero, sientes que falta algo. 
                                Tal vez una rutina para entrenar, tal vez una forma interactiva de aprender kihon, 
                                tal vez una forma de ver/aprender katas, tal vez encontrar competiciones que te motiven, 
                                tal vez ir a más eventos y vivir nuevas experiencias... Si esto resuena contigo, estas 
                                en el lugar correcto, clica en el botón de abajo y descubre lo que nuestra app
                                ofrece y no olvides registrarte para no perderte nada
                            </h2>
                        </div>
                        {
                            !showContent ? (
                                <div className='home-button-container'>
                                    <BlackCornerWhiteBgButton
                                        title={'Empecemos'}
                                        callback={() => setShowContent(true)}
                                    ></BlackCornerWhiteBgButton>
                                </div>
                            ) : (
                                <div className='main-home-content'>
                                    <div className='animate__animated animate__backInUp' ref={contentRef}>
                                        <Navbar></Navbar>
                                    </div>
                                    <div>
                                        <div className='popular-one-section animate__animated animate__backInLeft'>
                                            <h3 className='popular-section-title'>
                                                Mejora tus entrenamientos con estas rutinas
                                            </h3>
                                            <div className='popular-elems-section'>
                                                {
                                                    routines.slice(0, 3).map((elem) => {
                                                        return (
                                                            <div className='popular-card-container' key={elem.id} onClick={() => navigate('/routine', { state: { id_routine: elem.id } })}>
                                                                <div className='title-desc-container'>
                                                                    <TituloDescripción
                                                                        titulo={elem.title}
                                                                        desc={elem.description}>
                                                                    </TituloDescripción>
                                                                    <p className='username-text'>{elem.username}</p>
                                                                </div>
                                                            </div>
                                                        )

                                                    })
                                                }
                                                <BlackCornerWhiteBgButtonHome title={<FontAwesomeIcon icon={faPlus} />} callback={() => navigate('/searchroutines')}></BlackCornerWhiteBgButtonHome>
                                            </div>
                                        </div>
                                        <div className='popular-one-section animate__animated animate__backInLeft'>
                                            <h3 className='popular-section-title'>
                                                Apuntate a los eventos organizados por la comunidad
                                            </h3>
                                            <div className='popular-elems-section'>
                                                {
                                                    events.slice(0, 3).map((elem) => {
                                                        return (
                                                            <div className='popular-card-container' key={elem.id} onClick={() => navigate('/event', { state: { id_event: elem.id } })}>
                                                                <div className='title-desc-container'>
                                                                    <TituloDescripción
                                                                        titulo={elem.title}
                                                                        desc={elem.description}>
                                                                    </TituloDescripción>
                                                                    <p className='username-text'>Inicio: {elem.date_start}</p>
                                                                </div>
                                                            </div>
                                                        )

                                                    })
                                                }
                                                <BlackCornerWhiteBgButtonHome title={<FontAwesomeIcon icon={faPlus} />} callback={() => navigate('/searchevents')}></BlackCornerWhiteBgButtonHome>
                                            </div>
                                        </div>
                                        <div className='popular-one-section animate__animated animate__backInLeft'>
                                            <h3 className='popular-section-title'>
                                                Aprende técnica, mejora tu kihon y tus katas
                                            </h3>
                                            <div className='popular-elems-section'>
                                                {
                                                    techniques.slice(0, 3).map((elem) => {
                                                        return (
                                                            <div className='popular-card-container' key={elem.id} onClick={() => navigate('/technique', { state: { id_technique: elem.id } })}>
                                                                <div className='title-desc-container'>
                                                                    <TituloDescripción
                                                                        titulo={elem.title}
                                                                        desc={elem.description}>
                                                                    </TituloDescripción>
                                                                    <p className='username-text'>{elem.username}</p>
                                                                </div>
                                                            </div>
                                                        )

                                                    })
                                                }
                                                <BlackCornerWhiteBgButtonHome title={<FontAwesomeIcon icon={faPlus} />} callback={() => navigate('/searchtechniques')}></BlackCornerWhiteBgButtonHome>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <div className='App App--general'>
                        <Outlet></Outlet>
                        <Footer></Footer>
                    </div>
                )
            }
        </>
    );
}

export default App;
