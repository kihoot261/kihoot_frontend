import React from 'react'

const TituloDescripción = ({ titulo, desc }) => {
    return (
        <div className='title-desc-container'>
            <h3>{titulo}</h3>
            <p>{desc}</p>
        </div>

    )
}

export default TituloDescripción