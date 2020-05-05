import React from 'react';

import Terminal from './terminal';
import './welcome.scss';

const Welcome = () => {
  return (
    <div className='welcomecon'>
      <h2>Kolla på youtubeklipp med dina vänner i synk!</h2>
      <div className='welcome'>
        <Terminal />
        <Terminal />
      </div>
    </div>
  );
};

export default Welcome;
