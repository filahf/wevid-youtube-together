import React, { useEffect, useState } from "react";
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
      socket.addEventListener("message", (event) => {
        let data = JSON.parse(event.data);
      });
    };
  });
  return (
    <div className="content">
      <p>Leader {String(props.leader)}</p>
      <p>sessionID {props.sessionID}</p>
      <Video
        videoID={props.videoID}
        leader={props.leader}
        sessionID={sessID}
        socket={socket}
      />
      <ShareLink />
    </div>
  );
};

export default Navbar;
