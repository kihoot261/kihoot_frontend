import React from 'react'
import ReturnHome from '../components/ReturnHome';
import { useNavigate, Navigate } from 'react-router-dom';
import { UserAuth } from '../auth/AuthContext';

function Profile() {

  const navigate = useNavigate();
  const { session } = UserAuth();

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