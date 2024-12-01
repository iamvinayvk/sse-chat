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

function sendMessage(message, userId) {
  for (const clientId in clients) {
    const dataPayLoad = {
      message: message,
      clientId: userId ?? clientId,
      timestamp: new Date().toISOString(),
    };

    clients[clientId].write(`data: ${JSON.stringify(dataPayLoad)}\n\n`);
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
    const dataPayLoad = {
      message: `Hello, client ${clientId}`,
      clientId: clientId,
      timestamp: new Date().toISOString(),
    };
    eventSource.write(`data:${JSON.stringify(dataPayLoad)}\n\n`);
    req.on("close", () => {
      delete clients[clientId];
    });
  } else {
    res.status(406).send("Not Acceptable");
  }
});

app.post("/send-message", function (req, res) {
  const message = req.body.text;
  const userId = req.body.userId;
  sendMessage(message, userId);
  res.send({ message: "Message sent successfully" });
});
