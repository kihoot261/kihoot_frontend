import React, { useState, useRef } from 'react'
import ReturnHome from '../../components/ReturnHome';
import { UserAuth } from '../../utils/AuthContext';
import { useNavigate } from 'react-router';
import SimpleReactValidator from 'simple-react-validator';
import { errorMessages } from '../../utils/errorMessages';
import RegularButton from '../../components/RegularButton';

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
                    navigate('/login');
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
        <>
            <h2>Registrarse</h2>
            <div className='main-form-container'>
                <form onSubmit={handleRegister} className='regular-form-container'>
                    <div className='input-and-label-container'>
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

                    <div className='input-and-label-container'>
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

                    <div className='input-and-label-container'>
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

                    <div className='input-and-label-container'>
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

                    <div className='input-and-label-container'>
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
            </div>
            <ReturnHome></ReturnHome>
        </>
    )
}

export default Register