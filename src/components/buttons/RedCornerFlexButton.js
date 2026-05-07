import React from 'react'

function RedCornerFlexButton({ title, callback }) {
  return (
    <button className='red-corner-flex' onClick={callback}>
            {title}
        </button>
  )
}

export default RedCornerFlexButton