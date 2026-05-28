import React from 'react'
import { Oval } from 'react-loader-spinner';
import '../styles/components/_loading.scss';
import variables from '../styles/utils/_variables.scss';


function Loading() {
    return (
        <div className='oval-container'>
            <Oval
                height={200}
                width={200}
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor={variables.kihoot_second_grey}
                color='black'
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>
    )
}

export default Loading