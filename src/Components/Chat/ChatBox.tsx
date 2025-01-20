import React from "react";
import "../../CSS/ChatBox.css";

import MessageGetter from "./MessageGetter.tsx";
import MessageCreator from "./MessageCreator.tsx";
const username = "TestUser";
const ChatBox = () => {
  return (
    <div className='ChatBox'>
      <h1>Chat Box</h1>
      <MessageGetter userName={username} />
      <MessageCreator userName={username} />
    </div>
  );
};

export default ChatBox;
