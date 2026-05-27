import React from 'react'

function BlackCornerWhiteBgButton({ title, callback, bgColor='white' }) {
    return (
        <button className='save' onClick={callback} style={{backgroundColor: bgColor}}>
            {title}
        </button>
    )
}

export default BlackCornerWhiteBgButton