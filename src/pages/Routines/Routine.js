import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { UserAuth } from '../../utils/AuthContext';
import Loading from '../../components/Loading';
import TituloDescripción from '../../components/TituloDescripcion';
import RegularButton from '../../components/buttons/RegularButton';
import ReturnHome from '../../components/buttons/ReturnHome';
import { confirm } from '../../components/MyDialog';
import { useIsAdmin } from '../../utils/useIsAdmin';
import '../../styles/pages/_routine.scss';
import BlackCornerWhiteBgButton from '../../components/buttons/BlackCornerWhiteBgButton';
import RedCornerIconButton from '../../components/buttons/RedCornerIconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function Routine() { // podriamos cambiarlo a usar params, como en los botones
    const location = useLocation();
    const { id_routine } = location.state || {};
    const { session,
        getRoutineById,
        getExercicesFromRoutineById,
        deleteExercise } = UserAuth();
    const [routine, setRoutine] = useState(null);
    const [exercices, setExercices] = useState(null);
    const [ownsRoutine, setOwnsRoutine] = useState(false);
    const navigate = useNavigate();
    const isAdmin = useIsAdmin();

    const fetchRoutine = useCallback(async () => {
        try {
            const foundRoutine = await getRoutineById(id_routine);
            setRoutine(foundRoutine.data[0]);
            setOwnsRoutine(foundRoutine.data[0].id_user === session?.user.id);
        }
        catch (error) {
            console.error('Error searching routine in Routine.js:', error);
            return { success: false, error };
        }
    }, [getRoutineById, id_routine, session])

    const fetchExercises = useCallback(async () => {
        try {
            const foundExercises = await getExercicesFromRoutineById(id_routine);
            setExercices(foundExercises.data);
        }
        catch (error) {
            console.error('Error searching exercises in Routine.js:', error);
            return { success: false, error };
        }
    }, [getExercicesFromRoutineById, id_routine])

    const eraseExercise = async (id_exercice, title_exercise) => {
        const result = confirm({
            message: 'Seguro que quieres eliminar ' + title_exercise
        });

        if (result) {
            try {
                await deleteExercise(id_exercice);
            }
            catch (error) {
                console.error('error en handleUnfavourite de MyRoutines.js', error);
            }
        }
    }

    useEffect(() => {
        if (session === undefined || id_routine === null) {
            return;
        }
        if (!routine) {
            fetchRoutine();
        }
        if (!exercices) {
            fetchExercises();
        }
    }, [fetchRoutine, fetchExercises, exercices, session, routine, id_routine]);

    if (routine === null || exercices === null) {
        console.log('admin: ', isAdmin)
        return <Loading></Loading>
    }

    return (
        <>
            <h2>{routine.title}</h2>
            <div className='desc-exercice-container-editable'>
                <div>
                    <h3>Descripción: </h3>
                    <p>{routine.description}</p>
                </div>
                <div>
                    {
                        ownsRoutine &&
                        <BlackCornerWhiteBgButton
                            title={<FontAwesomeIcon icon={faPenToSquare} />}
                            callback={() => navigate('/editroutine', { state: { id_routine: routine.id } })}>
                        </BlackCornerWhiteBgButton>
                    }
                </div>

            </div>
            <div>
                <h3>Ejercicios</h3>
                <div className='main-exercices-container'>
                    {
                        exercices.map((exercice) => {
                            return (
                                <div key={exercice.id} className='exercice-container'>
                                    <TituloDescripción
                                        titulo={exercice.title}
                                        desc={exercice.description}>
                                    </TituloDescripción>
                                    <div className='exercice-card-container'>
                                        <ul className='reps-series-container'>
                                            <li className='reps-series-elem'>Repeticiones: {exercice.reps}</li>
                                            <li className='reps-series-elem'>Series: {exercice.series}</li>
                                            <li className='reps-series-elem'>Descanso: {exercice.rest}</li>
                                            {
                                                exercice.source ?
                                                    <li>Video explicativo:
                                                        <a href={exercice.source}>{exercice.source}</a>
                                                    </li>
                                                    :
                                                    <li>Video explicativo: -</li>
                                            }
                                        </ul>
                                        <div>
                                            {
                                                ownsRoutine &&
                                                <div className='edit-and-delete-container'>
                                                    <RedCornerIconButton
                                                        title={<FontAwesomeIcon icon={faTrashCan} />}
                                                        callback={() => eraseExercise(exercice.id, exercice.title)}>
                                                    </RedCornerIconButton>
                                                    <BlackCornerWhiteBgButton
                                                        title={<FontAwesomeIcon icon={faPenToSquare} />}
                                                        callback={() => navigate('/editexercise', { state: { id_exercice: exercice.id, id_routine: routine.id } })}>
                                                    </BlackCornerWhiteBgButton>
                                                </div>

                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="exercices-main-container exercices-main-container--spaced">
                    {
                        ownsRoutine && <RegularButton title='Añadir ejercicio' callback={() => navigate('/addsingleexercise', { state: { id_routine: id_routine } })}></RegularButton>
                    }
                </div>


            </div>
            <ReturnHome></ReturnHome>
        </>

    )
}

export default Routine