import React, { useState } from 'react';
import { uuid } from 'uuidv4';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Welcome from '../welcome/welcome';

import './createSession.scss';
import { toast } from 'react-toastify';

const CreateSession = (props) => {
  const [url, setUrl] = useState('');
  const [redirect, setRedirect] = useState(false);
  const notify = () => toast('Invalid Link!');

  const sessionID = uuid().slice(0, 6);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    var videoID = youtubeParser(url);
    if (!videoID) {
      notify();
      return;
    }
    props.session(videoID, sessionID, true);
    setRedirect(true);
  };

  const youtubeParser = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: `/watch/leader`,
        }}
      />
    );
  }
  return (
    <>
      <Welcome />
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
    </>
  );
};

export default CreateSession;
