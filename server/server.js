const express = require("express"); // Use require for CommonJS modules
const cors = require("cors");
const app = express();

app.use(cors());
// Middleware to parse JSON
app.use(express.json());

app.get("/hi", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  const { message } = req.body;
  console.log(`Received message: ${message}`);

  // Process the message and send a response
  const responseMessage = `Server received: ${message} successfully`;
  res.json({ message: responseMessage });
});

// this is an example of how to send a JSON response back to the client
app.get("/api/users", (req, res) => {
  // Send a JSON response back to the client
  res.json([
    { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com" },
    { id: 2, firstName: "Jane", lastName: "Doe", email: "jane@example.com" },
    { id: 3, firstName: "Jim", lastName: "Beam", email: "jim@example.com" },
  ]);
});

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
