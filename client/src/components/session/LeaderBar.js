import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import './leaderBar.scss';

const LeaderBar = (props) => {
  return (
    <div className='leader-bar'>
      <p>Du har kontrollen!</p>
      <div class='tooltip'>
        <FontAwesomeIcon icon={faEye} style={{ marginRight: '1rem' }} />
        {props.views}
        <span class='tooltiptext'>Antal visningar</span>
      </div>
    </div>
  );
};

export default LeaderBar;
