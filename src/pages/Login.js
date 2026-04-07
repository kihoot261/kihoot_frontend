import React, { useState, useRef } from 'react'
import ReturnHome from '../components/ReturnHome';
import { UserAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router';
import SimpleReactValidator from 'simple-react-validator';
import { errorMessages } from '../utils/errorMessages';
import RegularButton from '../components/RegularButton';

function Login() {

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordvalue] = useState('');
  const { signInUser } = UserAuth();
  const navigate = useNavigate();

  const validator = useRef(new SimpleReactValidator({
    messages: errorMessages
  }));

  const handleEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePassword = (e) => {
    setPasswordvalue(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
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
    else {
      validator.current.showMessages();
    }

  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label for='email'>Email: </label>
          <input type="text"
            value={emailValue}
            id='email'
            onChange={handleEmail}
            placeholder="Email...">
          </input>
          <div>
            {validator.current.message('email', emailValue, 'required|email')}
          </div>
        </div>
        <div>
          <label for='password'>Contraseña: </label>
          <input type="password"
            value={passwordValue}
            onChange={handlePassword}
            id='password'
            placeholder='Contrasenya...'>
          </input>
          <div>
            {validator.current.message('password', passwordValue, 'required')}
          </div>
        </div>
        <RegularButton type='submit' title='Envia'></RegularButton>

      </form>
      <ReturnHome></ReturnHome>
    </div>
  )
}

export default Login