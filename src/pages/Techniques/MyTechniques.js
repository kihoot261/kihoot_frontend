import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { UserAuth } from '../../utils/AuthContext';
import ReturnHome from '../../components/ReturnHome';
import TituloDescripción from '../../components/TituloDescripcion';
import Loading from '../../components/Loading';
import { confirm } from '../../components/MyDialog';
import RedCornerIconButton from '../../components/RedCornerIconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faBookmark } from '@fortawesome/free-solid-svg-icons';
import BlackCornerWhiteBgButton from '../../components/BlackCornerWhiteBgButton';

function MyTechniques() {
    const [myTechniques, setMyTechniques] = useState(null);
    const [savedTechniques, setSavedTechniques] = useState(null);
    const navigate = useNavigate();
    const { getSavedTechniques, getMyTechniques, deleteTechnique, deleteVideo, unsaveTechnique } = UserAuth();

    const fetchTechniques = useCallback(async () => {
        try {
            const techniques = await getMyTechniques();
            setMyTechniques(techniques.data);
        }
        catch (error) {
            console.error('Error searching my techniques in MyTechniques:', error);
            return { success: false, error };
        }
    }, [getMyTechniques])

    const fetchSavedTechniques = useCallback(async () => {
        try {
            const techniques = await getSavedTechniques();
            setSavedTechniques(techniques.data);
        }
        catch (error) {
            console.error('Error searching saved techniques in MyTechniques:', error);
            return { success: false, error };
        }
    }, [getSavedTechniques])

    const handleUnfavourite = async (e, id_technique) => {
        e.preventDefault();
        try {
            await unsaveTechnique(id_technique);
            navigate('/')
        }
        catch (error) {
            console.error('error en handleUnfavourite de MyTechniques.js', error);
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

    useEffect(() => {
        if (!myTechniques) {
            fetchTechniques();
        }
        if (!savedTechniques) {
            fetchSavedTechniques();
        }
    }, [myTechniques, savedTechniques, fetchSavedTechniques, fetchTechniques]);

    if (myTechniques === null || savedTechniques === null) {
        return <Loading></Loading>
    }

    return (
        <>
            <div>
                <h2>Creadas por mi</h2>
                <div className='main-cards-container'>
                    {
                        myTechniques.map((technique) => {
                            return (
                                <div className='info-card-container' key={technique.id} onClick={() => navigate('/technique', { state: { id_technique: technique.id } })}>
                                    <div className='title-desc-container'>
                                        <TituloDescripción
                                            titulo={technique.title}
                                            desc={technique.description}>
                                        </TituloDescripción>
                                        <p>{technique.username}</p>
                                    </div>
                                    <div>
                                        <RedCornerIconButton
                                            title={<FontAwesomeIcon icon={faTrashCan} />}
                                            callback={(e) => eraseTechnique(e, technique.id, technique.title, technique.path)}>
                                        </RedCornerIconButton>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
            <div>
                <h2>Guardadas</h2>
                <div className='main-cards-container'>
                    {
                        savedTechniques.map((technique) => {
                            return (
                                <div className='info-card-container' key={technique.id} onClick={() => navigate('/technique', { state: { id_technique: technique.id } })}>
                                    <div className='title-desc-container'>
                                        <TituloDescripción
                                            titulo={technique.title}
                                            desc={technique.description}>
                                        </TituloDescripción>
                                    </div>
                                    <div>
                                        <BlackCornerWhiteBgButton
                                            title={<FontAwesomeIcon icon={faBookmark} />}
                                            callback={(e) => handleUnfavourite(e, technique.id)}>
                                        </BlackCornerWhiteBgButton>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <ReturnHome></ReturnHome>
        </>
    )
}

export default MyTechniques