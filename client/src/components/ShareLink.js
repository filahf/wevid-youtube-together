import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

export default function CopyExample(props) {
  const [text, setText] = useState("link");
  const textAreaRef = useRef(null);
  var currentUrl = String(window.location.href);
  console.log(currentUrl);

  useEffect(() => {
    setText(currentUrl + props.link);
  }, [currentUrl, props.link]);
  function copyToClipboard(e) {
    e.preventDefault();
    textAreaRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    setText("Copied to clipboard");
  }

  return (
    <div className="share-container">
      <h1 className="text">Share link</h1>
      <form className="share-form">
        <input className="share-input" ref={textAreaRef} value={text} />
        <button className="share-button" onClick={copyToClipboard}>
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </form>
    </div>
  );
}
