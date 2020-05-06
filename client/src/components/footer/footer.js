import React from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <footer>
      © 2020{' '}
      <a
        href='https://filipahfelt.se/'
        target='_blank'
        rel='noopener noreferrer'
      >
        Filip Åhfelt
      </a>
    </footer>
  );
};

export default Navbar;
