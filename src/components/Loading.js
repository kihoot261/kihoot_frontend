import React from 'react'
import { Oval } from 'react-loader-spinner';
import '../styles/components/_loading.scss';

function Loading() {
    return (
        <div className='oval-container'>
            <Oval
                height={200}
                width={200}
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#979797"
                color='#000000'
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>
    )
}

export default Loading