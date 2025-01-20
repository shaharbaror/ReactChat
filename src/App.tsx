import React, { useState } from "react";
import "./CSS/App.css";

import Temp from "./Components/Temp.tsx";

function App() {
  const [userInput, setUserInput] = useState<string>("");
  return (
    <div className='App'>
      <h1>Hello World!</h1>
      <input
        type='text'
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button>Send to server</button>
      <Temp username='hello' password='worlds?' />
      <h1>hi shahar</h1>
    </div>
  );
}

export default App;
