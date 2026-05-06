import React from 'react'
import { UserAuth } from '../utils/AuthContext'
import Loading from '../components/Loading';
import { Navigate } from 'react-router';

const RedirectAuthenticated = ({ children }) => {
    const { session } = UserAuth();

    if (session === undefined) {
        return <Loading></Loading>
    }

    return <>{session ? <>{children}</> : <Navigate to={'/login'}></Navigate>}</>
}

export default RedirectAuthenticated