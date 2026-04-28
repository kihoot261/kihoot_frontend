import React from 'react'

function BlackCornerWhiteBgButton({ title, callback }) {
    return (
        <button className='save' onClick={callback}>
            {title}
        </button>
    )
}

export default BlackCornerWhiteBgButton