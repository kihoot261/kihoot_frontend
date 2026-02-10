import React from 'react'
import { UserAuth } from '../auth/AuthContext'
import { Navigate } from 'react-router-dom';
import Loading from './Loading';

const  RedirectAuthenticated = ({ children }) => {
    const { session } = UserAuth();

    if (session === undefined) {
        return <Loading></Loading>
    }

    return <>{session ? <>{children}</> : <Navigate to={'/'}></Navigate>}</>
}

export default RedirectAuthenticated