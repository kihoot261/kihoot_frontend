import React, { useRef, useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { errorMessages } from '../utils/errorMessages';
import { useLocation, useNavigate } from 'react-router';
import { UserAuth } from '../utils/AuthContext';
import ReturnHome from '../components/ReturnHome';
import FormTitleDescription from '../components/FormTitleDescription';

function EditRoutine() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const location = useLocation();
    const { id_routine } = location.state;
    const {changeRoutineTitle, changeRoutineDescription} = UserAuth();
    const validator = useRef(new SimpleReactValidator({
        messages: errorMessages
    }));
    const navigate = useNavigate();

    const changeTitle = async (e) => {
        e.preventDefault();
        if (validator.current.fieldValid('title')) {
            try {
                await changeRoutineTitle(title, id_routine);
                navigate('/routine', {state: {id_routine: id_routine}});
            }
            catch (error) {
                console.error('error en changeTitle de EditRoutine.js', error);
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
                await changeRoutineDescription(desc, id_routine);
                navigate('/routine', {state: {id_routine: id_routine}});
            }
            catch (error) {
                console.error('error en changeDescription de EditRoutine.js', error);
            }
        }
        else {
            validator.current.showMessages();
        }
    }

    const returnViewMode = (e) => {
        if (title !== '') {
            changeTitle(e);
        }
        if (desc !== '') {
            changeDescription(e);
        }
        navigate('/routine', {state: {id_routine: id_routine}});
    }
    return (
        <>
            <FormTitleDescription
                    titleValue={title}
                    descriptionValue={desc}
                    onTitleChange={(e) => setTitle(e.target.value)}
                    onDescriptionChange={(e) => setDesc(e.target.value)}
                    onSubmit={returnViewMode}
                    validator={validator}
                    buttonName={'Actualiza'}
                />
            <ReturnHome></ReturnHome>
        </>
    )
}

export default EditRoutine