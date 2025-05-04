// src/Components/SocketChat/ChatArea.js
import React, { useRef, useEffect } from "react";

const ChatArea = ({
  recipientId,
  messages,
  content,
  setContent,
  sendMessage,
  handleTyping,
  handleStopTyping,
  otherTyping,
  myId,
  myUser,
  users,
  onlineUsers,
  getSenderDetails,
  getValidImgSrc,
  extractId,
}) => {
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to the latest message whenever the messages array updates
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Scroll to the latest message when the component mounts (when a chat is opened)
  useEffect(() => {
    scrollToBottom();
  }, []); // Empty dependency array ensures it runs only once after initial render

  return (
    <div className="max-h-screen rounded-lg shadow-md bg-gray-900 flex flex-col overflow-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 border-b border-gray-800 pb-3 pt-3 px-4 flex items-center space-x-3 bg-gray-900">
        {/* Display chat partner details */}
        {(() => {
          const partner = getSenderDetails(recipientId);
          return (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={getValidImgSrc(partner.img)}
                  alt={partner.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {onlineUsers.includes(recipientId) && (
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-gray-900 bg-green-500 border-2 border-green-500"></span>
                )}
              </div>
              <h2 className="text-xl font-semibold text-indigo-300">
                {partner.name}
              </h2>
            </div>
          );
        })()}
      </div>

      {/* Scrollable Message Area */}
      <div
        ref={chatContainerRef}
        className="flex-1 min-h-dvh overflow-y-auto p-4 space-y-3"
        style={{ scrollBehavior: "smooth" }}
      >
        {messages.map((msg, index) => {
          const isMe = extractId(msg.senderId) === myId;
          const senderDetails = isMe
            ? {
                name: "You",
                img: myUser?.img || "/avatar.png",
              }
            : getSenderDetails(msg.senderId);

          // Format the timestamp
          const formattedTime = new Date(msg.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={index}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start space-x-2 max-w-xs ${
                  isMe ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={getValidImgSrc(senderDetails.img)}
                    alt={senderDetails.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {!isMe && onlineUsers.includes(extractId(msg.senderId)) && (
                    <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-1 ring-gray-900 bg-green-500 border-2 border-green-500"></span>
                  )}
                </div>
                <div>
                  <p
                    className={`text-xs text-gray-400 ${
                      isMe ? "text-right" : "text-left"
                    }`}
                  >
                    {senderDetails.name}
                  </p>
                  <div
                    className={`p-2  rounded-lg ${
                      isMe
                        ? "bg-blue-600 mb-10 text-white"
                        : "bg-gray-800 text-gray-300"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs text-right mt-1 text-gray-500`}>
                      {formattedTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="" ref={messagesEndRef} />{" "}
        {/* Empty div at the end of messages for scrolling */}
        {/* Typing indicator */}
        {otherTyping && (
          <div className="relative  flex items-center space-x-2">
            <img
              src={getValidImgSrc(getSenderDetails(recipientId).img)}
              alt="Typing user avatar"
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className=" text-sm italic text-gray-500">
              {getSenderDetails(recipientId).name} is typing...
            </span>
          </div>
        )}
      </div>
      {/* Sticky Bottom Input Area */}
      <div className="fixed  bottom-0 left-1/4 ml-4 min-w-[1072px] rounded-lg z-10 border-t border-gray-800 bg-gray-900 p-4 ">
        <div className=" ml-10 flex  space-x-2">
          <input
            type="text"
            value={content}
            placeholder="Type a message..."
            onChange={(e) => setContent(e.target.value)}
            onFocus={handleTyping}
            onBlur={handleStopTyping}
            className="input input-bordered rounded-lg flex-1 bg-gray-800 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-sm placeholder:p-2"
          />
          <button
            onClick={sendMessage}
            className="btn rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 p-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
