import React, { useCallback, useEffect, useState } from 'react'
import ReturnHome from '../../components/ReturnHome'
import { UserAuth } from '../../utils/AuthContext';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router';
import TituloDescripción from '../../components/TituloDescripcion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import BlackCornerWhiteBgButton from '../../components/BlackCornerWhiteBgButton';

function SearchRoutines() {

    const { searchRoutines, saveRoutine, getSavedRoutines, session } = UserAuth();
    const [routines, setRoutines] = useState(null);
    const [savedRoutines, setSavedRoutines] = useState(null);
    const [shownRoutines, setShownRoutines] = useState(null);
    const navigate = useNavigate();

    const fetchRoutines = useCallback(async () => {
        try {
            const searchedRoutines = await searchRoutines();
            const allRoutines = searchedRoutines.data;
            if (session) {
                const routinesToShow = allRoutines.filter(t => t.id_user !== session?.user.id);
                setRoutines(routinesToShow);
            }
            else {
                setRoutines(allRoutines);
            }
        }
        catch (error) {
            console.error('Error searching routines in SearchRoutines:', error);
            return error;
        }
    }, [searchRoutines, session])

    const fetchSavedRoutines = useCallback(async () => {
        try {
            if (session) {
                const routinesSaved = await getSavedRoutines();
                setSavedRoutines(routinesSaved.data);
            }
            else {
                setSavedRoutines([]);
            }
        }
        catch (error) {
            console.error('Error searching saved routines in SearchRoutines:', error);
            return error;
        }
    }, [getSavedRoutines, session])

    const saveTheRoutine = async (e, id_routine) => {
        e.stopPropagation();
        try {
            await saveRoutine(id_routine);
        }
        catch (error) {
            console.error('error en saveTheRoutine de SearchRoutines.js', error);
        }
    }

    const filterRoutines = useCallback(() => {
        if (!session) {
            setShownRoutines(routines);
        }
        if (routines.length === 0) {
            setShownRoutines([]);
        }
        else {
            const savedIds = new Set(savedRoutines.map(item => item.id));
            const routinesToShow = routines.filter(r => !savedIds.has(r.id));
            setShownRoutines(routinesToShow);
        }
    }, [routines, savedRoutines, session])

    useEffect(() => {
        if (session === undefined) {
            return;
        }
        if (!routines) {
            fetchRoutines();
        }
        if (!savedRoutines) {
            fetchSavedRoutines();
        }
        if (routines && savedRoutines) filterRoutines();
    }, [fetchRoutines, routines, savedRoutines, session, fetchSavedRoutines, filterRoutines]);

    if (shownRoutines === null) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h2>
                Busca rutinas de entrenamiento
            </h2>
            <div className='main-cards-container'>
                {
                    shownRoutines.map((routine) => {
                        return (
                            <div className='info-card-container' key={routine.id} onClick={() => navigate('/routine', { state: { id_routine: routine.id } })}>
                                <div className='title-desc-container'>
                                    <TituloDescripción
                                        titulo={routine.title}
                                        desc={routine.description}>
                                    </TituloDescripción>
                                    <p className='username-text'>{routine.username}</p>
                                </div>
                                <div>
                                    {
                                        session &&
                                        <BlackCornerWhiteBgButton
                                            title={<FontAwesomeIcon icon={faBookmark} />}
                                            callback={(e) => saveTheRoutine(e, routine.id)}>
                                        </BlackCornerWhiteBgButton>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <ReturnHome></ReturnHome>
        </div>
    )
}

export default SearchRoutines