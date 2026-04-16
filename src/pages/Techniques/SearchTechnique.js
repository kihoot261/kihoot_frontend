import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { UserAuth } from '../../utils/AuthContext';
import Loading from '../../components/Loading';
import TituloDescripción from '../../components/TituloDescripcion';
import RegularButton from '../../components/RegularButton';
import ReturnHome from '../../components/ReturnHome';

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
                <div>
                    {
                        shownTechniques.map((technique) => {
                            return (
                                <div key={technique.id} onClick={() => navigate('/technique', { state: { id_technique: technique.id } })}>
                                    <TituloDescripción titulo={technique.title} desc={technique.description}></TituloDescripción>
                                    <p>Creado por: {technique.username}</p>
                                    {
                                        session &&
                                        <RegularButton title='Guardar técnica' callback={(e) => saveTheTechnique(e, technique.id)}></RegularButton>
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