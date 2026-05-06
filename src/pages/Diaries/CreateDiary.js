import React, { useRef, useState } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import { errorMessages } from '../../utils/errorMessages';
import FormTitleDescription from '../../components/forms/FormTitleDescription';
import FormDiary from '../../components/forms/FormDiary';
import { UserAuth } from '../../utils/AuthContext';
import { useNavigate } from 'react-router';
import { getMinDate } from '../../utils/methods';

function CreateDiary() {

    const [titleValue, setTitleValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [titleDescDefined, setTitleDescDefined] = useState(false);
    const [metricToCount, setMetricToCount] = useState('');
    const [targetReps, setTargetReps] = useState(0);
    const today = getMinDate()
    const [endDate, setEndDate] = useState(today);
    const { createDiary } = UserAuth();
    const navigate = useNavigate();
    const validator = useRef(
        new SimpleReactValidator({
            messages: errorMessages,
        })
    );

    const allowConfigDiary = (e) => {
        e.preventDefault();
        if (validator.current.allValid()) {
            setTitleDescDefined(true);
        } else {
            validator.current.showMessages();
        }
    };

    const saveDiary = async (e) => {
        e.preventDefault();
        try {
            await createDiary(
                titleValue,
                descriptionValue,
                metricToCount,
                targetReps,
                endDate
            );
        } catch (error) {
            console.error("error en saveDiary de CreateDiary.js", error);
        }
        navigate("/diaries");
    }


    return (
        <div>
            <h2>Crear diario</h2>
            <div>
                <FormTitleDescription
                    titleValue={titleValue}
                    descriptionValue={descriptionValue}
                    onTitleChange={(e) => setTitleValue(e.target.value)}
                    onDescriptionChange={(e) =>
                        setDescriptionValue(e.target.value)
                    }
                    onSubmit={allowConfigDiary}
                    validator={validator}
                    buttonName={"Configura diario"}
                />
            </div>
            {
                titleDescDefined && (
                    <FormDiary
                        metricToCount={metricToCount}
                        endDate={endDate}
                        targetReps={targetReps}
                        onMetricChange={(e) => setMetricToCount(e.target.value)}
                        onDateChange={(e) => setEndDate(e.target.value)}
                        onRepsChange={(e) => setTargetReps(e.target.value)}
                        validator={validator}
                        onSubmit={saveDiary}
                    ></FormDiary>
                )
            }

        </div>
    )
}

export default CreateDiary