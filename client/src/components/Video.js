import React, { useState, useEffect } from 'react';
var player;
const Video = (props) => {
  const loadVideo = () => {
    player = new window.YT.Player('player', {
      videoId: props.videoID,
      playerVars: {
        autoplay: 1,
        mute: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onStateChange,
      },
    });
  };

  useEffect(() => {
    // Update the document title using the browser API
    props.socket.addEventListener('message', (event) => {
      let data = JSON.parse(event.data);
      if (data.event === 'sync') this.updateVideo(data);
    });

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'http://www.youtube.com/iframe_api';

      window.onYouTubeIframeAPIReady = loadVideo;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else loadVideo();
  });

  const onPlayerReady = (event) => event.target.playVideo();
  const onStateChange = (event) => changeState(event.data);
  const sync = () => props.socket.send(currentStatus());
  const seekTo = (second) => player.seekTo(second, true);
  const pauseVideo = () => this.player.pauseVideo();

  const playVideo = () => this.player.playVideo();
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
      currentTime: player.getCurrentTime(),
    });

  const changeState = (triggered) => {
    if (props.leader) {
      if (triggered === 1) sync();
      else if (triggered === 2) syncPause();
    }
  };
  return (
    <div>
      <div className='embed-responsive embed-responsive-16by9'>
        <div className='embed-responsive-item' id='player'></div>
      </div>
    </div>
  );
};

export default Video;
