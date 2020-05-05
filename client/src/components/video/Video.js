import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import LeaderBar from '../session/LeaderBar';
var player;
const Video = (props) => {
  const notify = () => toast('En vän har anslutit!');

  const [videoID, setVideoID] = useState(props.videoID);

  const loadVideo = () => {
    player = new window.YT.Player('player', {
      videoId: videoID,
      playerVars: {
        autoplay: 0,
        mute: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onStateChange,
      },
    });
  };

  useEffect(() => {
    props.socket.addEventListener('message', (event) => {
      let data = JSON.parse(event.data);
      console.log(data);
      if (data.event === 'sync') updateVideo(data);
      if (data.event === 'join') setVideoID(data.videoID);
      if (data.event === 'users') notify();
    });
    if (videoID !== null) {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'http://www.youtube.com/iframe_api';

        window.onYouTubeIframeAPIReady = loadVideo;

        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else loadVideo();
    }
  });

  const updateVideo = (data) => {
    let videoStatus = player.getPlayerState();
    if (
      data.action === 'currenttime' &&
      (videoStatus === 2 || videoStatus === -1)
    ) {
      playVideo();
      seekTo(data.currentTime);
    } else if (data.action === 'pause' && videoStatus !== 2) pauseVideo();
  };

  const onPlayerReady = (event) => event.target.playVideo();

  const onStateChange = (event) => changeState(event.data);
  const sync = () => props.socket.send(currentStatus());
  const seekTo = (second) => player.seekTo(second, true);
  const pauseVideo = () => player.pauseVideo();

  const playVideo = () => player.playVideo();
  const syncPause = () => {
    props.socket.send(
      JSON.stringify({
        event: 'sync',
        action: 'pause',
      })
    );
  };
  const currentStatus = () =>
    JSON.stringify({
      event: 'sync',
      action: 'currenttime',
      videoID: videoID,
      currentTime: player.getCurrentTime(),
    });

  const changeState = (triggered) => {
    if (props.leader) {
      if (triggered === 1) sync();
      else if (triggered === 2) syncPause();
    }
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <div id='player' style={{ textAlign: 'center' }}>
          <h5>no video found</h5>
          <h2>Dela en egen video</h2>
        </div>
        {props.leader && <LeaderBar views={props.views} />}
      </div>
    </>
  );
};

export default Video;
