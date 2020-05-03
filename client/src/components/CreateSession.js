import React, { useState } from 'react';
import { uuid } from 'uuidv4';
import { Redirect } from 'react-router-dom';

const CreateSession = (props) => {
  const [url, setUrl] = useState('');
  const [redirect, setRedirect] = useState(false);

  const sessionID = uuid().slice(0, 6);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    var videoID = youtubeParser(url);
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
          pathname: `/watch/`,
        }}
      />
    );
  }
  return (
    <div className='content'>
      <form onSubmit={handleSubmit}>
        <label>
          Youtube url:
          <input
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default CreateSession;
