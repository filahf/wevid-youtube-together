import React from 'react';
import './footer.scss';

const Navbar = () => {
  return (
    <footer>
      <p>
        © 2020 &nbsp;
        <a
          href='https://filipahfelt.se/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Filip Åhfelt
        </a>
      </p>
    </footer>
  );
};

export default Navbar;
