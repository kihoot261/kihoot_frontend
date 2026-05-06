import React from 'react'
import RegularButton from '../buttons/RegularButton';
import { getMinDate } from '../../utils/methods';

const FormDiary = ({
    metricToCount,
    endDate,
    targetReps,
    onMetricChange,
    onDateChange,
    onRepsChange,
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
                    <label htmlFor="metric">
                        Nombre del ejercicio objetivo:
                    </label>
                    <input
                        type='text'
                        value={metricToCount}
                        id='metric'
                        onChange={onMetricChange}
                        placeholder="Metrica a contar..."
                    />
                    {
                        <div className="data--red">{validator.current.message('metric', metricToCount, 'required')}</div>
                    }
                </div>
                <div className='input-and-label-container'>
                    <label htmlFor="endDate">
                        Fecha para llegar al objetivo:
                    </label>
                    <input
                        type='date'
                        value={endDate}
                        id='endDate'
                        min={getMinDate()}
                        onChange={onDateChange}
                        placeholder="Fecha finalización..."
                    />
                </div>
                <div className='input-and-label-container'>
                    <label htmlFor="reps">
                        Número objetivo:
                    </label>
                    <input
                        type='number'
                        value={targetReps}
                        id='reps'
                        onChange={onRepsChange}
                        placeholder="Repeticiones/peso objetivo..."
                    />
                </div>
                <RegularButton title='Guardar diario' type='submit' />

            </form>
        </div>
    )
}

export default FormDiary