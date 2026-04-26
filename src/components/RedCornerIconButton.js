import React from 'react'

function RedCornerIconButton({ title, callback }) {
    return (
        <button className='red-corner-icon' onClick={callback}>
            {title}
        </button>
    )
}

export default RedCornerIconButton