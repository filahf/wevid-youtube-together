import React, { useRef, useState } from "react";

export default function CopyExample() {
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    setCopySuccess("Copied!");
  }

  return (
    <div>
      {
        /* Logical shortcuto ony displaying the 
          button if the copy command exists */
        document.queryCommandSupported("copy") && (
          <div>
            <button onClick={copyToClipboard}>Copy</button>
            {copySuccess}
          </div>
        )
      }
      <form>
        <input className="share" ref={textAreaRef} value="Some text to copy" />
      </form>
    </div>
  );
}
