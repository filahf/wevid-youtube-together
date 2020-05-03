import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Video from './components/Video';
import CreateSession from './components/CreateSession';
import './styles.scss';
const url = 'ws://localhost:5000';

function App() {
  const [leader, setLeader] = useState(true);
  const [sessionID, setSessionID] = useState(null);
  const [videoID, setVideoID] = useState('00vnln25HBg');
  const socket = new WebSocket(url);

  const createSession = (id, session) => {
    setVideoID(id);
    console.log(id, session);
  };

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
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <CreateSession session={createSession} />
          </Route>
          <Route path='/watch'>
            <Video videoID={videoID} leader={leader} socket={socket} />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
