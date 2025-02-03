import React, { useState } from "react";
import "./CSS/App.css";

import Temp from "./Components/Temp.tsx";
import ChatBox from "./Components/Chat/ChatBox.tsx";

function App() {
  return (
    <div className="ChatWrapper">
      <ChatBox />
    </div>
  );
}

export default App;
