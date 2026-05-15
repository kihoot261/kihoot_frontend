import RegularButton from "../buttons/RegularButton";
import { getMinDate } from "../../utils/methods";

const FormEvent = ({
    startDate,
    endDate,
    startTime,
    endTime,
    onStartDateChange,
    onEndDateChange,
    onStartTimeChange,
    onEndTimeChange,
    validator,
    onSubmit,
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    }
    return (
        <div className='main-form-container exercices-main-container'>
            <form onSubmit={handleSubmit} className='regular-form-container'>
                <div className='input-and-label-container'>
                    <label htmlFor="startDate">
                        Fecha inicio evento:
                    </label>
                    <input
                        type='date'
                        value={startDate}
                        id='startDate'
                        min={getMinDate()}
                        onChange={onStartDateChange}
                        placeholder="Fecha inicio..."
                    />
                    {
                        <div className="data--red">{validator.current.message('metric', startDate, 'required')}</div>
                    }
                </div>

                <div className='input-and-label-container'>
                    <label htmlFor="startTime">
                        Hora inicio evento:
                    </label>
                    <input
                        type='time'
                        value={startTime}
                        id='startTime'
                        onChange={onStartTimeChange}
                        placeholder="Hora inicio..."
                    />
                </div>

                <div className='input-and-label-container'>
                    <label htmlFor="endDate">
                        Fecha final evento:
                    </label>
                    <input
                        type='date'
                        value={endDate}
                        id='endDate'
                        min={startDate}
                        onChange={onEndDateChange}
                        placeholder="Fecha finalización..."
                    />
                    {
                        <div className="data--red">{validator.current.message('metric', endDate, 'required')}</div>
                    }
                </div>
                
                <div className='input-and-label-container'>
                    <label htmlFor="endTime">
                        Hora final evento:
                    </label>
                    <input
                        type='time'
                        value={endTime}
                        id='endTime'
                        onChange={onEndTimeChange}
                        placeholder="Hora final..."
                    />
                </div>
                <RegularButton title='Guardar evento' type='submit' />
            </form>
        </div>
    )

}

export default FormEvent