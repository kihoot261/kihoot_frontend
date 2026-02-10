import React, { useState } from 'react'
import ReturnHome from '../components/ReturnHome';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../auth/AuthContext';

function MyProfile() {

    const navigate = useNavigate();
    const { signOutUser, session, changeUserPassword } = UserAuth();
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const changePassword = async (e) => {
        e.preventDefault();
        try {
            await changeUserPassword(inputValue);
        }
        catch (error) {
            console.error('error en changePassword de MyProfile.js', error);
        }
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
                <p>Canvia la contrasenya: </p>
                <input type="password"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Nova contrasenya..."></input>
                <button onClick={changePassword}>Envia</button>
            </div>
            <button onClick={handleSignOut}>Tancar sessió</button>
            <ReturnHome></ReturnHome>
        </>
    )
}

export default MyProfile