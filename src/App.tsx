import React, { useState } from "react";
import "./CSS/App.css";

import Temp from "./Components/Temp.tsx";
import ChatBox from "./Components/Chat/ChatBox.tsx";

function App() {
  const [userInput, setUserInput] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const SendMessage = async () => {
    try {
      const response = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      const data = await response.json();
      console.log(`Server response: ${data}`);
      setServerResponse(data.message);
    } catch (error) {
      console.error(error);
    }
  };
  // return (
  //   <div className='App'>
  //     <h1>Hello World!</h1>
  //     <input
  //       type='text'
  //       value={userInput}
  //       onChange={(e) => setUserInput(e.target.value)}
  //     />
  //     <button
  //       onClick={() => {
  //         SendMessage();
  //       }}
  //     >
  //       Send to server
  //     </button>
  //     <h2>{serverResponse}</h2>
  //     <Temp username='hello' password='worlds?' />
  //     <h1>hi shahar</h1>
  //   </div>
  // );
  return (
    <div className='ChatWrapper'>
      <ChatBox />
    </div>
  );
}

export default App;
