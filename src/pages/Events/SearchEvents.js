import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import BlackCornerWhiteBgButton from '../../components/buttons/BlackCornerWhiteBgButton';
import { UserAuth } from '../../utils/AuthContext';
import { useNavigate } from 'react-router';
import TituloDescripción from '../../components/TituloDescripcion';
import Loading from '../../components/Loading';

function SearchEvents() {

    const { searchEvents, addParticipant, getSavedEvents, session, getUserData } = UserAuth();
    const [events, setEvents] = useState(null);
    const [savedEvents, setSavedEvents] = useState(null);
    const [shownEvents, setShownEvents] = useState(null);
    const navigate = useNavigate();

    const fetchEvents = useCallback(async () => {
        try {
            const searchedEvents = await searchEvents();
            const allEvents = searchedEvents.data;
            if (session) {
                const eventsToShow = allEvents.filter(t => t.id_user !== session?.user.id);
                setEvents(eventsToShow);
            }
            else {
                setEvents(allEvents);
            }
        }
        catch (error) {
            console.error('Error searching events in SearchEvents:', error);
            return error;
        }
    }, [searchEvents, session])

    const fetchSavedEvents = useCallback(async () => {
        try {
            if (session) {
                const eventsSaved = await getSavedEvents();
                setSavedEvents(eventsSaved.data);
            }
            else {
                setSavedEvents([]);
            }
        }
        catch (error) {
            console.error('Error searching saved events in SearchEvents:', error);
            return error;
        }
    }, [getSavedEvents, session])

    const saveTheEvent = async (e, id_event) => {
        e.stopPropagation();
        try {
            const user = await getUserData();
            await addParticipant(id_event, session?.user.id, user[0].username)
        }
        catch (error) {
            console.error('error en saveTheEvent de SearchEvents.js', error);
        }
    }

    const filterEvents = useCallback(() => {
        if (!session) {
            setShownEvents(events);
        }
        if (events.length === 0) {
            setShownEvents([]);
        }
        else {
            const savedIds = new Set(savedEvents.map(item => item.id));
            const eventsToShow = events.filter(r => !savedIds.has(r.id));
            setShownEvents(eventsToShow);
        }
    }, [events, savedEvents, session])

    useEffect(() => {
        if (session === undefined) {
            return;
        }
        if (!events) {
            fetchEvents();
        }
        if (!savedEvents) {
            fetchSavedEvents();
        }
        if (events && savedEvents) filterEvents();
    }, [fetchEvents, events, savedEvents, session, fetchSavedEvents, filterEvents]);

    if (shownEvents === null) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h2>
                Busca eventos
            </h2>
            <div className='main-cards-container'>
                {
                    shownEvents.map((event) => {
                        return (
                            <div className='info-card-container' key={event.id} onClick={() => navigate('/event', { state: { id_event: event.id } })}>
                                <div className='title-desc-container'>
                                    <TituloDescripción
                                        titulo={event.title}
                                        desc={event.description}>
                                    </TituloDescripción>
                                    <p className='username-text'>{event.username}</p>
                                </div>
                                <div>
                                    {
                                        session &&
                                        <BlackCornerWhiteBgButton
                                            title={<FontAwesomeIcon icon={faBookmark} />}
                                            callback={(e) => saveTheEvent(e, event.id)}>
                                        </BlackCornerWhiteBgButton>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SearchEvents