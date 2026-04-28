import React, { useCallback, useEffect, useRef, useState } from "react";
import ReturnHome from "../../components/buttons/ReturnHome";
import { v4 as uuidv4 } from "uuid";
import { UserAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router";
import SimpleReactValidator from "simple-react-validator";
import { errorMessages } from "../../utils/errorMessages";
import RegularButton from "../../components/buttons/RegularButton";
import Loading from "../../components/Loading";
import FormTitleDescription from "../../components/forms/FormTitleDescription";
import FormExercice from "../../components/forms/FormExercice";
import { checkNaturals } from "../../utils/methods";
import '../../styles/pages/_createroutine.scss'

function CreateRoutine() {
    const emptyExercice = {
        id_training: null,
        id: null,
        title: "",
        description: "",
        reps: 0,
        series: 0,
        rest: 0,
        source: "",
    };
    const mainIdTraining = uuidv4();
    const [exercises, setExercises] = useState([]);
    const [titleValue, setTitleValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [currentExercise, setCurrentExercise] = useState(emptyExercice);
    const [nameValue, setNameValue] = useState("");
    const [descriptionExerciceValue, setDescriptionExerciceValue] = useState("");
    const [sourceValue, setSourceValue] = useState("");
    const [repsValue, setRepsValue] = useState(0);
    const [seriesValue, setSeriesValue] = useState(0);
    const [restValue, setRestValue] = useState(0);
    const [routineDefined, setRoutineDefined] = useState(false);
    const { createRoutine, session, getUserData } = UserAuth();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const validator = useRef(
        new SimpleReactValidator({
            messages: errorMessages,
        }),
    );

    const resetEverything = () => {
        setCurrentExercise(emptyExercice);
        setNameValue("");
        setDescriptionExerciceValue("");
        setSourceValue("");
        setRepsValue(0);
        setRestValue(0);
        setSeriesValue(0);
    };

    const saveExercise = (e) => {
        e.preventDefault();
        if (validator.current.allValid()) {
            currentExercise.title = nameValue;
            currentExercise.description = descriptionExerciceValue;
            currentExercise.reps = checkNaturals(repsValue);
            currentExercise.series = checkNaturals(seriesValue);
            currentExercise.rest = checkNaturals(restValue);
            currentExercise.source = sourceValue;
            currentExercise.id = uuidv4();
            currentExercise.id_training = mainIdTraining;
            setExercises((prev) => [...prev, currentExercise]);
            resetEverything();
        } else {
            validator.current.showMessages();
        }
    };

    const removeExercise = (id) => {
        setExercises((prev) => prev.filter((ex) => ex.id !== id));
    };

    const saveRoutine = async (e) => {
        e.preventDefault();
        try {
            await createRoutine(
                titleValue,
                descriptionValue,
                userData.username,
                Array.from(exercises),
            );
        } catch (error) {
            console.error("error en changeSurnames de MyProfile.js", error);
        }
        navigate("/routines");
    };

    const defineExercices = (e) => {
        e.preventDefault();
        if (validator.current.allValid()) {
            setRoutineDefined(true);
        } else {
            validator.current.showMessages();
        }
    };

    const fetchData = useCallback(async () => {
        if (session) {
            try {
                const data = await getUserData();
                setUserData(data[0]);
            } catch (error) {
                console.error("Error fetching data in MyProfile:", error);
            }
        } else {
            console.error("no ha iniciado sesion");
        }
    }, [session, getUserData]);

    useEffect(() => {
        if (session && !userData) fetchData();
    }, [fetchData, session, userData]);

    if (userData === null) {
        return <Loading></Loading>; // canviar a un spinner o algo
    }

    return (
        <div>
            <h2>Crear rutina entrenamiento</h2>

            <div>
                <FormTitleDescription
                    titleValue={titleValue}
                    descriptionValue={descriptionValue}
                    onTitleChange={(e) => setTitleValue(e.target.value)}
                    onDescriptionChange={(e) => setDescriptionValue(e.target.value)}
                    onSubmit={defineExercices}
                    validator={validator}
                    buttonName={"Añadir ejercicios"}
                />
            </div>

            {routineDefined && (
                <div>
                    <FormExercice
                        nameValue={nameValue}
                        descriptionValue={descriptionExerciceValue}
                        repsValue={repsValue}
                        seriesValue={seriesValue}
                        restValue={restValue}
                        sourceValue={sourceValue}
                        onNameChange={(e) => setNameValue(e.target.value)}
                        onDescriptionChange={(e) =>
                            setDescriptionExerciceValue(e.target.value)
                        }
                        onRepsChange={(e) => setRepsValue(e.target.value)}
                        onSeriesChange={(e) => setSeriesValue(e.target.value)}
                        onRestChange={(e) => setRestValue(e.target.value)}
                        onSourceChange={(e) => setSourceValue(e.target.value)}
                        validator={validator}
                        onSubmit={saveExercise}
                        exercises={exercises}
                        onRemoveExercise={removeExercise}
                    ></FormExercice>
                    <div className="exercices-main-container">
                        {
                            exercises.length > 0 && (
                                <RegularButton
                                    title="Guarda rutina"
                                    callback={saveRoutine}
                                ></RegularButton>)
                        }
                    </div>
                </div>
            )}

            <ReturnHome></ReturnHome>
        </div>
    );
}

export default CreateRoutine;
