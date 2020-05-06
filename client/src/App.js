import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/footer';
import CreateSession from './components/session/CreateSession';
import Session from './components/session/Session';

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
  };
  return (
    <Router>
      <div className='skewed'></div>
      <div className='container'>
        <Navbar />
        <div className='content'>
          <Switch>
            <Route exact path='/'>
              <CreateSession session={createSession} />
            </Route>
            <Route path='/watch/:sessionID'>
              <Session
                leader={leader}
                sessionID={sessionID}
                videoID={videoID}
                action={action}
              />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
