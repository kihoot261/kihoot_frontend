import React from 'react'
import '../../styles/components/_buttons.scss'

function GreenCornerButton({ title, callback }) {
    return (
        <button className='green-corner' onClick={callback}>
            {title}
        </button>
    );
}

export default GreenCornerButton