import React from "react";

import { Template } from "../types/LocalTypes";
const Temp = ({ username, password }: Template) => {
  return (
    <div>
      <h1>Temp Component</h1>
      <p>This is a basic template for the Temp component.</p>
      <div>
        <h1>Username: {username}</h1>
        <h2>Password: {password}</h2>
      </div>
    </div>
  );
};

export default Temp;
