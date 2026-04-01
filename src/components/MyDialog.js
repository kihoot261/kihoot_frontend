import React from 'react';
import { confirmable, createConfirmation } from 'react-confirm';

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
                <button onClick={() => proceed(true)}>Yes</button>
                <button onClick={() => proceed(false)}>No</button>
            </div>
        </div>
    );
};

export const confirm = createConfirmation(confirmable(MyDialog));