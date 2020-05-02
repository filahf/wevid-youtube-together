import React from 'react';
import ThemeToggle from './components/theme/ThemeToggle';
import './styles.scss';

function App() {
  return (
    <>
      <div className='navbar'>
        <ThemeToggle />
      </div>
    </>
  );
}

export default App;
