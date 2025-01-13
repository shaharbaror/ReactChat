import React from "react";
import "./CSS/App.css";

import Temp from "./Components/Temp.tsx";

function App() {
  return (
    <div className='App'>
      <h1>Hello World!</h1>

      <Temp username='hello' password='worlds?' />
    </div>
  );
}

export default App;
