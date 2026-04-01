/*


import React from 'react'
import { useNavigate } from 'react-router';

function DeleteUser() {
    const navigate = useNavigate();

    //const { session } = UserAuth();

    const deleteUser = async (e) => {
        console.log('hay que borrar otras cosas primero');
        e.preventDefault();
        try {
            navigate('/');
        }
        catch (error) {
            console.error('error en goBackToPofile de DeleteUser.js', error);
        }
    }

    const goBackToPofile = async (e) => {
        e.preventDefault();
        try {
            navigate('/myprofile');
        }
        catch (error) {
            console.error('error en goBackToPofile de DeleteUser.js', error);
        }
    }

    return (
        <>
            <h2>
                ¿Estás seguro de que quieres eliminar tu perfil?
            </h2>
            <div>
                <button onClick={deleteUser}>Si</button>
                <button onClick={goBackToPofile}>No</button>
            </div>
        </>
    )
}

export default DeleteUser


*/