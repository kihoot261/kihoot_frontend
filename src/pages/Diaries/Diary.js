import React, { useCallback, useEffect, useState } from 'react'
import { UserAuth } from '../../utils/AuthContext';
import Loading from '../../components/Loading';
import { useLocation, useNavigate } from 'react-router';
import { diffBetweenDates, getMinDate } from '../../utils/methods';
import BarChart from '../../components/BarChart';
import RegularButton from '../../components/buttons/RegularButton';

function Diary() {

    const location = useLocation();
    const { id_diary } = location.state;
    const [diary, setDiary] = useState(null);
    const [entries, setEntries] = useState(null);
    const { session, getDiaryById, getDiaryEntries } = UserAuth();
    const [entriesDates, setEntriesDates] = useState([]);
    const [entriesReps, setEntriesReps] = useState([]);
    const [entriesNotes, setEntriesNotes] = useState([]);
    const today = getMinDate();
    const navigate = useNavigate();

    const getDataForChart = useCallback(async () => {
        const start = new Date(diary.date_start);
        const end = new Date(diary.date_end);
        const allDates = [];

        while (start <= end) {
            allDates.push(start.toISOString().split('T')[0]);
            start.setDate(start.getDate() + 1);
        }

        let reps = [];
        let notes = [];
        let dates = [];
        for (const date of allDates) {
            const foundEntry = entries.find(entry => entry.date === date)
            if (foundEntry) {
                reps.push(foundEntry.reps);
                dates.push(foundEntry.date);
                foundEntry.note ? notes.push(foundEntry.note) : notes.push('');
            }
            else {
                reps.push(0);
                dates.push(date);
                notes.push('');
            }

        }
        setEntriesDates(dates);
        setEntriesReps(reps);
        setEntriesNotes(notes);
    }, [entries, diary])

    const availableEntry = () => {
        const foundEntry = entries.find(entry => entry.date === today);
        if (foundEntry || diary.date_end <= today) {
            return true;
        }
        else {
            return false;
        }
    }

    const fetchDiary = useCallback(async () => {
        try {
            const foundDiary = await getDiaryById(id_diary);
            setDiary(foundDiary.data[0]);
        }
        catch (error) {
            console.error('Error searching diary in Diary.js:', error);
            return { success: false, error };
        }
    }, [getDiaryById, id_diary])

    const fetchEntries = useCallback(async () => {
        try {
            const foundEntries = await getDiaryEntries(id_diary);
            setEntries(foundEntries.data);
        }
        catch (error) {
            console.error('Error searching entries in Diary.js:', error);
            return { success: false, error };
        }
    }, [getDiaryEntries, id_diary])

    useEffect(() => {
        if (session === undefined) {
            return;
        }
        if (!diary) {
            fetchDiary();
        }
        if (!entries) {
            fetchEntries();
        }
        if (entries && diary) {
            getDataForChart();
        }
    }, [diary, entries, fetchDiary, fetchEntries, session, getDataForChart])

    if (diary === null || entries === null) {
        return <Loading></Loading>
    }

    return (
        <div className='main-exercices-container'>
            <h2>{diary.title}</h2>
            <div className='desc-exercice-container'>
                <h3>Descripción: </h3>
                <p>{diary.description}</p>
            </div>
            <div>
                <BarChart labels={entriesDates} inputs={entriesReps} notes={entriesNotes} label={diary.metric_to_count}></BarChart>
            </div>
            {
                !diary.completed && (
                    <div className='main-exercices-container'>
                        <div className='diary-container'>
                            {
                                diary.date_end > today && (
                                    <div>
                                        <h3>Dias hechos: <span className='data--blue'>{diffBetweenDates(today, diary.date_start) + 1}</span> / {diffBetweenDates(diary.date_end, diary.date_start)}</h3>
                                    </div>
                                )
                            }
                            {
                                diary.target_reps !== 0 && ( // añadir los dias que más se han hecho
                                    <div>
                                        <h3>Objetivo de <span className='data--blue'>{diary.metric_to_count}</span>: {diary.target_reps}</h3>
                                    </div>
                                )
                            }
                        </div>
                        <RegularButton title='Añadir progreso' callback={() => navigate('/diaryentry', { state: { id_diary: id_diary, date_end: diary.date_end, target_reps: diary.target_reps } })} disabledCondition={availableEntry()}></RegularButton>
                    </div>

                )

            }
        </div>
    )
}

export default Diary