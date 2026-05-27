import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { UserAuth } from '../../utils/AuthContext';
import Loading from '../../components/Loading';
import FormComment from '../../components/forms/FormComment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useIsAdmin } from '../../utils/useIsAdmin';
import { confirm } from '../../components/MyDialog';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import RedCornerIconButton from '../../components/buttons/RedCornerIconButton';
import RedCornerFlexButton from '../../components/buttons/RedCornerFlexButton';

function Technique() {
    const [technique, setTechnique] = useState(null);
    const location = useLocation();
    const { id_technique } = location.state;
    const { session,
        getTechniqueById,
        createComment,
        deleteComment,
        getUserData,
        getCommentsById,
        deleteVideo,
        deleteTechnique } = UserAuth();
    const [message, setMessage] = useState('');
    const [comments, setComments] = useState(null);
    const isAdmin = useIsAdmin();
    const navigate = useNavigate();

    const fetchTechnique = useCallback(async () => {
        try {
            const foundRoutine = await getTechniqueById(id_technique);
            setTechnique(foundRoutine.data[0]);
        }
        catch (error) {
            console.error('Error searching technique in Technique.js:', error);
            return { success: false, error };
        }
    }, [getTechniqueById, id_technique])

    const fetchComments = useCallback(async () => {
        try {
            const foundComments = await getCommentsById(id_technique);
            setComments(foundComments.data);
        }
        catch (error) {
            console.error('Error searching technique in Technique.js:', error);
            return { success: false, error };
        }
    }, [getCommentsById, id_technique])

    const sendComment = async (e) => {
        if (session) {
            if (session?.user.id === technique.id_user) {
                try {
                    await createComment(id_technique, message, technique.username);
                }
                catch (error) {
                    console.error('Error creating comment in Technique.js:', error);
                    return { success: false, error };
                }
            }
            else {
                try {
                    const data = await getUserData();
                    await createComment(id_technique, message, data[0].username);
                }
                catch (error) {
                    console.error('Error creating comment in Technique.js:', error);
                    return { success: false, error };
                }

            }
        }
        setMessage('');
    }

    const eraseComment = async (e, id_comment) => {
        e.preventDefault();
        try {
            await deleteComment(id_comment);
        }
        catch (error) {
            console.error('Error creating comment in Technique.js:', error);
            return { success: false, error };
        }
    }

    const eraseTechnique = async (e, id_technique, title_technique, path_technique) => {
        e.preventDefault();
        const result = await confirm({
            message: 'Seguro que quieres eliminar ' + title_technique + '?'
        });

        if (result === true) {
            try {
                const deletedVideo = await deleteVideo(path_technique);
                if (deletedVideo) {
                    await deleteTechnique(id_technique);
                }
                navigate('/');
            }
            catch (error) {
                console.error('error en eraseTechnique de MyTechniques.js', error);
            }
        }
    }

    const checkOwner = (id) => {
        return session?.user.id === id;
    }

    useEffect(() => {
        if (session === undefined) {
            return;
        }
        if (!technique) {
            fetchTechnique();
        }
        if (!comments) {
            fetchComments();
        }
    }, [session, technique, comments, fetchComments, fetchTechnique])

    if (technique === null || comments === null) {
        return <Loading></Loading>
    }

    return (
        <div className='main-exercices-container'>
            <h2>{technique.title}</h2>
            <div className='desc-exercice-container'>
                <h3>Descripción: </h3>
                <p>{technique.description}</p>
            </div>
            <div className='technique-container'>
                <div className='exercice-container'>
                    <video
                        src={technique.source}
                        controls
                        className="video-container"
                    >
                        Your browser does not support the video tag.
                    </video>
                    <p>Creado por: {technique.username}</p>
                    {
                        session && <FormComment
                            message={message}
                            onMessageChange={(e) => setMessage(e.target.value)}
                            onSubmit={sendComment}
                            buttonName={<FontAwesomeIcon icon={faAngleRight} />}>
                        </FormComment>
                    }
                </div>
                <div className='main-public-comments-container'>
                    <h3>Comentarios</h3>
                    <div>
                        {
                            comments.map((comment) => {
                                return (
                                    <div key={comment.id} className='comments-section-main-container'>
                                        <div className='comments-section'>
                                            <h3 className='single-comment'>{comment.username}</h3>
                                            <p className='single-comment'>{comment.message}</p>
                                        </div>
                                        {
                                            (checkOwner(comment.id_user) || isAdmin) &&
                                            <div>
                                                <RedCornerIconButton
                                                    title={<FontAwesomeIcon icon={faTrashCan} />}
                                                    callback={(e) => eraseComment(e, comment.id)}>
                                                </RedCornerIconButton>
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        (isAdmin || checkOwner(technique.id_user)) && (
                            <div className='home-button-container'>
                                <RedCornerFlexButton
                                    title='Eliminar técnica'
                                    callback={(e) => eraseTechnique(e, technique.id, technique.title, technique.path)}>
                                </RedCornerFlexButton>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>

    )
}

export default Technique