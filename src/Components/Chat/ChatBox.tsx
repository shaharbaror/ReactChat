import React from "react";
import "../../CSS/ChatBox.css";

import MessageGetter from "./MessageGetter.tsx";
import MessageCreator from "./MessageCreator.tsx";
const username = "Ido";
const ChatBox = () => {
  return (
    <div className='ChatBox'>
      <div className='ChatBox-header'>
        <img src={require("../../Images/logo.jpg")} alt='ChiChat Logo' />
        <h1>ChiChat Box</h1>
      </div>
      <MessageGetter userName={username} />
      <MessageCreator userName={username} />
    </div>
  );
};

export default ChatBox;
