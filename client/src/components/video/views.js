import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Views = (props) => {
  const [views, setViews] = useState('1');
  props.socket.addEventListener('message', (event) => {
    let data = JSON.parse(event.data);
    if (data.event === 'users') setViews(data.users);
  });
  return (
    <div className='views'>
      <div class='tooltip'>
        <FontAwesomeIcon icon={faEye} /> {views}
        <span class='tooltiptext'>Total Views</span>
      </div>
    </div>
  );
};

export default Views;
