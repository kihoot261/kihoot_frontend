import React from 'react'
import { useNavigate } from 'react-router-dom';

function ReturnHome() {

const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/')}>Home</button>
  )
}

export default ReturnHome