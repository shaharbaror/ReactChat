const express = require("express"); // Use require for CommonJS modules
const cors = require("cors");
const app = express();

const { db } = require("./talkWithFirebase.js");

//const summarizeChat = require("./summarizeChat");

app.use(cors());
// Middleware to parse JSON
//app.use("/server", summarizeChat);
app.use(express.json());

let messages = [
  {
    username: "john",
    message: "hello",
  },
];

let clients = new Map();

async function addMessage(message) {
  const docRef = db.collection("message").doc("alovelace");
  await docRef.set({
    username: message.username,
    message: message.message,
    time: 1815,
  });

  messages.push(message);
  //db.ref("messages").set(messages);
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
    //a check to see if a message is empty, if it is we dont add a message box
    if (
      message.purpose === "addMessage" &&
      message.content.message.length != 0
    ) {
      addMessage(message.content);
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
// Start the server
app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
