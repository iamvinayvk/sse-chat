const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});

let clients = {};

function sendMessage(message) {
  console.log(`Sending message: ${message}`);
  for (const clientId in clients) {
    clients[clientId].write(`data: ${message}\n\n`);
  }
}

app.get("/events/sse", function (req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  const eventSource = req.get("Accept").includes("text/event-stream")
    ? res
    : null;

  if (eventSource) {
    const clientId = uuidv4();
    clients[clientId] = eventSource;
    console.log(`New client connected: ${clientId}`);
    eventSource.write(`data: Hello, client ${clientId}\n\n`);
    req.on("close", () => {
      delete clients[clientId];
    });
  } else {
    res.status(406).send("Not Acceptable");
  }
});

app.post("/send-message", function (req, res) {
  const message = req.body.text;
  sendMessage(message);
  res.send({ message: "Message sent successfully" });
});
