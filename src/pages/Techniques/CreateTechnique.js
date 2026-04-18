import React, { useCallback, useEffect, useRef, useState } from "react";
import ReturnHome from "../../components/ReturnHome";
import Loading from "../../components/Loading";
import { UserAuth } from "../../utils/AuthContext";
import SimpleReactValidator from "simple-react-validator";
import { errorMessages } from "../../utils/errorMessages";
import FormTitleDescription from "../../components/FormTitleDescription";
import RegularButton from "../../components/RegularButton";
import { useNavigate } from "react-router";
import { compressVideoRecorder } from "../../utils/methods";

function CreateTechnique() {
    const [uploading, setUploading] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);
    const [userData, setUserData] = useState(null);
    const [path, setPath] = useState(null);
    const { session, getUserData, uploadTechniqueVideo, createTechnique } =
        UserAuth();
    const [titleValue, setTitleValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [titleDescDefined, setTitleDescDefined] = useState(false);
    const [tooHeavy, setTooHeavy] = useState(false);
    const navigate = useNavigate();
    const supabaseMaxFileSize = 50;
    const maxFileSize = 600;

    const validator = useRef(
        new SimpleReactValidator({
            messages: errorMessages,
        })
    );

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

    const allowUploadVideo = (e) => {
        e.preventDefault();
        if (validator.current.allValid()) {
            setTitleDescDefined(true);
        } else {
            validator.current.showMessages();
        }
    };

    const uploadVideo = async (event) => {
        try {
            setUploading(true);
            setTooHeavy(false);
            const file = event.target.files[0];
            if (file.size < maxFileSize * 1024 * 1024) {
                const compressedFile = await compressVideoRecorder(file);
                if (compressedFile.size >= supabaseMaxFileSize * 1024 * 1024) {
                    setTooHeavy(true);
                    setUploading(false);
                }
                else {
                    const fileExt = file.name.split(".").pop();
                    const fileName = `${Date.now()}.${fileExt}`;
                    const filePath = `${fileName}`;
                    const publicUrl = await uploadTechniqueVideo(filePath, compressedFile);
                    setVideoUrl(publicUrl.data);
                    setPath(filePath)
                }
            }
            else {
                setTooHeavy(true);
                setUploading(false);
            }

        } catch (error) {
            console.error("Upload error:", error.message);
        } finally {
            setUploading(false);
        }
    };

    const saveVideo = async (e) => {
        e.preventDefault();
        if (validator.current.allValid()) {
            try {
                await createTechnique(
                    titleValue,
                    descriptionValue,
                    userData.username,
                    videoUrl,
                    path
                );
                navigate('/');
            } catch (error) {
                console.error(
                    "Error adding entry in technique in saveVideo:",
                    error
                );
            }
        } else {
            validator.current.showMessages();
        }

    };

    useEffect(() => {
        if (session && !userData) fetchData();
    }, [fetchData, session, userData]);

    if (userData === null) {
        return <Loading></Loading>; // canviar a un spinner o algo
    }

    return (
        <div>
            <h2>Subir Video Técnica</h2>

            <div>
                <h3>Información de la técnica</h3>
                <FormTitleDescription
                    titleValue={titleValue}
                    descriptionValue={descriptionValue}
                    onTitleChange={(e) => setTitleValue(e.target.value)}
                    onDescriptionChange={(e) =>
                        setDescriptionValue(e.target.value)
                    }
                    onSubmit={allowUploadVideo}
                    validator={validator}
                    buttonName={"Sube video"}
                />
            </div>

            {titleDescDefined && (
                <input
                    type="file"
                    accept="video/*"
                    onChange={uploadVideo}
                    disabled={uploading}
                />
            )}

            {uploading && <Loading></Loading>}

            {tooHeavy && <div>El archivo es demasiado grande</div>}

            {videoUrl && (
                <div>
                    <h3>Your uploaded video:</h3>
                    <video
                        src={videoUrl}
                        controls
                        style={{ maxHeight: "400px" }}
                    >
                        Your browser does not support the video tag.
                    </video>

                </div>
            )}
            {
                !tooHeavy && <RegularButton
                    title={"Sube técnica"}
                    callback={saveVideo}
                ></RegularButton>
            }

            <ReturnHome></ReturnHome>
        </div>
    );
}

export default CreateTechnique;
