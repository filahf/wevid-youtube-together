import React, { useRef, useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

export default function CopyExample(props) {
  const [text, setText] = useState('link');
  const textAreaRef = useRef(null);
  var currentUrl = String(window.location.href).replace('leader', '');
  console.log(currentUrl);

  useEffect(() => {
    setText(currentUrl + props.link);
  }, [currentUrl, props.link]);
  function copyToClipboard(e) {
    e.preventDefault();
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setText('Copied to clipboard');
    const timer = setTimeout(() => setText(currentUrl + props.link), 1000);
    return () => clearTimeout(timer);
  }

  return (
    <div className='share-container'>
      <h3 className='text'>Share this link</h3>
      <form className='share-form'>
        <input
          className='share-input'
          readonly
          ref={textAreaRef}
          value={text}
        />
        <button className='share-button' onClick={copyToClipboard}>
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </form>
    </div>
  );
}
