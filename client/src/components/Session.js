import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Video from './Video';

const Navbar = (props) => {
  const url = 'ws://localhost:5000';
  const socket = new WebSocket(url);
  let sessID = props.sessionID;
  let { sessionID } = useParams();
  if (!sessID) {
    sessID = sessionID;
  }
  useEffect(() => {
    // Update the document title using the browser API
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          event: 'session',
          action: props.action,
          sessionID: sessID,
          videoID: props.videoID,
        })
      );
      socket.addEventListener('message', (event) => {
        let data = JSON.parse(event.data);
        console.log('message data', data);
      });
    };
  });
  return (
    <Video
      videoID={props.videoID}
      leader={props.leader}
      sessionID={sessID}
      socket={socket}
    />
  );
};

export default Navbar;
