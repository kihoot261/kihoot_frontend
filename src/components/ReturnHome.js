import React from 'react'
import { useNavigate } from 'react-router';

const ReturnHome = () => {

const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/')}>Home</button>
  )
}

export default ReturnHome