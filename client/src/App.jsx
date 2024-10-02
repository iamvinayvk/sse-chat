import { useState } from "react";
import ChatBox from "./component/ChatBox";
import useSSE from "./hooks/useSSE";

const BASE_URL = "http://localhost:3000";
function App() {
  const [messages, setMessages] = useState([]);
  const handleMessage = (data) => {
    console.log("Received event:", data);
    setMessages((prevMessages) => [...prevMessages, data]);
    console.log(`Received ${messages}`);
  };

  const handleError = (error) => {
    console.error("SSE Error:", error);
  };

  const handleOpen = () => {
    console.log("Event source opened");
  };

  // Using the custom hook to manage SSE connection
  useSSE(`${BASE_URL}/events/sse`, handleMessage, handleError, handleOpen);

  return (
    <>
      <ChatBox messages={messages} />
    </>
  );
}

export default App;
