import React, { useState } from 'react'
import { UserAuth } from '../auth/AuthContext';
import { supabase } from '../api/supabase';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {

  const [oldPassword, setOldPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { changeUserPassword } = UserAuth();
  const navigate = useNavigate();

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
  };

  const handleRepeatedPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const changePassword = async (e) => {
    const { data: isVerified } = await supabase.rpc('verify_user_password', { password: oldPassword })
    if (isVerified && oldPassword === repeatPassword) {
      e.preventDefault();
        try {
            await changeUserPassword(newPassword);
        }
        catch (error) {
            console.error('error en changePassword de ChangePassword.js', error);
        }
    }
    navigate('/');
  }

  return (
    <>
      <h1>Canvia la contraseña</h1>
      <div>
        <div>
          <p>Antiga contrasenya: </p>
          <input type="password"
            value={oldPassword}
            onChange={handleOldPassword}
            placeholder="Antiga contrasenya..."></input>
        </div>
        <div>
          <p>Repeteix antiga contrasenya: </p>
          <input type="password"
            value={repeatPassword}
            onChange={handleRepeatedPassword}
            placeholder="Repeteix antiga contrasenya..."></input>
        </div>
        <div>
          <p>Nova contrasenya: </p>
          <input type="password"
            value={newPassword}
            onChange={handleNewPassword}
            placeholder="Nova contrasenya..."></input>
        </div>
        <button onClick={changePassword}>Canvia contrasenya</button>
      </div>

    </>
  )
}

export default ChangePassword