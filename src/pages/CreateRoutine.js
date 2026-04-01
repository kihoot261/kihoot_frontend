import React, { useState } from 'react'
import ReturnHome from '../components/ReturnHome';
import { v4 as uuidv4 } from 'uuid';
import { UserAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router';

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
    const { createRoutine } = UserAuth();
    const navigate = useNavigate();

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
            await createRoutine(titleValue, descriptionValue, Array.from(exercises));
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
        setRoutineDefined(true);
    }

    return (
        <div>
            <h2>Crear rutina entrenamiento</h2>

            {!routineDefined &&
                <form onSubmit={defineExercices}>
                    <div>
                        <p>Titulo: </p>
                        <input type="text"
                            value={titleValue}
                            required
                            onChange={handleChangeTitle}
                            placeholder="Titulo..."></input>
                    </div>

                    <div>
                        <p>Descripción: </p>
                        <textarea type="text" name='description' rows={5} cols={30}
                            value={descriptionValue}
                            required
                            onChange={handleChangeDescription}
                            placeholder="Descripción rutina..."></textarea>
                    </div>
                    <button type="submit">Añade ejercicios</button>
                </form>
            }

            {routineDefined &&
                <>
                    <form onSubmit={saveExercise}>
                        <div>
                            <input
                                type='text' // añadir labels a todos
                                value={nameValue}
                                onChange={updateCurrentExerciseName}
                                placeholder="Nombre ejercicio..."
                                autoFocus
                                required
                            />
                            <textarea name='description' rows={5} cols={30}
                                value={descriptionExerciceValue}
                                onChange={updateCurrentExerciseDescription}
                                placeholder="Descripción ejercicio..."
                                autoFocus
                                required
                            />
                            <input
                                type='number'
                                value={repsValue}
                                onChange={updateCurrentExerciseReps}
                                placeholder="Número repeticions..."
                                autoFocus
                            />
                            <input
                                type='number'
                                value={seriesValue}
                                onChange={updateCurrentExerciseSeries}
                                placeholder="Número de series..."
                                autoFocus
                            />
                            <input
                                type='number'
                                value={restValue}
                                onChange={updateCurrentExerciseRest}
                                placeholder="Segundos de descanso entre series..."
                                autoFocus
                            />
                            <input
                                type='url' // luego url
                                value={sourceValue}
                                onChange={updateCurrentExerciseSource}
                                placeholder="Link video explicativo..."
                                autoFocus
                            />
                            <button type="submit">✅ Save Exercise</button>
                        </div>
                    </form>

                    {
                        exercises.length > 0 && (
                            <div>
                                <h3>Saved Exercises ({exercises.length})</h3>
                                {
                                    exercises.map(exercise => (
                                        <div key={exercise.id}>
                                            {exercise.title}
                                            <button
                                                type="button"
                                                onClick={() => removeExercise(exercise.id)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))
                                }
                                <button onClick={saveRoutine}>Guarda rutina</button>
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