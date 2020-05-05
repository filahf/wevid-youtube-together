import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";

import CreateSession from "./components/CreateSession";
import Session from "./components/Session";
import "./styles.scss";

function App() {
  const [leader, setLeader] = useState(false);
  const [sessionID, setSessionID] = useState(null);
  const [videoID, setVideoID] = useState(null);
  const [action, setAction] = useState("join");

  const createSession = (vidID, session, leaderbool) => {
    setVideoID(vidID);
    setSessionID(session);
    setLeader(leaderbool);
    setAction("create");
    console.log(vidID, session, leaderbool);
  };
  return (
    <Router>
      <>
        <div className="skewed"></div>
        <div className="content">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <CreateSession session={createSession} />
            </Route>
            <Route path="/watch/:sessionID?">
              <Session
                leader={leader}
                sessionID={sessionID}
                videoID={videoID}
                action={action}
              />
              <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </Route>
          </Switch>
        </div>
      </>
    </Router>
  );
}

export default App;
