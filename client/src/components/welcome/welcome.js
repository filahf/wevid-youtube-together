import React from 'react';
import './welcome.scss';
import { ReactComponent as Graphic } from '../../assets/graphic.svg';
import Graph from '../../assets/graphic.js';

const Welcome = () => {
  return (
    <div className='welcomecon'>
      <Graph />
      <h2>Kolla på YouTube med dina vänner i synk!</h2>
    </div>
  );
};

export default Welcome;
