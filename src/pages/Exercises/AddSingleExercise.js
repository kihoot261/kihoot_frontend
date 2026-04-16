import React, { useRef, useState } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import { errorMessages } from '../../utils/errorMessages';
import FormExercice from '../../components/FormExercice';
import { useLocation, useNavigate } from 'react-router';
import { checkNaturals } from '../../utils/methods';
import { UserAuth } from '../../utils/AuthContext';

function AddSingleExercise() {
    const [nameValue, setNameValue] = useState('');
    const [descriptionExerciceValue, setDescriptionExerciceValue] = useState('');
    const [sourceValue, setSourceValue] = useState('');
    const [repsValue, setRepsValue] = useState(0);
    const [seriesValue, setSeriesValue] = useState(0);
    const [restValue, setRestValue] = useState(0);
    const validator = useRef(new SimpleReactValidator({
        messages: errorMessages
    }));
    const location = useLocation();
    const { id_routine } = location.state;
    const { addExercise } = UserAuth();
    const navigate = useNavigate();

    const saveSingleExercise = async (e) => {
        e.preventDefault();
        if (validator.current.allValid()) {
            try {
                await addExercise(id_routine, nameValue, descriptionExerciceValue, checkNaturals(repsValue), checkNaturals(seriesValue), checkNaturals(restValue), sourceValue);
                navigate('/routine', { state: { id_routine: id_routine } })

            }
            catch (error) {
                console.error('error en saveSingleExercise de AddSingleExercise.js', error);
            }
        }
        else {
            validator.current.showMessages();
        }

    };

    return (
        <FormExercice
            nameValue={nameValue}
            descriptionValue={descriptionExerciceValue}
            repsValue={repsValue}
            seriesValue={seriesValue}
            restValue={restValue}
            sourceValue={sourceValue}
            onNameChange={(e) => setNameValue(e.target.value)}
            onDescriptionChange={(e) => setDescriptionExerciceValue(e.target.value)}
            onRepsChange={(e) => setRepsValue(e.target.value)}
            onSeriesChange={(e) => setSeriesValue(e.target.value)}
            onRestChange={(e) => setRestValue(e.target.value)}
            onSourceChange={(e) => setSourceValue(e.target.value)}
            validator={validator}
            onSubmit={saveSingleExercise}
            exercises={[]}
        ></FormExercice>
    )
}

export default AddSingleExercise