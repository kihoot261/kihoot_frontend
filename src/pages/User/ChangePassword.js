import React, { useEffect, useRef, useState } from 'react'
import { UserAuth } from '../../utils/AuthContext';
import { supabase } from '../../api/supabase';
import { useNavigate } from 'react-router';
import SimpleReactValidator from 'simple-react-validator';
import RegularButton from '../../components/RegularButton';
import { errorMessages } from '../../utils/errorMessages';
import ReturnHome from '../../components/ReturnHome';

function ChangePassword() {

  const [oldPassword, setOldPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { changeUserPassword } = UserAuth();
  const [eqPasswords, setEqPasswords] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const navigate = useNavigate();

  const validator = useRef(new SimpleReactValidator({
    messages: errorMessages
  }));

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleRepeatedPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setEqPasswords(newPassword === repeatPassword);
    if (validator.current.allValid()) {
      const { data: isVerified } = await supabase.rpc('verify_user_password', { password: oldPassword })
      if (isVerified && eqPasswords) {
        try {
          await changeUserPassword(newPassword);
          navigate('/');
        }
        catch (error) {
          console.error('error en changePassword de ChangePassword.js', error);
        }
      }
      else {
        if (!isVerified) setInvalidPassword(true);
      }
    }
    else {
      validator.current.showMessages();
    }
  }

  useEffect(() => {
    setEqPasswords(newPassword === repeatPassword);
  }, [repeatPassword, newPassword])

  return (
    <>
      <h2>Cambia la contraseña</h2>
      <div className='main-form-container'>
        <form onSubmit={changePassword} className='regular-form-container'>
        <div className='input-and-label-container'>
          <label htmlFor='oldPassword'>Antigua contraseña: </label>
          <input type="password"
            value={oldPassword}
            onChange={handleOldPassword}
            id='oldPassword'
            placeholder="Antigua contraseña..."></input>
          <div>
            {validator.current.message('oldPassword', oldPassword, 'required')}
            {
              invalidPassword &&
              <span>Antigua contraseña incorrecta</span>
            }
          </div>
        </div>

        <div className='input-and-label-container'>
          <label htmlFor='newPassword'>Nueva contraseña: </label>
          <input type="password"
            value={newPassword}
            onChange={handleNewPassword}
            id='newPassword'
            placeholder="Nueva contraseña..."></input>
          <div>
            {validator.current.message('newPassword', newPassword, 'required|min:8|max:16|alpha_num')}
          </div>
        </div>

        <div className='input-and-label-container'>
          <label htmlFor='repeatPassword'>Repite nueva contraseña: </label>
          <input type="password"
            value={repeatPassword}
            onChange={handleRepeatedPassword}
            id='repeatPassword'
            placeholder="Repite nueva contraseña..."></input>
          <div>
            {
              !eqPasswords &&
              <span>Las contraseñas no coinciden</span>
            }
            {validator.current.message('repeatPassword', repeatPassword, 'required|min:8|max:16|alpha_num')}
          </div>
        </div>

        <RegularButton type='submit' title='Cambiar contrasenya'></RegularButton>
      </form>
      </div>
      
      <ReturnHome></ReturnHome>
    </>
  )
}

export default ChangePassword