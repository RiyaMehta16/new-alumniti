import React, { useState } from "react";
import "./Chatbot.css";

const API_KEY = "AIzaSyCZr5XSib2ni0zhUrgBZv5uCfN4NzWwOqw";

const Chatbot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]); // Keep user message
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMessage.text }] }],
          }),
        }
      );

      const data = await response.json();
      const botText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I didn't understand that.";

      typeMessage(botText);
    } catch (error) {
      console.error("Error fetching response:", error);
      setIsTyping(false);
    }
  };

  const typeMessage = (text) => {
    setIsTyping(false);
    const words = text.split(" ");
    let index = 0;
    let botMessage = "";

    setMessages((prev) => [...prev, { text: "", sender: "bot" }]);

    const interval = setInterval(() => {
      if (index < words.length) {
        botMessage += words[index] + " ";
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            text: botMessage,
            sender: "bot",
          };
          return newMessages;
        });
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust typing speed here
  };

  // Function to start a new chat
  const startNewChat = () => {
    setMessages([]);
    setSidebarOpen(false);
  };

  return (
    <div className={`container ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* Header */}
      <div className="header">
        {!sidebarOpen && (
          <span className="menu-icon" onClick={() => setSidebarOpen(true)}>
            ☰
          </span>
        )}
        <span className="title">AI Mentor⚡</span>
      </div>

      {/* Profile & History */}

      {/* Greeting */}
      {messages.length === 0 && (
        <h1 className="greeting">
          <span className="gradient-text">What can I help you with?</span>
        </h1>
      )}

      {/* Chat Section */}
      <div className="chat-section">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}-message`}>
            {msg.text}
          </div>
        ))}
        {/* Show "Typing..." message when waiting for a response */}
        {isTyping && <div className="chat-message bot-message">Typing...</div>}
      </div>

      {/* Input Bar */}
      <div className="input-bar">
        <button className="plus-icon">+</button>
        <input
          type="text"
          placeholder="Ask anything"
          className="input-field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="send-icon" onClick={sendMessage}>
          ➤
        </button>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          ☰
        </button>
        <ul>
          <li>
            <button className="new-chat" onClick={startNewChat}>
              + New Chat
            </button>
          </li>
        </ul>
        <br />
        <p className="recent">Recent</p>
      </div>

      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  );
};

export default Chatbot;
