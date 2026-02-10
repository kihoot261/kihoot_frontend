import React, { useState, useEffect } from 'react'
import ReturnHome from '../components/ReturnHome';
import { UserAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordvalue] = useState('');
  const [clickable, setClickable] = useState(false);
  const { signInUser } = UserAuth();
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePassword = (e) => {
    setPasswordvalue(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInUser(emailValue, passwordValue);
      if (result.success) {
        navigate('/');
      }
    }
    catch (error) {
      console.error('error en handleRegister de Register.js', error);
    }
  }

  useEffect(() => {
    if (emailValue !== '' && passwordValue !== '') {
      setClickable(true);
    }
    else {
      setClickable(false);
    }
  }, [clickable, passwordValue, emailValue]);

  return (
    <div>
      <form onSubmit={handleLogin}>
        <p>Nom usuari: </p>
        <input type="text"
          value={emailValue}
          onChange={handleUsername}
          placeholder="Email...">
        </input>
        <p>Contrasenya: </p>
        <input type="password"
          value={passwordValue}
          onChange={handlePassword}
          placeholder='Contrasenya...'>
        </input>
        <button disabled={!clickable} type='submit'>Envia</button>
      </form>
      <ReturnHome></ReturnHome>
    </div>
  )
}

export default Login