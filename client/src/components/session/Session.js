import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Video from '../video/Video';
import ShareLink from './ShareLink';

const Session = (props) => {
  const url = 'ws://youtube-together-app.herokuapp.com/';
  const socket = new WebSocket(url);
  let sessID = props.sessionID;

  let { sessionID } = useParams();
  if (!sessID) {
    sessID = sessionID;
  }

  useEffect(() => {
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          event: 'session',
          action: props.action,
          sessionID: sessID,
          videoID: props.videoID,
        })
      );
    };
  });
  if (sessionID === 'leader' && !props.leader) {
    return (
      <Redirect
        to={{
          pathname: `/`,
        }}
      />
    );
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
    </div>
  );
};

export default Session;
