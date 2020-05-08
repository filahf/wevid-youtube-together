import React from 'react';
import ThemeToggle from '../theme/ThemeToggle';
import { Link, useRouteMatch } from 'react-router-dom';
import './navbar.scss';

const Navbar = () => {
  let match = useRouteMatch({
    path: '/watch/',
  });
  return (
    <header>
      <div className='navbar'>
        <Link to='/'>
          <h4>Wevid</h4>
        </Link>
        {match && (
          <Link to='/'>
            <h6>Share a Video</h6>
          </Link>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
