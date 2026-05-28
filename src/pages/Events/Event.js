import React, { useCallback, useEffect, useState } from 'react'
import { useIsAdmin } from '../../utils/useIsAdmin';
import { useLocation, useNavigate } from 'react-router';
import { UserAuth } from '../../utils/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../../components/Loading';
import '../../styles/pages/_events.scss';
import { faCalendar, faClock, faUser, faUserGroup, faX } from '@fortawesome/free-solid-svg-icons';
import RedCornerButton from '../../components/buttons/RedCornerButton';
import RedCornerIconButton from '../../components/buttons/RedCornerIconButton';
import GreenCornerButton from '../../components/buttons/GreenCornerButton';
import { confirm } from '../../components/MyDialog';

function Event() {
    const location = useLocation();
    const { id_event } = location.state || {};
    const [event, setEvent] = useState(null);
    const [ownsEvent, setOwnsEvent] = useState(false);
    const [participants, setParticipants] = useState(null);
    const isAdmin = useIsAdmin();
    const { session,
        getEventById,
        getParticipantsById,
        deleteParticipant,
        deleteEvent,
        addParticipant,
        getUserData } = UserAuth();
    const [creator, setCreator] = useState('');
    const [showParticipants, setShowParticipants] = useState(false);
    const navigate = useNavigate();

    const fetchEvent = useCallback(async () => {
        try {
            const foundEvent = await getEventById(id_event);
            setEvent(foundEvent.data[0]);
            setOwnsEvent(foundEvent.data[0].id_user === session?.user.id);
        }
        catch (error) {
            console.error('Error searching event in Event.js:', error);
            return { success: false, error };
        }
    }, [getEventById, id_event, session])

    const fetchParticipants = useCallback(async () => {
        try {
            let usernames = [];
            const foundParticipants = await getParticipantsById(id_event);
            for (const p of foundParticipants.data) {
                usernames.push(p)
                if (p.creator === true) {
                    setCreator(p.username)
                }
            }
            setParticipants(usernames)
        }
        catch (error) {
            console.error('Error searching event in Event.js:', error);
            return { success: false, error };
        }
    }, [getParticipantsById, id_event])

    const displayParticipants = () => {
        setShowParticipants(true);
    }

    const isParticipant = () => {
        const found = participants.find(p => p.id_user === session?.user.id);
        return found !== undefined;
    }

    const quitEvent = useCallback(async () => {
        const result = await confirm({
            message: 'Seguro que quieres salir del evento' + event.title + '?'
        });

        if (result === true) {
            try {
                await deleteParticipant(id_event);
                navigate(-1);
            }
            catch (error) {
                console.error('Error deleting participant in Event.js:', error);
            }
        }

    }, [deleteParticipant, id_event, event, navigate])

    const eraseEvent = useCallback(async () => {
        const result = await confirm({
            message: 'Seguro que quieres eliminar ' + event.title + '?'
        });

        if (result === true) {
            try {
                await deleteEvent(id_event);
                navigate(-1);
            }
            catch (error) {
                console.error('Error deleting event in Event.js:', error);
            }
        }

    }, [deleteEvent, id_event, event, navigate])

    const joinEvent = useCallback(async () => {
        try {
            const user = await getUserData();
            await addParticipant(id_event, session?.user.id, user[0].username)
        }
        catch (error) {
            console.error('Error deleting participant in Event.js:', error);
        }
    }, [addParticipant, getUserData, id_event, session])

    useEffect(() => {
        if (session === undefined || id_event === null) {
            return;
        }
        if (!event) {
            fetchEvent();
        }
        if (!participants) {
            fetchParticipants();
        }
    }, [fetchEvent, session, event, id_event, participants, fetchParticipants]);

    if (event === null || participants === null) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='event-title'>{event.title}</h2>
            <div className='event-container'>
                <div className='event-subinfo-container'>
                    <h3>Descripción: </h3>
                    <p>{event.description}</p>
                </div>
                <div className='event-info-container'>
                    <div className='event-field-and-icon'>
                        <FontAwesomeIcon className="fa-lg" icon={faCalendar} />
                        <p>{event.date_start} - {event.date_end}</p>
                    </div>
                    {
                        (event.time_start !== null || event.time_end !== null) ?
                            (
                                <div className='event-field-and-icon'>
                                    <FontAwesomeIcon className="fa-lg" icon={faClock} />
                                    <p>{event.time_start ? event.time_start : '?'} / {event.time_end ? event.time_end : '?'}</p>
                                </div>
                            ) : (
                                <div className='event-field-and-icon'>
                                    <FontAwesomeIcon className="fa-lg" icon={faClock} />
                                    <p>No definida</p>
                                </div>
                            )
                    }

                    <div className='event-field-and-icon'>
                        <FontAwesomeIcon className="fa-lg" icon={faUserGroup} />
                        <p>{participants.length}</p>
                        {
                            participants.length === 2 && (
                                <p>({participants[0].username}, {participants[1].username})</p>
                            )
                        }
                        {
                            participants.length > 2 && (
                                <span onClick={() => displayParticipants()}>...ver más</span>
                            )
                        }
                    </div>
                    <div className='event-field-and-icon'>
                        <FontAwesomeIcon className="fa-lg" icon={faUser} />
                        <p>{creator}</p>
                    </div>
                    {
                        showParticipants && (
                            <div className='participant-list-container'>
                                <div className='title-and-quitbutton'>
                                    <p className='asistentes-title'>Asistentes</p>
                                    <RedCornerIconButton title={<FontAwesomeIcon icon={faX} className='fa-2xs' />}
                                        callback={() => setShowParticipants(false)}></RedCornerIconButton>
                                </div>

                                {
                                    participants.map((part) => {
                                        return (
                                            <div key={part.id}>
                                                <ul className='participants-list'>
                                                    <li>{part.username}</li>
                                                </ul>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </div>
                {
                    session && (
                        <div>
                            {
                                (ownsEvent || isAdmin) && (
                                    <div className='home-button-container events-buttons'>
                                        <RedCornerButton title='Eliminar evento' callback={() => eraseEvent()}></RedCornerButton>
                                    </div>
                                )
                            }
                            {
                                !ownsEvent && (
                                    isParticipant() ? (
                                        <div className='home-button-container'>
                                            <RedCornerButton title='Salir del evento' callback={() => quitEvent()}></RedCornerButton>
                                        </div>
                                    ) : (
                                        <div className='home-button-container'>
                                            <GreenCornerButton title='Unirse al evento' callback={() => joinEvent()}></GreenCornerButton>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Event