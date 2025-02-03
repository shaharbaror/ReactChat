const express = require("express"); // Use require for CommonJS modules
const cors = require("cors");
const app = express();
const summarizeChat = require("./summarizeChat");

app.use(cors());
// Middleware to parse JSON
app.use("/server", summarizeChat);
app.use(express.json());

let messages = [
  {
    username: "john",
    message: "hello",
  },
];

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const fire_app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
    //a check to see if a message is empty, if it is we dont add a message box
    if (
      message.purpose === "addMessage" &&
      message.content.message.length != 0
    ) {
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

// Example API route to return user data
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com" },
    { id: 2, firstName: "Jane", lastName: "Doe", email: "jane@example.com" },
    { id: 3, firstName: "Jim", lastName: "Beam", email: "jim@example.com" },
  ]);
});

const path = require("path");

// Serve static files from the React frontend
app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
