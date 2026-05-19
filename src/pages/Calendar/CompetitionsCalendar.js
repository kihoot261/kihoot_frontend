import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import FormEvent from '../../components/forms/FormEvent';
import SimpleReactValidator from 'simple-react-validator';
import { errorMessages } from '../../utils/errorMessages';
import { getMinDate, splitDateTime } from '../../utils/methods';
import FormTitleDescription from '../../components/forms/FormTitleDescription';
import { confirm } from '../../components/MyDialog';
import Loading from '../../components/Loading';
import { UserAuth } from '../../utils/AuthContext';
import { useIsAdmin } from '../../utils/useIsAdmin';
import '../../styles/pages/_calendar.scss'

const myStartOfWeek = (date) => startOfWeek(date, { weekStartsOn: 1 });

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: myStartOfWeek,
    getDay,
    locales: { enUS },
});

function CompetitionsCalendar() {
    const [events, setEvents] = useState(null);
    const [titleValue, setTitleValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [titleDescDefined, setTitleDescDefined] = useState(false);
    const today = getMinDate()
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('00:00');
    const validator = useRef(
        new SimpleReactValidator({
            messages: errorMessages,
        })
    );
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { getCalendarEvents, createCalendarEvent, deleteCalendarEvent } = UserAuth();
    const isAdmin = useIsAdmin();

    const formatEvent = (id, title, start, end, time_start, time_end) => {
        const dateStartSplit = splitDateTime(start, '-');
        const dateEndSplit = splitDateTime(end, '-');
        const timeStartSplit = splitDateTime(time_start, ':');
        const timeEndSplit = splitDateTime(time_end, ':');
        const newEvent = {
            title: title,
            id: id,
            start: new Date(Number(dateStartSplit[0]),
                Number(dateStartSplit[1]) - 1,
                Number(dateStartSplit[2]),
                Number(timeStartSplit[0]),
                Number(timeStartSplit[1])),
            end: new Date(Number(dateEndSplit[0]),
                Number(dateEndSplit[1]) - 1,
                Number(dateEndSplit[2]),
                Number(timeEndSplit[0]),
                Number(timeEndSplit[1])),
        }
        return newEvent;
    }

    const fetchEvents = useCallback(async () => {
        try {
            let arrEvents = [];
            const foundEvents = await getCalendarEvents();
            for (const e of foundEvents.data) {
                const newEvent = formatEvent(e.id, e.title, e.date_start, e.date_end, e.time_start, e.time_end);
                arrEvents.push(newEvent);
            }
            setEvents(arrEvents);
        }
        catch (error) {
            console.error('Error searching events in CompetitionsCalendar:', error);
            return error;
        }
    }, [getCalendarEvents])

    const addEvent = async (title, start, end, time_start, time_end) => {

        try {
            await createCalendarEvent(titleValue, descriptionValue, startDate, endDate, startTime, endTime);
            setIsFormOpen(false);
        }
        catch (error) {
            console.error('error en addEvent de CompetitionsCalendar.js', error);
        }
    };

    const handleEventDelete = async (eventToDelete) => {
        const result = await confirm({
            message: 'Seguro que quieres eliminar ' + eventToDelete.title + '?'
        });

        if (result === true) {
            try {
                await deleteCalendarEvent(eventToDelete.id);
            }
            catch (error) {
                console.error('error en handleEventDelete de CompetitionsCalendar.js', error);
            }
        }

    };

    const handleSelectSlot = (slotInfo) => {
        setIsFormOpen(true);
        setStartDate(format(slotInfo.start, 'yyyy-MM-dd'))
        setEndDate(format(slotInfo.start, 'yyyy-MM-dd'))
    };

    const setDateEvent = (e) => {
        e.preventDefault();
        if (validator.current.allValid()) {
            setTitleDescDefined(true);
        } else {
            validator.current.showMessages();
        }
    };

    useEffect(() => {
        if (!events) {
            fetchEvents();
        }
    }, [fetchEvents, events]);

    if (events === null) {
        return <Loading></Loading>
    }

    return (
        <div className='home-button-container calendar-container'>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ width: '80%', height: 500 }}
                selectable={isAdmin}
                views={['month', 'week', 'day']}
                toolbar={true}
                defaultView='month'
                min={new Date()}
                onSelectSlot={(slotInfo) => handleSelectSlot(slotInfo)}
                onSelectEvent={(e) => handleEventDelete(e)}
            />

            {
                (isFormOpen) && (
                    <div>
                        <FormTitleDescription
                            titleValue={titleValue}
                            descriptionValue={descriptionValue}
                            onTitleChange={(e) => setTitleValue(e.target.value)}
                            onDescriptionChange={(e) =>
                                setDescriptionValue(e.target.value)
                            }
                            onSubmit={setDateEvent}
                            validator={validator}
                            buttonName={"Añade fecha evento"}>

                        </FormTitleDescription>
                        {
                            titleDescDefined && (
                                <FormEvent
                                    startDate={startDate}
                                    endDate={endDate}
                                    startTime={startTime}
                                    endTime={endTime}
                                    onStartDateChange={(e) => setStartDate(e.target.value)}
                                    onEndDateChange={(e) => setEndDate(e.target.value)}
                                    onStartTimeChange={(e) => setStartTime(e.target.value)}
                                    onEndTimeChange={(e) => setEndTime(e.target.value)}
                                    validator={validator}
                                    onSubmit={() => addEvent(titleValue, startDate, endDate, startTime, endTime)}>
                                </FormEvent>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

export default CompetitionsCalendar;