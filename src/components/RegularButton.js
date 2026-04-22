import React from 'react'

function RegularButton({ title, callback }) {
    return (
        <button className='regular' onClick={callback}>
            {title}
        </button>
    );
}

export default RegularButton