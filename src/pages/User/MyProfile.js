import React, { useState, useEffect, useCallback, useRef } from 'react'
import ReturnHome from '../../components/ReturnHome';
import { UserAuth } from '../../utils/AuthContext';
import { useNavigate } from 'react-router';
import Loading from '../../components/Loading';
import RegularButton from '../../components/RegularButton';
import SimpleReactValidator from 'simple-react-validator';
import { errorMessages } from '../../utils/errorMessages';
import '../../styles/pages/_myprofile.scss';

function MyProfile() {

    const navigate = useNavigate();
    const { signOutUser, session, changeNameUser, changeSurnamesUser, changeUsernameUser, getUserData } = UserAuth();
    const [nameValue, setNameValue] = useState('');
    const [usernameValue, setUsernameValue] = useState('');
    const [surnamesValue, setSurnamesValue] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState(null);

    const validator = useRef(new SimpleReactValidator({
        messages: errorMessages
    }));

    const separateEmail = (email) => {
        const parts = email.split("@");
        return parts;
    }

    const email = separateEmail(session?.user?.user_metadata?.email);

    const part1 = email[0] + '@';
    const part2 = email[1];

    const handleChangeName = (e) => {
        setNameValue(e.target.value);
    }

    const handleChangeSurnames = (e) => {
        setSurnamesValue(e.target.value);
    }

    const handleChangeUsername = (e) => {
        setUsernameValue(e.target.value);
    }

    const changePassword = async (e) => {
        e.preventDefault();
        try {
            navigate('/changepassword');
        }
        catch (error) {
            console.error('error en changePassword de MyProfile.js', error);
        }
    }

    /*
    const deleteUser = async (e) => {
        e.preventDefault();
        try {
            navigate('/deleteuser');
        }
        catch (error) {
            console.error('error en deleteUser de MyProfile.js', error);
        }
    }
        */

    const changeName = async (e) => {
        e.preventDefault();
        if (validator.current.fieldValid('name')) {
            try {
                await changeNameUser(nameValue);
            }
            catch (error) {
                console.error('error en changeName de MyProfile.js', error);
            }

        }
        else {
            validator.current.showMessages();
        }

    }

    const changeSurnames = async (e) => {
        e.preventDefault();
        if (validator.current.fieldValid('surname')) {
            try {
                await changeSurnamesUser(surnamesValue);
            }
            catch (error) {
                console.error('error en changeSurnames de MyProfile.js', error);
            }
        }
        else {
            validator.current.showMessages();
        }

    }

    const changeUsername = async (e) => {
        e.preventDefault();
        if (validator.current.fieldValid('username')) {
            try {
                await changeUsernameUser(usernameValue);
            }
            catch (error) {
                console.error('error en changeUsername de MyProfile.js', error);
            }
        }
        else {
            validator.current.showMessages();
        }

    }

    const handleEditMode = () => {
        setEditMode(true);
    }

    const returnViewMode = (e) => {
        if (nameValue !== '') {
            changeName(e);
        }
        if (surnamesValue !== '') {
            changeSurnames(e);
        }
        if (usernameValue !== '' || usernameValue.length >= 5) {
            changeUsername(e);
        }
        setEditMode(false);
    }

    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            await signOutUser();
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    const fetchData = useCallback(async () => {
        if (session) {
            try {
                const data = await getUserData();
                setUserData(data[0]);
            }
            catch (error) {
                console.error('Error fetching data in MyProfile:', error);
            }
        }
        else {
            console.error('no ha iniciado sesion');
        }

    }, [session, getUserData])

    useEffect(() => {
        if (session && !userData) fetchData();
    }, [fetchData, session, userData]);

    if (userData === null) {
        return <Loading></Loading>; // canviar a un spinner o algo
    }

    return (
        <>
            {!editMode ?
                (
                    <div className='dragon-bg dragon-bg-mod'>
                        <div className='my-profile-container'>
                            <div className='block-my-profile-container'>
                                <div className='single-info-container'>
                                    <h3 className='myprofile-header'>Nombre</h3>
                                    <p>{userData.name}</p>
                                    <div className='red-line-separator'></div>
                                </div>
                                <div className='single-info-container'>
                                    <h3 className='myprofile-header'>Apellidos</h3>
                                    <p>{userData.surnames}</p>
                                    <div className='red-line-separator'></div>
                                </div>
                                <div className='single-info-container'>
                                    <h3 className='myprofile-header'>Alias</h3>
                                    <p>{userData.username}</p>
                                    <div className='red-line-separator'></div>
                                </div>
                                <div className='single-info-container'>
                                    <h3 className='myprofile-header'>Email</h3>
                                    <p>{part1}</p>
                                    <p>{part2}</p>
                                </div>
                            </div>
                            <div className='block-my-stats-container'>
                                <div className='ratio-games-container'>
                                    <div>
                                        <h1 className='data--blue'>{userData.ratio}%</h1>
                                        <p>Ratio aciertos/fallos</p>
                                    </div>
                                    <div>
                                        <h1>{userData.games_played}</h1>
                                        <p>Partidas jugadas</p>
                                    </div>
                                </div>
                                <div className='correct-incorrect-container'>
                                    <div>
                                        <h3 className='data--green'>{userData.n_successes}</h3>
                                        <p>Aciertos</p>
                                    </div>
                                    <div>
                                        <h3 className='data--red'>{userData.n_failures}</h3>
                                        <p>Fallos</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='control-my-profile-container many-buttons-container'>
                            <RegularButton title='Mis cosas' callback={() => navigate('/mythings')}></RegularButton>
                            <RegularButton title='Editar mis datos' callback={handleEditMode}></RegularButton>
                            <RegularButton title='Cerrar sessión' callback={handleSignOut}></RegularButton>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2>Edita mis datos</h2>
                        <div className='main-form-container'>
                            <form onSubmit={returnViewMode} className='regular-form-container'>
                                <div className='input-and-label-container'>
                                    <label htmlFor='name'>Canviar nombre: </label>
                                    <input type="text"
                                        id='name'
                                        value={nameValue}
                                        onChange={handleChangeName}
                                        placeholder="Nuevo nombre..."></input>
                                    <div>
                                        {validator.current.message('name', nameValue, 'required')}
                                    </div>
                                </div>

                                <div className='input-and-label-container'>
                                    <label htmlFor='surname'>Canviar apellidos: </label>
                                    <input type="text"
                                        id='surname'
                                        value={surnamesValue}
                                        onChange={handleChangeSurnames}
                                        placeholder="Nuevo/s apellidos..."></input>
                                    <div>
                                        {validator.current.message('surname', surnamesValue, 'required')}
                                    </div>
                                </div>

                                <div className='input-and-label-container'>
                                    <label htmlFor='username'>Canviar nombre usuario: </label>
                                    <input type="text"
                                        id='username'
                                        value={usernameValue}
                                        onChange={handleChangeUsername}
                                        placeholder="Nuevo nombre usuario..."></input>
                                    <div>
                                        {validator.current.message('username', usernameValue, 'required|min:5')}
                                    </div>
                                </div>

                                <div>
                                    <RegularButton title='Cambia contraseña' callback={changePassword}></RegularButton>
                                    {/* <button onClick={deleteUser}>Eliminar perfil</button> */}
                                </div>
                                <RegularButton title='Actualiza' type='submit'></RegularButton>
                            </form>
                        </div>
                    </>

                )
            }
            <ReturnHome></ReturnHome>
        </>
    )
}

export default MyProfile