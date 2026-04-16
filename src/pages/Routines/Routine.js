import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { UserAuth } from '../../utils/AuthContext';
import Loading from '../../components/Loading';
import TituloDescripción from '../../components/TituloDescripcion';
import RegularButton from '../../components/RegularButton';
import ReturnHome from '../../components/ReturnHome';
import { confirm } from '../../components/MyDialog';
import { useIsAdmin } from '../../utils/useIsAdmin';

function Routine() {
    const location = useLocation();
    const { id_routine } = location.state;
    const { session, getRoutineById, getExercicesFromRoutineById, deleteExercise } = UserAuth();
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
        if (session === undefined) {
            return;
        }
        if (!routine) {
            fetchRoutine();
        }
        if (!exercices) {
            fetchExercises();
        }
    }, [fetchRoutine, fetchExercises, exercices, session, routine]);

    if (routine === null || exercices === null) {
        console.log('admin: ', isAdmin)
        return <Loading></Loading>

    }

    return (
        <>
            <div>
                <h1>{routine.title}</h1>
                <h3>Descripción: </h3>
                <p>{routine.description}</p>
                {
                    ownsRoutine && <RegularButton title='Editar rutina' callback={() => navigate('/editroutine', { state: { id_routine: routine.id } })}></RegularButton>
                }
            </div>
            <div>
                <h3>Ejercicios</h3>
                <div>
                    {
                        exercices.map((exercice) => {
                            return (
                                <div key={exercice.id}>
                                    <TituloDescripción titulo={exercice.title} desc={exercice.description}></TituloDescripción>
                                    <ul style={{ display: 'block', width: 'fit-content', marginLeft: '45%' }}>
                                        <li>Repeticiones: {exercice.reps}</li>
                                        <li>Series: {exercice.series}</li>
                                        <li>Descanso: {exercice.rest}</li>
                                    </ul>
                                    {exercice.source && <p>Video explicativo: <a href={exercice.source}>{exercice.source}</a></p>}
                                    {!exercice.source && <p>Video explicativo: -</p>}
                                    {
                                        ownsRoutine &&
                                        <>
                                            <RegularButton title='Eliminar ejercicio' callback={() => eraseExercise(exercice.id, exercice.title)}></RegularButton>
                                            <RegularButton title='Editar ejercicio' callback={() => navigate('/editexercise', { state: { id_exercice: exercice.id, id_routine: routine.id } })}></RegularButton>
                                        </>

                                    }
                                </div>
                            )
                        })
                    }
                </div>
                {
                    ownsRoutine && <RegularButton title='Añadir ejercicio' callback={() => navigate('/addsingleexercise', { state: { id_routine: id_routine } })}></RegularButton>
                }

            </div>
            <ReturnHome></ReturnHome>
        </>

    )
}

export default Routine