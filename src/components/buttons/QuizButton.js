import React from 'react'
import '../../styles/components/_buttons.scss'

function QuizButton({ title, callback, disabledCondition=false }) {
    return (
        <button className='quiz' onClick={callback} style={{ opacity: disabledCondition ? '0.5' : '1' }} disabled={disabledCondition}>
            {title}
        </button>
    );
}

export default QuizButton