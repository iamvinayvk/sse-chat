import { useState } from "react";
import { useClientStore } from "../store/clientStore";
const BASE_URL = "http://localhost:3000";
const ChatBox = (props) => {
  const { messages } = props;
  const [inputMessage, setInputMessage] = useState("");
  const { clientId } = useClientStore();

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      fetch(`${BASE_URL}/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputMessage, userId: clientId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      setInputMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen p-4">
      <div className="text-xl font-bold text-center text-gray-700 p-2 border-b">
        Server Sent Events Demo
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-4 bg-gray-100">
        {messages.map((message) => (
          <div
            key={message.timestamp}
            className={`flex ${
              message.clientId === clientId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 max-w-xs rounded-lg ${
                message?.clientId === clientId
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-700 rounded-bl-none"
              }`}
            >
              {message.message}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="flex items-center p-2 border-t bg-white">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
