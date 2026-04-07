import React, { useRef, useState } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import { errorMessages } from '../utils/errorMessages';
import RegularButton from './RegularButton';

const FormTitleDescription = ({callback}) => {

    const [titleValue, setTitleValue] = useState('');
        const [descriptionValue, setDescriptionValue] = useState('');
        const validator = useRef(new SimpleReactValidator({
        messages: errorMessages
    }));

    const handleChangeTitle = (e) => {
        setTitleValue(e.target.value);
    }

    const handleChangeDescription = (e) => {
        setDescriptionValue(e.target.value);
    }
  return (
    <>
    
    <h2>Crear rutina entrenamiento</h2>

            
                <form onSubmit={callback}>
                    <div>
                        <label htmlFor='title'>Título: </label>
                        <input type="text"
                            value={titleValue}
                            íd='title'
                            onChange={handleChangeTitle}
                            placeholder="Titulo..."></input>
                        <div>
                            {validator.current.message('title', titleValue, 'required')}
                        </div>
                    </div>

                    <div>
                        <label htmlFor='description'>Descripción: </label>
                        <textarea type="text" name='description' rows={5} cols={30}
                            value={descriptionValue}
                            id='description'
                            onChange={handleChangeDescription}
                            placeholder="Descripción rutina..."></textarea>
                        <div>
                            {validator.current.message('description', descriptionValue, 'required')}
                        </div>
                    </div>
                </form>
            
    </>
  )
}

export default FormTitleDescription