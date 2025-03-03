import { useState } from "react";
import axios from "axios";

function ChatBot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "system", content: "Hello! How can I assist you today?" }]);
  const [input, setInput] = useState("");

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post("http://localhost:5000/api/boot/chat", { message: input });
      const aiReply = response.data.reply;

      setMessages([...newMessages, { role: "assistant", content: aiReply }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      <div onClick={() => setIsChatOpen(!isChatOpen)} className="fixed bottom-10 right-10 bg-[#F0F0D7] p-4 rounded-full shadow-lg cursor-pointer transition duration-300 hover:bg-[#AAB98A]">
        <span className="text-white text-2xl">🤖</span>
      </div>

      {/* Chatbot Box */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-10 w-96 bg-white rounded-xl shadow-lg z-50 p-4">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h3 className="text-lg font-bold text-[#AAB99A]">AI Chatbot</h3>
            <button onClick={() => setIsChatOpen(false)} className="text-black text-2xl font-bold p-2 transition duration-300 hover:text-[#AAB98A]">
              ✖
            </button>
          </div>
          <div className="h-64 overflow-y-auto bg-gray-50 p-3 rounded-md">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 my-1 rounded-md ${msg.role === "user" ? "bg-[#D0DDD0] self-end" : "bg-[#AAB99A] self-start"}`}>
                {msg.content}
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="flex mt-2">
            <input
              type="text"
              className="flex-grow p-2 border rounded-md"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit" className="ml-2 p-2 bg-[#AAB99A] text-white rounded-md hover:bg-[#AAB98A]">Send</button>
          </form>
        </div>
      )}
    </>
  )
}

export default ChatBot;
