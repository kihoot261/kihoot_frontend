import RegularButton from "./RegularButton";

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
    <>
      <form onSubmit={onSubmit}>
        <div>
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
            <div>{validator.current.message('name', nameValue, 'required')}</div>
          }
        </div>

        <div>
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
            <div>{validator.current.message('description', descriptionValue, 'min:5')}</div>
          }
        </div>

        <div>
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
            <div>{validator.current.message('reps', repsValue, 'integer')}</div>
          }
        </div>

        <div>
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
            <div>{validator.current.message('series', seriesValue, 'integer')}</div>
          }
        </div>

        <div>
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
            <div>{validator.current.message('rest', restValue, 'integer')}</div>
          }
        </div>

        <div>
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
            <div>{validator.current.message('source', sourceValue, 'url')}</div>
          }
        </div>

        <RegularButton title='Guardar ejercicio' type='submit' />
      </form>
      {
        exercises.length > 0 && (
          <div>
            <h3>Ejercicios guardados ({exercises.length})</h3>
            {
              exercises.map(exercise => (
                <div key={exercise.id}>
                  {exercise.title}
                  <RegularButton title='x' callback={() => onRemoveExercise(exercise.id)}></RegularButton>
                </div>
              ))
            }
          </div>
        )
      }
    </>
  );
};

export default FormExercice