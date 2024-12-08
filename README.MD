# [WIP]: SSE Chat 🗨️

A simple demo utilizing **Server-Sent Events (SSE)** to create a real-time chat room experience. The server pushes messages to all connected clients in real-time using Node.js, allowing for a smooth, scalable chat experience without the complexity of WebSockets.

## How it Works 🛠️
- **Server-Sent Events (SSE)**: The server establishes a connection with the client using SSE, allowing it to push real-time updates like chat messages. Clients listen for incoming events and display new messages instantly.
  
- **Message Flow**:
  1. 📨 When a user sends a message, it is sent to the server via a `POST` request.
  2. 📡 The server receives the message and broadcasts it to all connected clients through the SSE stream.
  3. 💬 Clients automatically display the new message in real-time, providing a seamless chat experience.

- 🔄 **Automatic Reconnection**: If the connection between the server and client is interrupted (e.g., due to network issues), SSE automatically attempts to reconnect, ensuring that users can continue receiving updates once the connection is restored.


## Why SSE? 🤔
- ⚡ **Lightweight and Simple**: Server-Sent Events (SSE) is a straightforward solution for real-time updates from the server to the client. It operates over a single HTTP connection, eliminating the need for the complex setup of WebSockets.
- 🔁 **One-way Communication**: SSE shines in scenarios where the server pushes frequent updates to the client without needing constant responses from the client (e.g., real-time notifications, live data feeds). While a chat room may not be the best example for SSE due to the interactive nature of chats, it's a great learning exercise to understand how SSE works. 😄
- 🔄 **Automatic Reconnection**: Built-in reconnection logic ensures clients automatically re-establish their connection if the server or network goes down temporarily.
- 🌐 **Scalable**: SSE can broadcast updates to multiple clients with minimal overhead, making it suitable for applications with many concurrent users.
