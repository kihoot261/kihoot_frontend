import RedCornerIconButton from "./RedCornerIconButton";
import RegularButton from "./RegularButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const FormExercice = ({
    nameValue,
    descriptionValue,
    repsValue,
    seriesValue,
    restValue,
    sourceValue,

    onNameChange,
    onDescriptionChange,
    onRepsChange,
    onSeriesChange,
    onRestChange,
    onSourceChange,

    validator,
    onSubmit,
    exercises,
    onRemoveExercise
}) => {

    return (
        <div className='main-form-container exercices-main-container'>
            <form onSubmit={onSubmit} className='regular-form-container'>
                <div className='input-and-label-container'>
                    <label htmlFor="name">
                        Nombre ejercicio:
                    </label>
                    <input
                        type='text'
                        value={nameValue}
                        id='name'
                        onChange={onNameChange}
                        placeholder="Nombre ejercicio..."
                    />
                    {
                        <div className="data--red">{validator.current.message('name', nameValue, 'required')}</div>
                    }
                </div>

                <div className='input-and-label-container'>
                    <label htmlFor='description'>
                        Descripción:
                    </label>
                    <textarea
                        rows={5}
                        cols={30}
                        value={descriptionValue}
                        id='description'
                        onChange={onDescriptionChange}
                        placeholder="Descripción ejercicio..."
                    />
                    {
                        <div className="data--red">{validator.current.message('description', descriptionValue, 'min:5')}</div>
                    }
                </div>

                <div className='input-and-label-container'>
                    <label htmlFor='reps'>
                        Repeticiones:
                    </label>
                    <input
                        type='number'
                        value={repsValue}
                        id='reps'
                        onChange={onRepsChange}
                        placeholder="Número de repeticiones..."
                    />
                    {
                        <div className="data--red">{validator.current.message('reps', repsValue, 'integer')}</div>
                    }
                </div>

                <div className='input-and-label-container'>
                    <label htmlFor='series'>
                        Series:
                    </label>
                    <input
                        type='number'
                        value={seriesValue}
                        id='series'
                        onChange={onSeriesChange}
                        placeholder="Número de series..."
                    />
                    {
                        <div className="data--red">{validator.current.message('series', seriesValue, 'integer')}</div>
                    }
                </div>

                <div className='input-and-label-container'>
                    <label htmlFor='rest'>
                        Descanso:
                    </label>
                    <input
                        type='number'
                        value={restValue}
                        id='rest'
                        onChange={onRestChange}
                        placeholder="Tiempo de descanso..."
                    />
                    {
                        <div className="data--red">{validator.current.message('rest', restValue, 'integer')}</div>
                    }
                </div>

                <div className='input-and-label-container'>
                    <label htmlFor='source'>
                        Video explicativo:
                    </label>
                    <input
                        type='url'
                        value={sourceValue}
                        id='source'
                        onChange={onSourceChange}
                        placeholder="Video explicativo..."
                    />
                    {
                        <div className="data--red">{validator.current.message('source', sourceValue, 'url')}</div>
                    }
                </div>

                <RegularButton title='Guardar ejercicio' type='submit' />
            </form>
            <div className="exercices-count-container">
                {
                    exercises.length > 0 && (
                        <div>
                            <h3>Ejercicios guardados ({exercises.length})</h3>
                            {
                                exercises.map(exercise => (
                                    <div className="single-exercices-container">
                                        <p key={exercise.id} className="exercice-name">
                                            {exercise.title}
                                        </p>
                                        <RedCornerIconButton title={<FontAwesomeIcon icon={faX} className="fa-sm"/>} callback={() => onRemoveExercise(exercise.id)}></RedCornerIconButton>
                                    </div>

                                ))
                            }
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default FormExercice