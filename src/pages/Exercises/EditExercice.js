import React, { useRef, useState } from 'react';
import FormExercice from '../../components/forms/FormExercice';
import SimpleReactValidator from 'simple-react-validator';
import { errorMessages } from '../../utils/errorMessages';
import { useLocation, useNavigate } from 'react-router';
import { UserAuth } from '../../utils/AuthContext';

function EditExercice() {
    const [nameValue, setNameValue] = useState('');
    const [descriptionExerciceValue, setDescriptionExerciceValue] = useState('');
    const [sourceValue, setSourceValue] = useState('');
    const [repsValue, setRepsValue] = useState(-1);
    const [seriesValue, setSeriesValue] = useState(-1);
    const [restValue, setRestValue] = useState(-1);
    const location = useLocation();
    const { id_exercice: exId /*, id_routine: routId*/ } = location.state || {};
    const validator = useRef(new SimpleReactValidator({
        messages: errorMessages
    }));
    const navigate = useNavigate();
    const { changeExerciseName,
        changeExerciseDescription,
        changeExerciseReps,
        changeExerciseSeries,
        changeExerciseRest,
        changeExerciseSource } = UserAuth();

    const goBackToRoutine = () => {
        navigate('/myroutines');
    }

    const changeName = async (e) => {
        e.preventDefault();
        if (validator.current.fieldValid('name')) {
            try {
                await changeExerciseName(nameValue, exId);
                goBackToRoutine();
            }
            catch (error) {
                console.error('error en changeName de EditExercice.js', error);
            }
        }
        else {
            validator.current.showMessages();
        }
    }

    const changeDescription = async (e) => {
        e.preventDefault();
        if (validator.current.fieldValid('description')) {
            try {
                await changeExerciseDescription(descriptionExerciceValue, exId);
                goBackToRoutine();
            }
            catch (error) {
                console.error('error en changeDescription de EditExercice.js', error);
            }
        }
        else {
            validator.current.showMessages();
        }
    }

    const changeReps = async (e) => {
        e.preventDefault();
        if (validator.current.fieldValid('reps')) {
            try {
                await changeExerciseReps(repsValue, exId);
                goBackToRoutine();
            }
            catch (error) {
                console.error('error en changeReps de EditExercice.js', error);
            }
        }
        else {
            validator.current.showMessages();
        }
    }

    const changeSeries = async (e) => {
        e.preventDefault();
        if (validator.current.fieldValid('series')) {
            try {
                await changeExerciseSeries(seriesValue, exId);
                goBackToRoutine();
            }
            catch (error) {
                console.error('error en changeSeries de EditExercice.js', error);
            }
        }
        else {
            validator.current.showMessages();
        }
    }

    const changeRest = async (e) => {
        e.preventDefault();
        if (validator.current.fieldValid('rest')) {
            try {
                await changeExerciseRest(restValue, exId);
                goBackToRoutine();
            }
            catch (error) {
                console.error('error en changeRest de EditExercice.js', error);
            }
        }
        else {
            validator.current.showMessages();
        }
    }

    const changeSource = async (e) => {
        e.preventDefault();
        if (validator.current.fieldValid('source')) {
            try {
                await changeExerciseSource(sourceValue, exId);
                goBackToRoutine();
            }
            catch (error) {
                console.error('error en changeSource de EditExercice.js', error);
            }
        }
        else {
            validator.current.showMessages();
        }
    }

    const returnViewMode = (e) => {
        if (nameValue !== '') {
            changeName(e);
        }
        if (descriptionExerciceValue !== '') {
            changeDescription(e);
        }
        if (repsValue >= 0) {
            changeReps(e);
        }
        if (seriesValue >= 0) {
            changeSeries(e);
        }
        if (restValue >= 0) {
            changeRest(e);
        }
        if (sourceValue !== '') {
            changeSource(e);
        }
        else goBackToRoutine();
    }

    return (
        <>
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
                onSubmit={returnViewMode}
                exercises={[]}
            >
            </FormExercice>
        </>
    )
}

export default EditExercice