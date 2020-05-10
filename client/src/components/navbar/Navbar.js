import React from 'react';
import ThemeToggle from '../theme/ThemeToggle';
import { Link, useRouteMatch } from 'react-router-dom';
import './navbar.scss';

const Navbar = () => {
  let match = useRouteMatch({
    path: '/watch/',
  });
  return (
    <header className='navbar'>
      <nav>
        <Link to='/'>
          <h4>Wevid</h4>
        </Link>
      </nav>
      {match && (
        <Link to='/'>
          <h4>Share a new video</h4>
        </Link>
      )}
      <ThemeToggle />
    </header>
  );
};

export default Navbar;
