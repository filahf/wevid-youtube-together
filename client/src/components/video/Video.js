import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import './video.scss';
import Views from './views';
var player;
const Video = (props) => {
  const notify = () => {
    toast(
      <div>
        <FontAwesomeIcon icon={faUserFriends} />
        &nbsp; A friend joined!
      </div>
    );
  };

  const [videoID, setVideoID] = useState(props.videoID);

  const loadVideo = () => {
    if (!player) {
      player = new window.YT.Player('player', {
        videoId: videoID,
        playerVars: {
          mute: 1,
          autoplay: 0,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onStateChange,
        },
      });
    } else {
      player.loadVideoById(videoID);
    }
  };

  const join = (data) => {
    setVideoID(data.videoID);
  };

  useEffect(() => {
    props.socket.addEventListener('message', (event) => {
      let data = JSON.parse(event.data);
      if (data.event === 'sync') updateVideo(data);
      if (data.event === 'join') join(data);
      if (data.event === 'users' && props.leader) notify();
      if (data.event === 'newVideo') setVideoID(data.videoID);
    });
    if (videoID !== null) {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';

        window.onYouTubeIframeAPIReady = loadVideo;

        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else loadVideo();
    }
    // eslint-disable-next-line
  }, [videoID]);

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
    if (triggered === 1) sync();
    else if (triggered === 2) syncPause();
  };

  return (
    <>
      <div className='videoWrap'>
        <div className='video'>
          <div id='player'>
            <h3>No video found</h3>
          </div>
        </div>
        {props.leader && <Views socket={props.socket} />}
      </div>
    </>
  );
};

export default Video;
