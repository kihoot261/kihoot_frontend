import React from 'react'
import '../styles/components/_buttons.scss'

function QuizButton({ title, callback }) {
    return (
        <button className='quiz' onClick={callback}>
            {title}
        </button>
    );
}

export default QuizButton