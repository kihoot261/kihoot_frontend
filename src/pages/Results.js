import React, { useEffect } from 'react'
import ReturnHome from '../components/ReturnHome';
import { useLocation } from 'react-router';
import { UserAuth } from '../utils/AuthContext';

function Results() {

    const location = useLocation();
    const { corrects, total } = location.state;
    const { session, getUserData, updateUserStats } = UserAuth();

    const updateMyStats = async () => {
        try {
            const data = await getUserData();
            const successes = data[0].n_successes + corrects;
            const failures = data[0].n_failures + (total - corrects);
            const totalQuestions = data[0].total_number_questions + total;
            const ratio = (successes / totalQuestions) * 100;
            const games_played = data[0].games_played + 1;
            await updateUserStats(successes, failures, totalQuestions, ratio, games_played);
        }
        catch (error) {
            console.error('error en updateMyStats de Results.js', error);
        }
    }

    useEffect(() => {
        if (session) {
            updateMyStats();
        }
    });

    return (
        <>
            <h1 className='result-display'>
                Porcentaje de aciertos: {(corrects / total * 100).toFixed(2)}%
            </h1>
            <ReturnHome></ReturnHome>
        </>
    )
}

export default Results