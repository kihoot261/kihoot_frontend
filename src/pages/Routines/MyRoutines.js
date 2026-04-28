import React, { useCallback, useEffect, useState } from 'react';
import ReturnHome from '../../components/buttons/ReturnHome';
import { UserAuth } from '../../utils/AuthContext';
import Loading from '../../components/Loading';
import { confirm } from '../../components/MyDialog';
import { useNavigate } from 'react-router';
import TituloDescripción from '../../components/TituloDescripcion';
import RedCornerIconButton from '../../components/buttons/RedCornerIconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faBookmark } from '@fortawesome/free-solid-svg-icons';
import BlackCornerWhiteBgButton from '../../components/buttons/BlackCornerWhiteBgButton';

function MyRoutines() {

    const { getMyRoutines,
        getSavedRoutines,
        unsaveRoutine,
        deleteRoutine } = UserAuth();
    const [myRoutines, setMyRoutines] = useState(null);
    const [savedRoutines, setSavedRoutines] = useState(null);
    const navigate = useNavigate();

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
            navigate('/');
        }
        catch (error) {
            console.error('error en handleUnfavourite de MyRoutines.js', error);
        }
    }

    const eraseRoutine = async (e, id_routine, title_routine) => {
        e.preventDefault();
        const result = await confirm({
            message: 'Seguro que quieres eliminar ' + title_routine + '?'
        });

        if (result === true) {
            try {
                await deleteRoutine(id_routine);
                navigate('/');
            }
            catch (error) {
                console.error('error en eraseExercise de MyRoutines.js', error);
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
                <div className='main-cards-container'>
                    {
                        myRoutines.map((routine) => {
                            return (
                                <div className='info-card-container' key={routine.id} onClick={() => navigate('/routine', { state: { id_routine: routine.id } })}>
                                    <div className='title-desc-container'>
                                        <TituloDescripción
                                            titulo={routine.title}
                                            desc={routine.description}>
                                        </TituloDescripción>
                                    </div>
                                    <div>
                                        <RedCornerIconButton
                                            title={<FontAwesomeIcon icon={faTrashCan} />}
                                            callback={(e) => eraseRoutine(e, routine.id, routine.title)}>
                                        </RedCornerIconButton>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <h2>Guardadas</h2>
                <div className='main-cards-container'>
                    {
                        savedRoutines.map((routine) => {
                            return (
                                <div className='info-card-container' key={routine.id} onClick={() => navigate('/routine', { state: { id_routine: routine.id } })}>
                                    <div className='title-desc-container'>
                                        <TituloDescripción
                                            titulo={routine.title}
                                            desc={routine.description}>
                                        </TituloDescripción>
                                    </div>
                                    <div>
                                        <BlackCornerWhiteBgButton
                                            title={<FontAwesomeIcon icon={faBookmark} />}
                                            callback={(e) => handleUnfavourite(e, routine.id)}>
                                        </BlackCornerWhiteBgButton>
                                    </div>
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