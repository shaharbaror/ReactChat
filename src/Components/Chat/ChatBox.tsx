import React from "react";
import "../../CSS/ChatBox.css";

import MessageGetter from "./MessageGetter.tsx";
import MessageCreator from "./MessageCreator.tsx";

const ChatBox = () => {
  return (
    <div className='ChatBox'>
      <h1>Chat Box</h1>
      <MessageGetter />
      <MessageCreator userName='Shahar' />
    </div>
  );
};

export default ChatBox;
