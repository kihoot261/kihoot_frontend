import React from 'react'
import { useNavigate } from 'react-router';
import ReturnHome from '../components/ReturnHome';

function Routines() {

    const navigate = useNavigate();

    const createRoutine = async (e) => {
        e.preventDefault();
        try {
            navigate('/createroutine');
        }
        catch (error) {
            console.error('error en deleteUser de MyProfile.js', error);
        }
    }

    const searchRoutines = async (e) => {
        e.preventDefault();
        try {
            navigate('/searchroutines');
        }
        catch (error) {
            console.error('error en deleteUser de MyProfile.js', error);
        }
    }

    return (
        <>
            <div>
                <button onClick={createRoutine}>Crear rutina entrenamiento</button>
                <button onClick={searchRoutines}>Buscar rutinas entrenamiento</button>
            </div>
            <ReturnHome></ReturnHome>
        </>
    )
}

export default Routines