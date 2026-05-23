import React, { useCallback, useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import Loading from '../../components/Loading';
import TituloDescripción from '../../components/TituloDescripcion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import RedCornerIconButton from '../../components/buttons/RedCornerIconButton';
import { UserAuth } from '../../utils/AuthContext';
import { confirm } from '../../components/MyDialog';

function MyDiaries() {
    const [myDiaries, setMyDiaries] = useState(null);
    const navigate = useNavigate();
    const { session, getMyDiaries, deleteDiary } = UserAuth();

    const fetchDiaries = useCallback(async () => {
        try {
            const diaries = await getMyDiaries();
            setMyDiaries(diaries.data);
        }
        catch (error) {
            console.error('Error searching my diaries in MyDiaries:', error);
            return { success: false, error };
        }
    }, [getMyDiaries])

    const eraseDiary = async (e, id_diary, title_diary) => {
        e.preventDefault();
        const result = await confirm({
            message: 'Seguro que quieres eliminar ' + title_diary + '?'
        });

        if (result === true) {
            try {
                await deleteDiary(id_diary);
                navigate('/diaries');
            }
            catch (error) {
                console.error('error en eraseDiary de MyDiaries.js', error);
            }
        }
    }

    useEffect(() => {
        if (session === undefined) {
            return;
        }
        if (!myDiaries) {
            fetchDiaries();
        }
    }, [session, myDiaries, fetchDiaries]);

    if (myDiaries === null) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h2>
                Mis diarios de progreso
            </h2>
            <div className='main-cards-container'>
                {
                    myDiaries.map((diary) => {
                        return (
                            <div className='info-card-container animate__animated animate__backInLeft' key={diary.id} onClick={() => navigate('/diary', { state: { id_diary: diary.id } })}>
                                <div className='title-desc-container'>
                                    <TituloDescripción
                                        titulo={diary.title}
                                        desc={diary.description}>
                                    </TituloDescripción>
                                </div>
                                <div>
                                    <RedCornerIconButton
                                        title={<FontAwesomeIcon icon={faTrashCan} />}
                                        callback={(e) => eraseDiary(e, diary.id, diary.title)}>
                                    </RedCornerIconButton>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MyDiaries