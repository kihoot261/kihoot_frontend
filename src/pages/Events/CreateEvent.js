import React, { useRef, useState } from 'react'
import FormTitleDescription from '../../components/forms/FormTitleDescription';
import SimpleReactValidator from 'simple-react-validator';
import { errorMessages } from '../../utils/errorMessages';
import { getMinDate } from '../../utils/methods';
import FormEvent from '../../components/forms/FormEvent';
import { useNavigate } from 'react-router';
import { UserAuth } from '../../utils/AuthContext';

function CreateEvent() {
    const [titleValue, setTitleValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [titleDescDefined, setTitleDescDefined] = useState(false);
    const today = getMinDate()
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('00:00');
    const navigate = useNavigate();
    const { createEvent, addParticipant, session, getUserData } = UserAuth();
    const validator = useRef(
        new SimpleReactValidator({
            messages: errorMessages,
        })
    );

    const setDateEvent = (e) => {
        e.preventDefault();
        if (validator.current.allValid()) {
            setTitleDescDefined(true);
        } else {
            validator.current.showMessages();
        }
    };

    const saveEvent = async (e) => {
        e.preventDefault();
        try {
            const event = await createEvent(titleValue, descriptionValue, startDate, endDate, startTime, endTime);
            const user = await getUserData();
            await addParticipant(event.data[0].id, session?.user.id, user[0].username, true)
        } catch (error) {
            console.error("error en saveEvent de CreateEvent.js", error);
        }
        navigate("/events");
    }

    return (
        <div>
            <h2>Crear Evento</h2>
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
            </div>
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
                        onSubmit={saveEvent}
                    ></FormEvent>
                )
            }
        </div>

    )
}

export default CreateEvent