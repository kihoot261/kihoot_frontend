import React from 'react';
import { confirmable, createConfirmation } from 'react-confirm';
import RegularButton from './buttons/RegularButton';
import RedCornerIconButton from './buttons/RedCornerIconButton';

const MyDialog = (props) => {
    const { proceed, message } = props;

    return (
        <div className='deletion-screen'>
            <div>
                <p className='deletion-text'>{message}</p>
                <div className='confirm-deletion-container'>
                    <RedCornerIconButton title='Si' callback={() => proceed(true)}></RedCornerIconButton>
                    <RegularButton title='No' callback={() => proceed(false)}></RegularButton>
                </div>

            </div>
        </div>
    );
};

export const confirm = createConfirmation(confirmable(MyDialog));