import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';

import CreateSession from './components/CreateSession';
import Session from './components/Session';
import './styles.scss';

function App() {
  const [leader, setLeader] = useState(false);
  const [sessionID, setSessionID] = useState(null);
  const [videoID, setVideoID] = useState(null);
  const [action, setAction] = useState('join');

  const createSession = (vidID, session, leaderbool) => {
    setVideoID(vidID);
    setSessionID(session);
    setLeader(leaderbool);
    setAction('create');
    console.log(vidID, session, leaderbool);
  };
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <CreateSession session={createSession} />
          </Route>
          <Route path='/watch/:sessionID?'>
            <Session
              leader={leader}
              sessionID={sessionID}
              videoID={videoID}
              action={action}
            />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
