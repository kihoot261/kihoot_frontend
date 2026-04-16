import { useState } from "react"
import RegularButton from "./RegularButton"

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
        <form onSubmit={handleSubmit}>
            <div>
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
                    <div>{validator.current.message('title', titleValue, 'required')}</div>
                }
            </div>

            <div>
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
                    <div>{validator.current.message('description', descriptionValue, 'required')}</div>
                }
            </div>
            {
                !begoneButton && (<RegularButton title={buttonName} type='submit' />)
            }

        </form>
    )
}


export default FormTitleDescription