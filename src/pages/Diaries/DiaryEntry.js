import React, { useRef, useState } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import { errorMessages } from '../../utils/errorMessages';
import { useLocation, useNavigate } from 'react-router';
import { UserAuth } from '../../utils/AuthContext';
import FormEntryDiary from '../../components/forms/FormEntryDiary';
import { getMinDate } from '../../utils/methods';

function DiaryEntry() {
    const [noteValue, setNoteValue] = useState('');
    const [repsValue, setRepsValue] = useState(0);
    const location = useLocation();
    const { id_diary, date_end, target_reps } = location.state || {};
    const validator = useRef(new SimpleReactValidator({
        messages: errorMessages
    }));
    const navigate = useNavigate();
    const { insertDiaryProgress, closeDiary } = UserAuth();
    const today = getMinDate();

    const goBackToDiaries = async () => {
        if (target_reps <= repsValue || today >= date_end) {
            await closeDiary(id_diary);
        }
        navigate('/mydiaries');
    }

    const insertMetric = async (e) => {
        e.preventDefault();
        if (validator.current.allValid()) {
            try {
                await insertDiaryProgress(id_diary, repsValue, noteValue, today);
                goBackToDiaries();
            }
            catch (error) {
                console.error('error en insertMetric de DiaryEntry.js', error);
            }
        }
        else {
            validator.current.showMessages();
        }
        goBackToDiaries();
    }

    return (
        <>
            <FormEntryDiary
                noteValue={noteValue}
                repsValue={repsValue}
                onNoteChange={(e) => setNoteValue(e.target.value)}
                onRepsChange={(e) => setRepsValue(e.target.value)}
                validator={validator}
                onSubmit={insertMetric}
                buttonName={'Añadir progreso'}
            >
            </FormEntryDiary>
        </>
    )
}

export default DiaryEntry