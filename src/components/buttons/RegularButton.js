import React from 'react'

function RegularButton({ title, callback, disabledCondition=false }) {
    return (
        <button className='regular' onClick={callback} style={{ opacity: disabledCondition ? '0.5' : '1' }} disabled={disabledCondition}>
            {title}
        </button>
    );
}

export default RegularButton