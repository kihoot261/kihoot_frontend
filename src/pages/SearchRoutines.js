import React, { useCallback, useEffect, useState } from 'react'
import ReturnHome from '../components/ReturnHome'
import { UserAuth } from '../utils/AuthContext';
import Loading from '../components/Loading';
import RegularButton from '../components/RegularButton';
import { useNavigate } from 'react-router';
import TituloDescripción from '../components/TituloDescripcion';

function SearchRoutines() {

    const { searchRoutines, saveRoutine, getSavedRoutines, session } = UserAuth();
    const [routines, setRoutines] = useState(null);
    const [savedRoutines, setSavedRoutines] = useState(null);
    const [shownRoutines, setShownRoutines] = useState(null);
    const navigate = useNavigate();

    const fetchRoutines = useCallback(async () => {
        try {
            const searchedRoutines = await searchRoutines();
            setRoutines(searchedRoutines.data);
        }
        catch (error) {
            console.error('Error searching routines in SearchRoutines:', error);
            return { success: false, error };
        }
    }, [searchRoutines])

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
            return { success: false, error };
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
        else {
            const savedIds = new Set(savedRoutines.map(item => item.id));
            const routinesToShow = routines.filter(r => !savedIds.has(r.id));
            setShownRoutines(routinesToShow)
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
        if(routines && savedRoutines) filterRoutines();
    }, [fetchRoutines, routines, savedRoutines, session, fetchSavedRoutines, filterRoutines]);

    if (shownRoutines === null) {
        return <Loading></Loading>;
    }

    return (
        <>
            <div>
                <h2>
                    Busca rutinas de entrenamiento
                </h2>
                <div>
                    {
                        shownRoutines.map((routine) => {
                            return (
                                <div key={routine.id} onClick={() => navigate('/routine', {state: {id_routine: routine.id}})}>
                                    <TituloDescripción titulo={routine.title} desc={routine.description}></TituloDescripción>
                                    <p>Creado por: {routine.username}</p>
                                    <RegularButton title='Guardar rutina' callback={(e) => saveTheRoutine(e, routine.id)}></RegularButton>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <ReturnHome></ReturnHome>
        </>
    )
}

export default SearchRoutines