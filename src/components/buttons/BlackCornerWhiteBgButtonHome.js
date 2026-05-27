import React from 'react'

function BlackCornerWhiteBgButtonHome({ title, callback }) {
  return (
        <button className='save save--home' onClick={callback}>
            {title}
        </button>
    )
}

export default BlackCornerWhiteBgButtonHome;