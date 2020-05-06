import React from 'react';
import ThemeToggle from '../theme/ThemeToggle';
import { Link } from 'react-router-dom';
import './navbar.scss';

const Navbar = () => {
  return (
    <header>
      <div className='navbar'>
        <Link to='/'>
          <h4>IhopTube.se</h4>
        </Link>
        <Link to='/'>
          <h4>Dela en Video</h4>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
