import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { uuid } from 'uuidv4';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Welcome from '../welcome/welcome';
import { handleYouTubeUrl } from '../../linkHandler';
import './createSession.scss';

const CreateSession = (props) => {
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)',
  });
  const history = useHistory();
  const [url, setUrl] = useState('');

  const sessionID = uuid().slice(0, 6);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const videoID = handleYouTubeUrl(url);
    props.session(videoID, sessionID, true);
    history.push('/watch/leader');
  };

  return (
    <>
      <Welcome mobile={isTabletOrMobileDevice} />
      {isTabletOrMobileDevice ? (
        <div className='mobileview'>
          <p>Mobile users are only able to join on shared links</p>
        </div>
      ) : (
        <div className='input-container'>
          <form className='input-form' onSubmit={handleSubmit}>
            <input
              placeholder='Paste a YouTube link'
              className='input-field'
              type='text'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button className='input-button' type='Submit'>
              <FontAwesomeIcon icon={faPlay} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateSession;
