import React from 'react';

import Toggle from './Toggle';
import useDarkMode from 'use-dark-mode';

const ThemeToggle = () => {
  const darkMode = useDarkMode(false);

  return (
    <div className='dark-mode-toggle'>
      <button type='button' onClick={darkMode.disable}>
        ☀
      </button>
      <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
      <button type='button' onClick={darkMode.enable}>
        ☾
      </button>
    </div>
  );
};

export default ThemeToggle;
