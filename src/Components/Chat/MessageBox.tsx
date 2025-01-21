import React from "react";
import { messageBox } from "../../types/LocalTypes";

import { useState, useEffect } from "react";
const MessageBox = ({
  message,
  key,
  isOther,
  isShowName,
}: {
  message: messageBox;
  key: number;
  isOther: boolean;
  isShowName: boolean;
}) => {
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [messageSize, setMessageSize] = useState(255);

  useEffect(() => {
    setDisplayedMessage(message.message.slice(0, messageSize));
  }, [message, messageSize]);

  return (
    <div
      id='MessageBox'
      className={`message-wrapper ${isOther ? "" : "other-message"}`}
      key={`message-${key}`}
    >
      <div className='message-box-wrapper'>
        {isShowName && (
          <h1 className='message-box-username'>{message.username}:</h1>
        )}
        <div className='message-box'>
          <p className='message-box-message'>{displayedMessage}</p>
        </div>
        {message.message.length > messageSize ? (
          <p
            onClick={() => {
              setMessageSize(messageSize + 256);
            }}
          >
            {" "}
            read more...
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default MessageBox;
