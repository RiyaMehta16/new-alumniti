// src/Components/SocketChat/ChatArea.js
import React from "react";

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
  return (
    <>
      <div className="mb-4 border-b pb-2">
        {/* Display chat partner details */}
        {(() => {
          const partner = getSenderDetails(recipientId);
          return (
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={getValidImgSrc(partner.img)}
                  alt={partner.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {onlineUsers.includes(recipientId) && (
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-500"></span>
                )}
              </div>
              <h2 className="text-xl font-bold text-indigo-50">
                {partner.name}
              </h2>
            </div>
          );
        })()}
      </div>
      <div className="flex-1 overflow-y-auto border p-4 mb-4 space-y-2">
        {messages.map((msg, index) => {
          const isMe = extractId(msg.senderId) === myId;
          const senderDetails = isMe
            ? {
                name: myUser?.name || "You",
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
              className={`w-full flex ${
                isMe ? "justify-end" : "justify-start"
              } my-2`}
            >
              <div
                className={`flex items-start gap-2 max-w-xs ${
                  isMe ? "flex-row-reverse" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={getValidImgSrc(senderDetails.img)}
                    alt={senderDetails.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {!isMe && onlineUsers.includes(extractId(msg.senderId)) && (
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-500"></span>
                  )}
                </div>
                <div>
                  <p
                    className={`font-bold text-white/50 ${
                      isMe ? "text-right" : "text-left"
                    }`}
                  >
                    {senderDetails.name}
                  </p>
                  <div
                    className={`p-2 rounded-lg ${
                      isMe ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p
                      className={`text-xs text-right mt-1 ${
                        isMe ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {formattedTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {otherTyping && (
          <div className="flex items-center gap-2">
            <span className="text-sm italic text-gray-500">
              {getSenderDetails(recipientId).name} is typing...
            </span>
          </div>
        )}
      </div>
      <div className="flex">
        <input
          type="text"
          value={content}
          placeholder="Type a message..."
          onChange={(e) => setContent(e.target.value)}
          onFocus={handleTyping}
          onBlur={handleStopTyping}
          className="input input-bordered flex-1"
        />
        <button onClick={sendMessage} className="btn ml-2">
          Send
        </button>
      </div>
    </>
  );
};

export default ChatArea;
