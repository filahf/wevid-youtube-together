import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Video from "./Video";
import ShareLink from "./ShareLink";

const Navbar = (props) => {
  const url = "ws://localhost:5000";
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
          event: "session",
          action: props.action,
          sessionID: sessID,
          videoID: props.videoID,
        })
      );
    };
  });
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

export default Navbar;
