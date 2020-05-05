import React from 'react';
import ThemeToggle from '../theme/ThemeToggle';
import './navbar.scss';

const Navbar = () => {
  return (
    <header>
      <div className='navbar'>
        <h4 className='title'>IhopTube.se</h4>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
