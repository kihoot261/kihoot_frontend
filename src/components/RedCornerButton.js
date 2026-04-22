import React from 'react'
import '../styles/components/_buttons.scss'

function RedCornerButton({ title, callback }) {
    return (
        <button className='red-corner' onClick={callback}>
            {title}
        </button>
    );
}

export default RedCornerButton