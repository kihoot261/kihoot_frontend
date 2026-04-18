import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/setupquiz">Quiz</Link></li>
        <li><Link to="/info">Recursos</Link></li>
        <li><Link to="/routines">Rutinas de entrenamiento</Link></li>
        <li><Link to="/techniques">Técnicas</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;   