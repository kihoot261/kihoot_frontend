import React, { useState, useRef } from 'react'
import ReturnHome from '../components/ReturnHome';
import { UserAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router';
import SimpleReactValidator from 'simple-react-validator';
import { errorMessages } from '../utils/errorMessages';
import RegularButton from '../components/RegularButton';

function Register() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordvalue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [surnameValue, setSurnameValue] = useState('');
  const { signUpUser } = UserAuth();
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
    if (validator.current.allValid()) {
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
    else {
      validator.current.showMessages();
    }

  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <div>
          <label for='email'>Email: </label>
          <input type="text"
            value={emailValue}
            onChange={handleEmail}
            id='email'
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
            placeholder='Contraseña...'>
          </input>
          <div>
            {validator.current.message('password', passwordValue, 'required|min:8|max:16|alpha_num')}
          </div>
        </div>

        <div>
          <label for='name'>Nombre: </label>
          <input type="text"
            value={nameValue}
            onChange={handleName}
            id='name'
            placeholder="Nombre...">
          </input>
          <div>
            {validator.current.message('name', nameValue, 'required')}
          </div>
        </div>
        <div>
          <label for='surname'>Apellido/s: </label>
          <input type="text"
            value={surnameValue}
            onChange={handleSurname}
            id='surname'
            placeholder="Apellidos...">
          </input>
          <div>
            {validator.current.message('surname', surnameValue, 'required')}
          </div>
        </div>

        <div>
          <label for='username'>Nombre de usuario: </label>
          <input type="text"
            value={usernameValue}
            id='username'
            onChange={handleUsername}
            placeholder="Nombre de usuario...">
          </input>
          <div>
            {validator.current.message('name', usernameValue, 'required|min:5')}
          </div>
        </div>
        <RegularButton type='submit' title='Envia'></RegularButton>
      </form>
      <ReturnHome></ReturnHome>
    </div>
  )
}

export default Register