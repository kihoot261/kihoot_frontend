import React, { useState, useEffect } from 'react'
import ReturnHome from '../components/ReturnHome';
import { UserAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordvalue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [surnameValue, setSurnameValue] = useState('');
  const [clickable, setClickable] = useState(false);
  const { signUpUser } = UserAuth();
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePassword = (e) => {
    setPasswordvalue(e.target.value);
  };

  const handleUsername = (e) => {
    setUsernameValue(e.target.value);
  };

  const handleSurname = (e) => {
    setSurnameValue(e.target.value);
  };

  const handleName = (e) => {
    setNameValue(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await signUpUser(emailValue, passwordValue, nameValue, surnameValue, usernameValue);
      if (result.success) {
        navigate('/');
      }
    }
    catch (error) {
      console.error('error en handleRegister de Register.js', error);
    }
  }

  useEffect(() => {
    if (emailValue !== '' && passwordValue !== '' && nameValue !== '' && usernameValue !== '' && surnameValue !== '') {
      setClickable(true);
    }
    else {
      setClickable(false);
    }
  }, [clickable, passwordValue, emailValue, surnameValue, nameValue, usernameValue]);

  return (
    <div>
      <form onSubmit={handleRegister}>
        <p>Email: </p>
        <input type="email"
          value={emailValue}
          onChange={handleEmail}
          placeholder="Email...">
        </input>

        <p>Contrasenya: </p>
        <input type="password"
          value={passwordValue}
          onChange={handlePassword}
          placeholder='Contrasenya...'>
        </input>

        <p>Nom: </p>
        <input type="text"
          value={nameValue}
          onChange={handleName}
          placeholder="Nom...">
        </input>

        <p>Cognoms: </p>
        <input type="text"
          value={surnameValue}
          onChange={handleSurname}
          placeholder="Cognoms...">
        </input>

        <p>Nom d'usuari: </p>
        <input type="text"
          value={usernameValue}
          onChange={handleUsername}
          placeholder="Nom d'usuari...">
        </input>
        <button disabled={!clickable} type='submit'>Envia</button>
      </form>
      <ReturnHome></ReturnHome>
    </div>
  )
}

export default Register