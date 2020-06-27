import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

function notifyLinkInvalid() {
  toast(
    <div>
      <FontAwesomeIcon icon={faExclamationTriangle} />
      &nbsp; Invalid Link!
    </div>
  );
}

function validateYouTubeUrl(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
};

export function handleYouTubeUrl(url) {
  const videoID = validateYouTubeUrl(url);
  if (!videoID) {
    notifyLinkInvalid();
    return;
  }
  return videoID;
}
