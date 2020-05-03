import React, { useState } from 'react';
import { uuid } from 'uuidv4';

const CreateSession = (props) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    var videoID = youtubeParser(url);
    props.session(videoID, uuid());
  };

  const youtubeParser = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };
  return (
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
  );
};

export default CreateSession;
