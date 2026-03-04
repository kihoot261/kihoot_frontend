import React from 'react'
import ReturnHome from '../components/ReturnHome';
import { UserAuth } from '../auth/AuthContext';
import { Navigate, useNavigate } from 'react-router';

function Profile() {

  const navigate = useNavigate();
  const { session } = UserAuth();
  console.log(session);

  return (
    <>
      {!session && <ul>
        <button onClick={() => navigate('/login')}>Inicia sessió</button>
        <button onClick={() => navigate('/register')}>Registrar-se</button>
      </ul>}
      {session && <Navigate to={'/myprofile'}></Navigate>}
      <ReturnHome></ReturnHome>
    </>
  )
}

export default Profile