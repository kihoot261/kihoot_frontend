import React, { useCallback, useEffect, useState } from 'react'
import ReturnHome from '../components/ReturnHome'
import { UserAuth } from '../utils/AuthContext';
import Loading from '../components/Loading';
import RegularButton from '../components/RegularButton';
import { confirm } from '../components/MyDialog';
function MyRoutines() {

    const { getMyRoutines, getSavedRoutines, unsaveRoutine, deleteRoutine } = UserAuth();
    const [myRoutines, setMyRoutines] = useState(null);
    const [savedRoutines, setSavedRoutines] = useState(null);
    //const navigate = useNavigate();

    const fetchRoutines = useCallback(async () => {
        try {
            const routines = await getMyRoutines();
            setMyRoutines(routines.data);
        }
        catch (error) {
            console.error('Error searching my routines in MyRoutines:', error);
            return { success: false, error };
        }
    }, [getMyRoutines])

    const fetchSavedRoutines = useCallback(async () => {
        try {
            const routines = await getSavedRoutines();
            setSavedRoutines(routines.data);
        }
        catch (error) {
            console.error('Error searching saved routines in MyRoutines:', error);
            return { success: false, error };
        }
    }, [getSavedRoutines])

    const handleUnfavourite = async (e, id_routine) => {
        e.preventDefault();
        try {
            await unsaveRoutine(id_routine);
        }
        catch (error) {
            console.error('error en handleUnfavourite de MyRoutines.js', error);
        }
    }

    const eraseRoutine = async (e, id_routine, title_routine) => {
        e.preventDefault();
        const result = confirm({
            message: 'Seguro que quieres eliminar ' + title_routine
        });

        if (result) {
            try {
                await deleteRoutine(id_routine);
            }
            catch (error) {
                console.error('error en handleUnfavourite de MyRoutines.js', error);
            }
        }
    }

    useEffect(() => {
        if (!myRoutines) {
            fetchRoutines();
        }
        if (!savedRoutines) {
            fetchSavedRoutines();
        }
    }, [fetchSavedRoutines, fetchRoutines, myRoutines, savedRoutines]);

    if (myRoutines === null || savedRoutines === null) {
        return <Loading></Loading>;
    }

    return (
        <>
            <div>
                <h2>Creadas por mi</h2>
                <div>
                    {
                        myRoutines.map((routine) => {
                            return (
                                <div key={routine.id}>
                                    <h3>Titulo: {routine.title}</h3>
                                    <p>Descripción: {routine.description}</p>
                                    <RegularButton title='Eliminar rutina' callback={(e) => eraseRoutine(e, routine.id, routine.title)}></RegularButton>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <h2>Guardadas</h2>
                <div>
                    {
                        savedRoutines.map((routine) => {
                            return (
                                <div key={routine.id} onClick={() => console.log('pa la rutina que me voy')}>
                                    <h3>Titulo: {routine.title}</h3>
                                    <p>Descripción: {routine.description}</p>
                                    <RegularButton title='Quitar de favoritos' callback={(e) => handleUnfavourite(e, routine.id)}></RegularButton>
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

export default MyRoutines