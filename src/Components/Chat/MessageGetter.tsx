import React from "react";

import { useState } from "react";
const MessageGetter = () => {
  const [userInput, setUserInput] = useState([{ message: "", username: "" }]);
  const [serverResponse, setServerResponse] = useState("");

  const GetMessages = async () => {
    try {
      const response = await fetch("http://localhost:3000/GetMessage", {
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
      setUserInput(data.message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div id='MessageGetter'>
        {userInput.map((message, i) => {
          return (
            <div key={`message-${i}`}>
              <h1>{message.username}</h1>
              <p>{message.message}</p>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={GetMessages}> Refresh Chat</button>
      </div>
    </>
  );
};

export default MessageGetter;
