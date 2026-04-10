import React from 'react'
import ReturnHome from '../../components/ReturnHome';
import { UserAuth } from '../../utils/AuthContext';
import { Navigate, useNavigate } from 'react-router';
import RegularButton from '../../components/RegularButton';

function Profile() {

  const navigate = useNavigate();
  const { session } = UserAuth();

  return (
    <>
      {!session &&
        <ul>
          <RegularButton title='Inicia sesión' callback={() => navigate('/login')}></RegularButton>
          <RegularButton title='Registrarse' callback={() => navigate('/register')}></RegularButton>
        </ul>
      }
      {session && <Navigate to={'/myprofile'}></Navigate>}
      <ReturnHome></ReturnHome>
    </>
  )
}

export default Profile