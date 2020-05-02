import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Video from './components/Video';
import './styles.scss';
const url = 'ws://localhost:5000';

function App() {
  const [leader, setLeader] = useState(true);
  const [sessionID, setSessionID] = useState(null);
  const socket = new WebSocket(url);

  useEffect(() => {
    // Update the document title using the browser API
    socket.onopen = () => {
      console.log('connected');
      socket.send(
        JSON.stringify({
          event: 'room',
        })
      );
      socket.addEventListener('message', (event) => {
        let data = JSON.parse(event.data);
        console.log(data);
        if (data.event === 'control') this.handleControlEvent(data);
      });
    };
  });
  return (
    <>
      <Navbar />
      <Video leader={leader} socket={socket} />
    </>
  );
}

export default App;
