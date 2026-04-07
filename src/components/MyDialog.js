import React from 'react';
import { confirmable, createConfirmation } from 'react-confirm';
import RegularButton from './RegularButton';

const MyDialog = (props) => {
    const { proceed, message } = props;

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            top: '0',
            left: '0',
            position: 'fixed',
            background: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
        }}>
            <div>
                <p>{message}</p>
                <RegularButton title='Si' callback={() => proceed(true)}></RegularButton>
                <RegularButton title='No' callback={() => proceed(false)}></RegularButton>
            </div>
        </div>
    );
};

export const confirm = createConfirmation(confirmable(MyDialog));