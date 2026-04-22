import React from 'react'
import '../styles/components/_buttons.scss'


function KyuButton({ title, callback, styleColor, styleBorder }) {
    return (
        <button className='kyu' onClick={callback}>
            <svg width="20" height="20">
                <circle
                    cx="10"
                    cy="10"
                    r="9"
                    stroke={styleColor}
                    strokeWidth="2"
                    fill={styleBorder}
                />
                {
                    styleBorder === 'black' && styleColor === 'black' && title === 'Sho-dan'
                    && <line x1="10" y1="0" x2="10" y2="20"
                        stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
                }
                {
                    styleBorder === 'black' && styleColor === 'black' && title === 'Ni-dan'
                    && (
                        <>
                            <line x1="7" y1="2" x2="7" y2="18"
                                stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
                            <line x1="13" y1="2" x2="13" y2="18"
                                stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
                        </>
                    )
                }
            </svg>
            <p>{title}</p>
        </button>
    );
}

export default KyuButton