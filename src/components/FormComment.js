import React, { useState } from 'react'
import RegularButton from './RegularButton';
import '../styles/pages/_technique.scss';

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
        <form onSubmit={handleSubmit} className='main-comment-container'>
            <div>
                <label htmlFor='comment' className='single-comment'>
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
            <div>
                {
                    visibleButton && <RegularButton title={buttonName} type='submit' />
                }
            </div>


        </form>
    )
}

export default FormComment