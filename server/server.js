const express = require('express');
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 3000;

app.use(express.json());



app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});

let clients = {};

function sendMessage(message) {
    console.log(`Sending message: ${message}`);
    // console.log(clients.length);
    // send message to clients
    for (const clientId in clients) {
        clients[clientId].write(`data: ${message}\n\n`);
    }
}


app.get('/events/sse', function (req, res) {

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    const eventSource = req.get('Accept').includes('text/event-stream') ? res : null;

    if (eventSource) {
        const clientId = uuidv4();
        clients[clientId] = eventSource;
        console.log(`New client connected: ${clientId}`);
        console.log(clients.length);
        eventSource.write(`data: Hello, client ${clientId}\n\n`);
        // const intervalId = setInterval(() => {
        //     eventSource.write(`data: Hello, Client id:${clientId} Server Time: ${new Date().toISOString()}\n\n`);
        // }, 1000);

        req.on('close', () => {
            delete clients[clientId];
            // clearInterval(intervalId);
        });
    } else {
        res.status(406).send('Not Acceptable');
    }
});

app.options('/send-message', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200);
});

app.post('/send-message', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');

    const message = req.body.text;
    console.log(message);
    sendMessage(message);
    res.send({ message: 'Message sent successfully' });

})
