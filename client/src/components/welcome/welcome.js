import React from 'react';
import './welcome.scss';
import Graph from '../../assets/graphic.js';

const Welcome = (props) => {
  var height = 280;
  if (props.mobile) height = 150;
  return (
    <div className='welcomecon'>
      <Graph height={height} />
      <h2>Watch YouTube in sync with your loved ones!</h2>
    </div>
  );
};

export default Welcome;
