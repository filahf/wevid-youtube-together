import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Video from '../video/Video';
import ShareLink from './ShareLink';
import { handleYouTubeUrl } from '../../linkHandler';

const Session = (props) => {
  const history = useHistory();
  const serverAddress = 'ws://localhost:5000/';
  const socket = new WebSocket(serverAddress);
  let sessID = props.sessionID;

  const [url, setUrl] = useState('');

  let { sessionID } = useParams();
  if (!sessID) {
    sessID = sessionID;
  }

  useEffect(() => {
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          event: 'session',
          action: props.leader ? 'create' : 'join',
          sessionID: sessID,
          videoID: props.videoID,
        })
      );
    };
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const videoID = handleYouTubeUrl(url);
    socket.send(
      JSON.stringify({
        event: 'session',
        action: 'update',
        sessionID: sessID,
        videoID: videoID,
      })
    );
  };

  if (sessionID === 'leader' && !props.leader) {
    history.push('/');
  }
  return (
    <div>
      <Video
        videoID={props.videoID}
        leader={props.leader}
        sessionID={sessID}
        socket={socket}
      />
      {props.leader && <ShareLink link={props.sessionID} />}
      {props.leader && (
        <div className='input-container'>
          <form className='input-form' onSubmit={handleSubmit}>
            <input
              placeholder='Paste a new YouTube link'
              className='input-field'
              type='text'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button className='input-button' type='Submit'>
              <FontAwesomeIcon icon={faPlay} />
            </button>
          </form>
          <br/>
        </div>
      )}
    </div>
  );
};

export default Session;
