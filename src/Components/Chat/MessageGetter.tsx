import React from "react";

import MessageBox from "./MessageBox.tsx";

import { useState, useEffect } from "react";
const MessageGetter = ({ userName }: { userName: string }) => {
  const [userInput, setUserInput] = useState([{ message: "", username: "" }]);

  useEffect(() => {
    // first get all the messages from the chat
    GetMessages("GetMessageForce");
    console.log("in here");
    // then set an interval to get new messages every second
    setInterval(() => {
      GetMessages();
    }, 1000);
  }, []);
  const GetMessages = async (order: string = "GetMessage") => {
    try {
      const response = await fetch(`http://localhost:3000/${order}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to get messages");
      }
      const data = await response.json();
      console.log(`Server response: ${data.message}`);

      // if there are no new messages we don't want to update the state
      if (data.message !== "no new messages") {
        setUserInput(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div id='MessageGetter' className='message-getter-wrapper'>
      {userInput.map((message, i) => {
        return (
          <MessageBox
            message={message}
            key={i}
            isOther={message.username === userName}
          />
        );
      })}
    </div>
  );
};

export default MessageGetter;
