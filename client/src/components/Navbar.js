import React from 'react';
import ThemeToggle from './theme/ThemeToggle';

const Navbar = () => {
  return (
    <div className='navbar'>
      <h2 className='title'>Title</h2>
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
