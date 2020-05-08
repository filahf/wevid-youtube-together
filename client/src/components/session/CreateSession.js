import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { uuid } from 'uuidv4';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Welcome from '../welcome/welcome';

import './createSession.scss';
import { toast } from 'react-toastify';

const CreateSession = (props) => {
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)',
  });
  const history = useHistory();
  const [url, setUrl] = useState('');
  const notify = () =>
    toast(
      <div>
        <FontAwesomeIcon icon={faExclamationTriangle} />
        &nbsp; Invalid Link!
      </div>
    );

  const sessionID = uuid().slice(0, 6);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    var videoID = youtubeParser(url);
    if (!videoID) {
      notify();
      return;
    }
    props.session(videoID, sessionID, true);
    history.push('/watch/leader');
  };

  const youtubeParser = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

  return (
    <>
      <Welcome mobile={isTabletOrMobileDevice} />
      {isTabletOrMobileDevice ? (
        <div className='mobileview'>
          <p>Mobile users are only able to join on shared links</p>
        </div>
      ) : (
        <div className='share-container'>
          <form className='share-form' onSubmit={handleSubmit}>
            <input
              placeholder='Paste a YouTube link '
              className='share-input'
              type='text'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button className='share-button' type='Submit'>
              <FontAwesomeIcon icon={faPlay} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateSession;
