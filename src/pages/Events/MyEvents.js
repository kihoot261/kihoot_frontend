import React, { useCallback, useEffect, useState } from 'react'
import { UserAuth } from '../../utils/AuthContext';
import TituloDescripción from '../../components/TituloDescripcion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BlackCornerWhiteBgButton from '../../components/buttons/BlackCornerWhiteBgButton';
import { faTrashCan, faBookmark } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router';
import { confirm } from '../../components/MyDialog';
import RedCornerIconButton from '../../components/buttons/RedCornerIconButton';

function MyEvents() {

    const { getSavedEvents, getMyEvents, deleteEvent, deleteParticipant } = UserAuth();
    const [myEvents, setMyEvents] = useState(null);
    const [savedEvents, setSavedEvents] = useState(null);
    const navigate = useNavigate();

    const fetchEvents = useCallback(async () => {
        try {
            const events = await getMyEvents();
            setMyEvents(events.data);
        }
        catch (error) {
            console.error('Error searching events in MyEvents:', error);
            return error;
        }
    }, [getMyEvents])

    const fetchSavedEvents = useCallback(async () => {
        try {
            const eventsSaved = await getSavedEvents();
            setSavedEvents(eventsSaved.data);
        }
        catch (error) {
            console.error('Error searching saved events in MyEvents:', error);
            return error;
        }
    }, [getSavedEvents])

    const eraseEvent = async (e, id_event, title_event) => {
        e.preventDefault();
        const result = await confirm({
            message: 'Seguro que quieres eliminar ' + title_event + '?'
        });

        if (result === true) {
            try {
                await deleteEvent(id_event);
                navigate('/mythings');
            }
            catch (error) {
                console.error('error en eraseEvent de MyEvents.js', error);
            }
        }
    }

    const deleteSavedEvent = async (e, id_event) => {
        e.preventDefault()
        try {
            await deleteParticipant(id_event);
            navigate('/mythings');
        }
        catch (error) {
            console.error('error en deleteSavedEvent de MyEvents.js', error);
        }
    }

    useEffect(() => {
        if (!myEvents) {
            fetchEvents();
        }
        if (!savedEvents) {
            fetchSavedEvents();
        }
    }, [fetchSavedEvents, fetchEvents, myEvents, savedEvents]);

    if (myEvents === null || savedEvents === null) {
        return <Loading></Loading>;
    }

    return (
        <>
            <div>
                <h2>Creados por mi</h2>
                <div className='main-cards-container'>
                    {
                        myEvents.map((event) => {
                            return (
                                <div className='info-card-container' key={event.id} onClick={() => navigate('/routine', { state: { id_routine: event.id } })}>
                                    <div className='title-desc-container'>
                                        <TituloDescripción
                                            titulo={event.title}
                                            desc={event.description}>
                                        </TituloDescripción>
                                    </div>
                                    <div>
                                        <RedCornerIconButton
                                            title={<FontAwesomeIcon icon={faTrashCan} />}
                                            callback={(e) => eraseEvent(e, event.id, event.title)}
                                        >
                                        </RedCornerIconButton>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <h2>En los que estoy apuntado</h2>
                <div className='main-cards-container'>
                    {
                        savedEvents.map((event) => {
                            return (
                                <div className='info-card-container' key={event.id} onClick={() => navigate('/event', { state: { id_event: event.id } })}>
                                    <div className='title-desc-container'>
                                        <TituloDescripción
                                            titulo={event.title}
                                            desc={event.description}>
                                        </TituloDescripción>
                                    </div>
                                    <div>
                                        <BlackCornerWhiteBgButton
                                            title={<FontAwesomeIcon icon={faBookmark} />}
                                            callback={(e) => deleteSavedEvent(e, event.id)}
                                        >
                                        </BlackCornerWhiteBgButton>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default MyEvents