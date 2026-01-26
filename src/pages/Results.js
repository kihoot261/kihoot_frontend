import React from 'react'
import { useLocation } from 'react-router-dom';

function Results() {

    const location = useLocation();
    const { corrects, total } = location.state;

    return (
        <>
        <div>
            Results
        </div>
        <div>
            {
                corrects/total*100
            }
        </div>
        </>
    )
}

export default Results