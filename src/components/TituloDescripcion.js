import React from 'react'

const TituloDescripción = ({ titulo, desc }) => {
    return (
        <div>
            <h3>Titulo: {titulo}</h3>
            <p>Descripción: {desc}</p>
        </div>

    )
}

export default TituloDescripción