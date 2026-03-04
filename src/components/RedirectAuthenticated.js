import React from 'react'
import { UserAuth } from '../auth/AuthContext'
import Loading from './Loading';
import { Navigate } from 'react-router';

const  RedirectAuthenticated = ({ children }) => {
    const { session } = UserAuth();

    if (session === undefined) {
        return <Loading></Loading>
    }

    return <>{session ? <>{children}</> : <Navigate to={'/'}></Navigate>}</>
}

export default RedirectAuthenticated