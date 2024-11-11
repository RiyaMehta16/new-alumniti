import { Send, Sparkles, Zap } from 'lucide-react'; // Import icons from lucide-react
import React, { useState, useEffect, useRef } from 'react'; // Import React, useState, useEffect, and useRef for managing state, effects, and refs
import Ai from "../Assets/ai.png"
import axios from 'axios'; // Axios for making API requests
import pic from "../Assets/yogesh dp.jpg"

const Chatbot = () => {
  const [messages, setMessages] = useState([]); // Store chat history
  const [input, setInput] = useState(''); // Store user input
  const [isTyping, setIsTyping] = useState(false); // Track if the bot is typing
  const [typingMessage, setTypingMessage] = useState(''); // Store current typing message
  const chatContainerRef = useRef(null); // Reference to the chat container for auto-scrolling

  // Function to simulate bot typing the message one character at a time
  const typeMessage = (botMessage) => {
    setIsTyping(true); // Bot is typing
    setTypingMessage(''); // Reset typing message

    let index = 0;
    const typingInterval = setInterval(() => {
      setTypingMessage((prev) => prev + botMessage[index]); // Add one character at a time
      index++;

      // When typing is done
      if (index === botMessage.length) {
        clearInterval(typingInterval); // Stop typing
        setIsTyping(false); // Bot finished typing

        // Update messages with the fully typed bot message
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'bot', text: botMessage }
        ]);
      }
    }, 20); // Adjust speed of typing by changing this interval (milliseconds)
  };

  const sendMessage = async (userMessage) => {
    // Add the user's message to the chat immediately
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'user', text: userMessage }
    ]);
  
    setIsTyping(true); // Show loading indicator
    setTypingMessage('Typing...'); // Clear previous typing message
  
    // Simulate a delay (5-10 seconds) before bot response
    setTimeout(async () => {
      try {
        // Call the API after the delay
        const response = await axios.post(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCs_8HUuo67VgI2ZQsDtOS6wtu5fJYefX4',
          {
            contents: [
              {
                parts: [{ text: userMessage }]
              }
            ]
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
  
        // Extract bot's response from the API response
        const botMessage =
          response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          'No response from the bot';
  
        // Trigger typing effect for bot message
        typeMessage(botMessage);
      } catch (error) {
        console.error('Error communicating with Gemini API:', error);
      }
    }, 5000); // 5-second delay before the bot starts typing
  };
  


  // Automatically scroll the chat to the bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, typingMessage]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (input.trim()) {
      sendMessage(input); // Send user input as a message
      setInput(''); // Clear input field
    }
  };

  return (
    <div className="flex flex-col w-[900px]  rounded-lg">
      {/* Chatbot header */}
      <header className="bg-gradient-to-r from-white to-white text-blue-700 p-4 shadow-md rounded">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Zap size={22} className="text-blue-700" />
          AI Mentor
        </h1>
      </header>

      {/* Chatbot body */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Chat history */}
        <div
          ref={chatContainerRef} // Reference for automatic scrolling
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} items-center`}
            >
              {msg.type === 'bot' && (
                <img
                  src={Ai} // Bot's profile picture
                  alt="Bot"
                  className="w-8 h-8 rounded-full mr-2 border-1 border-zinc-100"
                />
              )}
              <div className={`p-2 rounded-lg max-w-[500px] ${msg.type === 'user' ? 'bg-blue-700 text-white' : 'bg-gray-300 text-black'}`}>
                {msg.text}
              </div>
              {msg.type === 'user' && (
                <img
                  src={pic} // User's profile picture
                  alt="User"
                  className="w-8 h-8 rounded-full ml-2"
                />
              )}
            </div>
          ))}

          {/* Show bot typing message if bot is still typing */}
          {isTyping && (
            <div className="flex justify-start items-center">
              <img
                src={Ai} // Bot's profile picture during typing
                alt="Bot"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="bot-message p-2 rounded-lg max-w-[500px] bg-gray-300 text-black">
                {typingMessage}
              </div>
            </div>
          )}
        </div>

        {/* Chat input (fixed at the bottom) */}
        <div className="bg-gray-100 p-2  flex items-center rounded">
          <form onSubmit={handleSubmit} className="flex w-full">
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-gray-300 outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)} // Handle user input
            />
            <button
              type="submit"
              className="ml-2 p-2 bg-blue-700 text-white rounded-full hover:bg-blue-700 "
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;  