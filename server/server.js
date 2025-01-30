const express = require("express"); // Use require for CommonJS modules
const cors = require("cors");
const app = express();

app.use(cors());
// Middleware to parse JSON
app.use(express.json());

let messages = [
  {
    username: "jhon",
    message: "hello",
  },
];

let clients = new Map();

async function addMessage(message) {
  await messages.push(message);
}

app.get("/GetMessage", (req, res) => {
  // check if the client has already requested to get all the messages
  const clientId = req.query.clientId;
  if (clientId && !clients.has(clientId)) {
    clients.set(clientId, messages[messages.length - 1]);
    res.json({ message: messages });
    return;
  }
  if (clients.get(clientId) !== messages[messages.length - 1]) {
    res.json({ message: messages });
    clients.set(clientId, messages[messages.length - 1]);
    return;
  }
  res.json({ message: "no new messages" });
});

// the same as getMessage but it will return the message even if it is the same as the last one
app.get("/GetMessageForce", (req, res) => {
  const clientId = req.query.clientId;
  if (clientId && !clients.has(clientId)) {
    clients.set(clientId, messages[messages.length - 1]);
    res.json({ message: messages });
    return;
  }

  res.json({ message: messages });
  clients.set(clientId, messages[messages.length - 1]);
});

app.post("/", (req, res) => {
  const { message } = req.body;
  if (message.purpose) {
    console.log(message.purpose);
    if (message.purpose === "addMessage") {
      messages.push(message.content);

      console.log(message);
    }
  }
  console.log(`Received message: ${message}`);

  if (message === "GetMessage") {
    res.json({ message: messages });
  } else {
    // Process the message and send a response
    const responseMessage = `Server received: ${message} successfully`;
    res.json({ message: responseMessage });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
