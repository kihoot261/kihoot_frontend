import RegularButton from "../buttons/RegularButton";

const FormEntryDiary = ({ noteValue,
    repsValue,
    onNoteChange,
    onRepsChange,
    onSubmit,
    validator,
    buttonName }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    }

    return (
        <div className='main-form-container'>
            <form onSubmit={handleSubmit} className='regular-form-container'>
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
                    <label htmlFor='note'>
                        Nota:
                    </label>
                    <textarea
                        type="text"
                        name='note'
                        rows={5}
                        cols={30}
                        value={noteValue}
                        id='note'
                        onChange={onNoteChange}
                        placeholder="Notas adicionales..."
                    />
                </div>
                <RegularButton title={buttonName} type='submit' />
            </form>
        </div>

    )
}


export default FormEntryDiary