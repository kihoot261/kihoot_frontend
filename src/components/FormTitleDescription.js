import RegularButton from "./RegularButton"

const FormTitleDescription = ({ titleValue,
    descriptionValue,
    onTitleChange,
    onDescriptionChange,
    onSubmit,
    validator,
    buttonName }) => {

    return (
        <form onSubmit={onSubmit}>
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
                    placeholder="Descripción rutina..."
                />
                {
                    <div>{validator.current.message('description', descriptionValue, 'required')}</div>
                }
            </div>
            <RegularButton title={buttonName} type='submit' />
        </form>
    )
}


export default FormTitleDescription