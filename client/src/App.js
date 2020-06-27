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

  const createSession = (vidID, session, leaderbool) => {
    setVideoID(vidID);
    setSessionID(session);
    setLeader(leaderbool);
  };
  return (
    <Router>
      <div className='skewed'></div>
      <div className='container'>
        <Navbar />
        <main className='content'>
          <Switch>
            <Route
              exact
              path='/'
              render={() => <CreateSession session={createSession} />}
            />
            <Route
              path='/watch/:sessionID'
              render={() => (
                <Session
                  leader={leader}
                  sessionID={sessionID}
                  videoID={videoID}
                />
              )}
            />
          </Switch>
        </main>
        <Footer />
      </div>
      <ToastContainer
        position='bottom-right'
        autoClose={2000}
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
