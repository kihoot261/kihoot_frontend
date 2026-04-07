import React, { useRef, useState } from 'react'
import RegularButton from '../components/RegularButton';
import SimpleReactValidator from 'simple-react-validator';
import { errorMessages } from '../utils/errorMessages';
import { useLocation, useNavigate } from 'react-router';
import { UserAuth } from '../utils/AuthContext';
import ReturnHome from '../components/ReturnHome';

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

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleChangeDescription = (e) => {
        setDesc(e.target.value);
    }

    const changeTitle = async (e) => {
        e.preventDefault();
        if (validator.current.fieldValid('title')) {
            try {
                await changeRoutineTitle(title, id_routine);
                navigate(-1);
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
        if (validator.current.fieldValid('desc')) {
            try {
                await changeRoutineDescription(desc, id_routine);
                navigate(-1);
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
        navigate('/')
    }
    return (
        <>
            <form onSubmit={returnViewMode}>
                <div>
                    <label htmlFor='title'>Canviar nombre: </label>
                    <input type="text"
                        id='title'
                        value={title}
                        onChange={handleChangeTitle}
                        placeholder="Nuevo titulo..."></input>
                    <div>
                        {validator.current.message('title', title, 'required')}
                    </div>
                </div>
                <div>
                    <label htmlFor='description'>Canviar nombre: </label>
                    <textarea type="text"
                        id='description'
                        value={desc}
                        onChange={handleChangeDescription}
                        placeholder="Nueva descripción..."></textarea>
                    <div>
                        {validator.current.message('desc', desc, 'required')}
                    </div>
                </div>
                <RegularButton title='Actualiza' type='submit'></RegularButton>
            </form>
            <ReturnHome></ReturnHome>
        </>
    )
}

export default EditRoutine