import React, { useState } from 'react'
import RegularButton from './RegularButton';

const FormComment = ({ message, onMessageChange, onSubmit, buttonName }) => {

    const [visibleButton, setVisibleButton] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    }

    const handleChange = (e) => {
        setVisibleButton(e.target.value !== '');
        onMessageChange(e);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='comment'>
                    Comentario:
                </label>
                <textarea
                    rows={5}
                    cols={30}
                    value={message}
                    id='comment'
                    onChange={handleChange}
                    placeholder="Comentario..."
                />
            </div>
            {
                visibleButton && <RegularButton title={buttonName} type='submit' />
            }

        </form>
    )
}

export default FormComment