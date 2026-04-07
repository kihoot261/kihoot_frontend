import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReturnHome from '../components/ReturnHome';
import { v4 as uuidv4 } from 'uuid';
import { UserAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router';
import SimpleReactValidator from 'simple-react-validator';
import { errorMessages } from '../utils/errorMessages';
import RegularButton from '../components/RegularButton';
import Loading from '../components/Loading';

function CreateRoutine() {
    const emptyExercice = {
        id_training: null,
        id: null,
        title: '',
        description: '',
        reps: 0,
        series: 0,
        rest: 0,
        source: ''
    }
    const mainIdTraining = uuidv4();
    const [exercises, setExercises] = useState([]);
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [currentExercise, setCurrentExercise] = useState(emptyExercice);
    const [nameValue, setNameValue] = useState('');
    const [descriptionExerciceValue, setDescriptionExerciceValue] = useState('');
    const [sourceValue, setSourceValue] = useState('');
    const [repsValue, setRepsValue] = useState(0);
    const [seriesValue, setSeriesValue] = useState(0);
    const [restValue, setRestValue] = useState(0);
    const [routineDefined, setRoutineDefined] = useState(false);
    const { createRoutine, session, getUserData } = UserAuth();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const validator = useRef(new SimpleReactValidator({
        messages: errorMessages
    }));

    const updateCurrentExerciseName = (e) => {
        setNameValue(e.target.value);
    };

    const updateCurrentExerciseDescription = (e) => {
        setDescriptionExerciceValue(e.target.value);
    };

    const updateCurrentExerciseReps = (e) => {
        setRepsValue(e.target.value);
    };

    const updateCurrentExerciseSeries = (e) => {
        setSeriesValue(e.target.value);
    };

    const updateCurrentExerciseRest = (e) => {
        setRestValue(e.target.value);
    };

    const updateCurrentExerciseSource = (e) => {
        setSourceValue(e.target.value);
    };

    const resetEverything = () => {
        setCurrentExercise(emptyExercice);
        setNameValue('');
        setDescriptionExerciceValue('');
        setSourceValue('');
        setRepsValue(0);
        setRestValue(0);
        setSeriesValue(0);
    }

    const saveExercise = (e) => {
        e.preventDefault();
        currentExercise.title = nameValue;
        currentExercise.description = descriptionExerciceValue;
        currentExercise.reps = repsValue;
        currentExercise.series = seriesValue;
        currentExercise.rest = restValue;
        currentExercise.source = sourceValue;
        currentExercise.id = uuidv4();
        currentExercise.id_training = mainIdTraining;
        setExercises(prev => [...prev, currentExercise]);
        resetEverything();
    };

    const removeExercise = (id) => {
        setExercises(prev => prev.filter(ex => ex.id !== id));
    };

    const saveRoutine = async (e) => {
        e.preventDefault();
        try {
            await createRoutine(titleValue, descriptionValue, userData.username, Array.from(exercises));
        }
        catch (error) {
            console.error('error en changeSurnames de MyProfile.js', error);
        }
        navigate('/routines');
    }

    const handleChangeTitle = (e) => {
        setTitleValue(e.target.value);
    }

    const handleChangeDescription = (e) => {
        setDescriptionValue(e.target.value);
    }

    const defineExercices = (e) => {
        e.preventDefault();
        if (validator.current.allValid()) {
            setRoutineDefined(true);
        }
        else {
            validator.current.showMessages();
        }
    }

    const fetchData = useCallback(async () => {
        if (session) {
            try {
                const data = await getUserData();
                setUserData(data[0]);
            }
            catch (error) {
                console.error('Error fetching data in MyProfile:', error);
            }
        }
        else {
            console.error('no ha iniciado sesion');
        }

    }, [session, getUserData])

    useEffect(() => {
        if (session && !userData) fetchData();
    }, [fetchData, session, userData]);

    if (userData === null) {
        return <Loading></Loading>; // canviar a un spinner o algo
    }

    return (
        <div>
            <h2>Crear rutina entrenamiento</h2>

            {!routineDefined &&
                <form onSubmit={defineExercices}>
                    <div>
                        <label htmlFor='title'>Título: </label>
                        <input type="text"
                            value={titleValue}
                            íd='title'
                            onChange={handleChangeTitle}
                            placeholder="Titulo..."></input>
                        <div>
                            {validator.current.message('title', titleValue, 'required')}
                        </div>
                    </div>

                    <div>
                        <label htmlFor='description'>Descripción: </label>
                        <textarea type="text" name='description' rows={5} cols={30}
                            value={descriptionValue}
                            id='description'
                            onChange={handleChangeDescription}
                            placeholder="Descripción rutina..."></textarea>
                        <div>
                            {validator.current.message('description', descriptionValue, 'required')}
                        </div>
                    </div>
                    <RegularButton type="submit" title='Añade ejercicios'></RegularButton>
                </form>
            }

            {routineDefined &&
                <>
                    <form onSubmit={saveExercise}>
                        <div>
                            <label for="name">Nombre ejercicio:</label><br></br>
                            <input
                                type='text' // añadir labels a todos
                                value={nameValue}
                                id='name'
                                onChange={updateCurrentExerciseName}
                                placeholder="Nombre ejercicio..."
                                autoFocus
                                required
                            />
                        </div>

                        <div>
                            <label for='description'>Descripción: </label>
                            <textarea name='description' rows={5} cols={30}
                                value={descriptionExerciceValue}
                                id='description'
                                onChange={updateCurrentExerciseDescription}
                                placeholder="Descripción ejercicio..."
                                autoFocus
                                required
                            />

                        </div>

                        <div>
                            <label for='reps'>Repeticiones: </label>
                            <input
                                type='number'
                                value={repsValue}
                                id='reps'
                                onChange={updateCurrentExerciseReps}
                                placeholder="Número de series..."
                                autoFocus
                            />
                        </div>

                        <div>
                            <label for='series'>Series: </label>
                            <input
                                type='number'
                                id='series'
                                value={seriesValue}
                                onChange={updateCurrentExerciseSeries}
                                placeholder="Número de series..."
                                autoFocus
                            />
                        </div>

                        <div>
                            <label for='rest'>Descanso: </label>
                            <input
                                type='number'
                                id='rest'
                                value={restValue}
                                onChange={updateCurrentExerciseRest}
                                placeholder="Segundos de descanso entre series..."
                                autoFocus
                            />

                        </div>

                        <div>
                            <label for='source'>Video explicativo: </label>
                            <input
                                type='url' // luego url
                                value={sourceValue}
                                id='source'
                                onChange={updateCurrentExerciseSource}
                                placeholder="Link video explicativo..."
                                autoFocus
                            />
                        </div>
                        <RegularButton title='Guardar ejercicio' type='submit'></RegularButton>

                    </form>

                    {
                        exercises.length > 0 && (
                            <div>
                                <h3>Ejercicios guardados ({exercises.length})</h3>
                                {
                                    exercises.map(exercise => (
                                        <div key={exercise.id}>
                                            {exercise.title}
                                            <RegularButton title='x' callback={() => removeExercise(exercise.id)}></RegularButton>
                                        </div>
                                    ))
                                }
                                <RegularButton title='Guarda rutina' callback={saveRoutine}></RegularButton>
                            </div>
                        )
                    }
                </>
            }

            <ReturnHome></ReturnHome>
        </div>
    )
}

export default CreateRoutine