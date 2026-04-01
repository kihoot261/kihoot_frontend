import React from 'react'

function RegularButton({ title, callback }) {
    return (
        <button onClick={callback}>
            {title}
        </button>
    );
}

export default RegularButton