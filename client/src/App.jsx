import { useState } from "react";
import ChatBox from "./component/ChatBox";
import useSSE from "./hooks/useSSE";

const BASE_URL = "http://localhost:3000";
function App() {
  const [messages, setMessages] = useState([]);

  const handleMessage = (data) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  };

  const handleError = (error) => {
    console.error("SSE Error:", error);
  };

  const handleOpen = () => {};

  // Using the custom hook to manage SSE connection
  useSSE(`${BASE_URL}/events/sse`, handleMessage, handleError, handleOpen);

  return (
    <>
      <ChatBox messages={messages} />
    </>
  );
}

export default App;
