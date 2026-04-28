import { useState } from "react"
import RegularButton from "../buttons/RegularButton";

const FormTitleDescription = ({ titleValue,
    descriptionValue,
    onTitleChange,
    onDescriptionChange,
    onSubmit,
    validator,
    buttonName }) => {

    const [begoneButton, setBegoneButton] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        validator.current.allValid() ? setBegoneButton(true) : setBegoneButton(false);
        onSubmit(e);
    }

    return (
        <div className='main-form-container'>
            <form onSubmit={handleSubmit} className='regular-form-container'>
                <div className='input-and-label-container'>
                    <label htmlFor='title'>
                        Título:
                    </label>
                    <input
                        type="text"
                        value={titleValue}
                        id='title'
                        onChange={onTitleChange}
                        placeholder="Titulo..."
                    />
                    {
                        <div className="data--red">{validator.current.message('title', titleValue, 'required')}</div>
                    }
                </div>

                <div className='input-and-label-container'>
                    <label htmlFor='description'>
                        Descripción:
                    </label>
                    <textarea
                        type="text"
                        name='description'
                        rows={5}
                        cols={30}
                        value={descriptionValue}
                        id='description'
                        onChange={onDescriptionChange}
                        placeholder="Descripción..."
                    />
                    {
                        <div className="data--red">{validator.current.message('description', descriptionValue, 'required')}</div>
                    }
                </div>
                {
                    !begoneButton && (<RegularButton title={buttonName} type='submit' />)
                }

            </form>
        </div>

    )
}


export default FormTitleDescription