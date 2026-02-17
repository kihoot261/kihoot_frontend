import React, { useState } from 'react'
import ReturnHome from '../components/ReturnHome';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../auth/AuthContext';

function MyProfile() {

    const navigate = useNavigate();
    const { signOutUser, session, changeNameUser, changeSurnamesUser, changeUsernameUser } = UserAuth();
    const [nameValue, setNameValue] = useState('');
    const [usernameValue, setUsernameValue] = useState('');
    const [surnamesValue, setSurnamesValue] = useState('');
    const [editMode, setEditMode] = useState(false);

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
            //await changeUserPassword(passwordValue);
            navigate('/changepassword');

        }
        catch (error) {
            console.error('error en changePassword de MyProfile.js', error);
        }
    }

    const changeName = async (e) => {
        e.preventDefault();
        try {
            await changeNameUser(nameValue);
        }
        catch (error) {
            console.error('error en changeName de MyProfile.js', error);
        }
    }

    const changeSurnames = async (e) => {
        e.preventDefault();
        try {
            await changeSurnamesUser(surnamesValue);
        }
        catch (error) {
            console.error('error en changeSurnames de MyProfile.js', error);
        }
    }

    const changeUsername = async (e) => {
        e.preventDefault();
        try {
            await changeUsernameUser(usernameValue);
        }
        catch (error) {
            console.error('error en changeUsername de MyProfile.js', error);
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
        if (usernameValue !== '') {
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

    return (
        <>
            {!editMode &&
                <>
                    <div>
                        <p>Nom: {session?.user?.user_metadata?.name}</p>
                        <p>Cognoms: {session?.user?.user_metadata?.surnames}</p>
                        <p>Nom usuari: {session?.user?.user_metadata?.username}</p>
                        <p>Email: {session?.user?.user_metadata?.email}</p>
                        <p>Partides jugades: {session?.user?.user_metadata?.games_played}</p>
                        <p>Nombre encerts: {session?.user?.user_metadata?.n_successes}</p>
                        <p>Nombre fallos: {session?.user?.user_metadata?.n_failures}</p>
                        <p>Ratio encerts/fallos: {session?.user?.user_metadata?.ratio}%</p>
                    </div>
                    <div>
                        <button onClick={handleEditMode}>Edita les meves dades</button>
                    </div>
                    <button onClick={handleSignOut}>Tancar sessió</button>
                </>
            }
            {editMode &&
                <>
                    <div>
                        <div>
                            <p>Canvia Nom: </p>
                            <input type="text"
                                value={nameValue}
                                onChange={handleChangeName}
                                placeholder="Nou nom..."></input>
                        </div>

                        <div>
                            <p>Canvia Cognoms: </p>
                            <input type="text"
                                value={surnamesValue}
                                onChange={handleChangeSurnames}
                                placeholder="Nou/s cognoms..."></input>
                        </div>

                        <div>
                            <p>Canvia nom usuari: </p>
                            <input type="text"
                                value={usernameValue}
                                onChange={handleChangeUsername}
                                placeholder="Nou nom d'usuari..."></input>
                        </div>

                        <div>
                            <button onClick={changePassword}>Canvia contraseña</button>
                        </div>

                        <button onClick={returnViewMode}>Actualitza</button>
                    </div>
                </>
            }

            <ReturnHome></ReturnHome>
        </>
    )
}

export default MyProfile