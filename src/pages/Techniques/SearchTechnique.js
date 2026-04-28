import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { UserAuth } from '../../utils/AuthContext';
import Loading from '../../components/Loading';
import TituloDescripción from '../../components/TituloDescripcion';
import ReturnHome from '../../components/buttons/ReturnHome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import BlackCornerWhiteBgButton from '../../components/buttons/BlackCornerWhiteBgButton';

function SearchTechnique() {

    const [techniques, setTechniques] = useState(null);
    const [savedTechniques, setSavedTechniques] = useState(null);
    const [shownTechniques, setShownTechniques] = useState(null);
    const navigate = useNavigate();
    const { session, searchTechniques, getSavedTechniques, saveTechnique } = UserAuth();

    const fetchTechniques = useCallback(async () => {
        try {
            const searchedTechniques = await searchTechniques();
            const allTechniques = searchedTechniques.data;
            if (session) {
                const techniquesToShow = allTechniques.filter(t => t.id_user !== session?.user.id); // quita las que son mias
                setTechniques(techniquesToShow);
            }
            else {
                setTechniques(allTechniques);
            }
        }
        catch (error) {
            console.error('Error searching techniques in SearchTechnique:', error);
            return error;
        }
    }, [searchTechniques, session])

    const fetchSavedTechniques = useCallback(async () => {
        try {
            if (session) {
                const techniquesSaved = await getSavedTechniques();
                setSavedTechniques(techniquesSaved.data);
            }
            else {
                setSavedTechniques([]);
            }
        }
        catch (error) {
            console.error('Error searching saved techniques in SearchTechnique:', error);
            return error;
        }
    }, [getSavedTechniques, session])

    const filterTechniques = useCallback(() => {
        if (!session) {
            setShownTechniques(techniques);
        }
        if (techniques.length === 0) {
            setShownTechniques([]);
        }
        else {
            const savedIds = new Set(savedTechniques.map(item => item.id));
            const techniquesToShow = techniques.filter(r => !savedIds.has(r.id));
            setShownTechniques(techniquesToShow);
        }
    }, [techniques, savedTechniques, session])

    const saveTheTechnique = async (e, id_technique) => {
        e.stopPropagation();
        try {
            await saveTechnique(id_technique);
        }
        catch (error) {
            console.error('error en saveTheTechnique de SearchTechnique.js', error);
        }
    }

    useEffect(() => {
        if (session === undefined) {
            return;
        }
        if (!techniques) {
            fetchTechniques();
        }
        if (!savedTechniques) {
            fetchSavedTechniques();
        }
        if (techniques && savedTechniques) filterTechniques();
    }, [session, techniques, savedTechniques, fetchTechniques, fetchSavedTechniques, filterTechniques]);

    if (shownTechniques === null) {
        return <Loading></Loading>
    }

    return (
        <>
            <div>
                <h2>
                    Técnicas
                </h2>
                <div className='main-cards-container'>
                    {
                        shownTechniques.map((technique) => {
                            return (
                                <div className='info-card-container' key={technique.id} onClick={() => navigate('/technique', { state: { id_technique: technique.id } })}>
                                    <div className='title-desc-container'>
                                        <TituloDescripción titulo={technique.title} desc={technique.description}></TituloDescripción>
                                        <p className='username-text'>{technique.username}</p>
                                    </div>
                                    {
                                        session &&
                                        <BlackCornerWhiteBgButton
                                            title={<FontAwesomeIcon icon={faBookmark} />}
                                            callback={(e) => saveTheTechnique(e, technique.id)}>
                                        </BlackCornerWhiteBgButton>
                                    }

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

export default SearchTechnique