// src/Components/SocketChat/UserListSidebar.js
import React from "react";

const UserListSidebar = ({
  users,
  onlineUsers,
  myId,
  navigate,
  getValidImgSrc,
  getLatestConversationMessage,
  extractId,
}) => {
  return (
    <div className="w-1/4 border-r p-4">
      <h2 className="text-xl font-bold mb-4 text-indigo-50">Users</h2>
      {users.length > 0 ? (
        users.map((user) => {
          const latestMsg = getLatestConversationMessage(user._id);
          const preview = latestMsg
            ? extractId(latestMsg.senderId) === myId
              ? `You: ${latestMsg.content}`
              : latestMsg.content
            : "No messages yet";
          return (
            <button
              key={user._id}
              className="btn btn-outline w-full mb-2 flex items-center gap-2"
              onClick={() => navigate(`/chat/${user._id}`)}
            >
              <div className="relative">
                <img
                  src={getValidImgSrc(user.img)}
                  alt={user.name || "Default avatar"}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-500"></span>
                )}
              </div>
              <div className="flex-1 ">
                <span className="text-indigo-100">{user.name}</span>
                <p className="text-xs text-gray-500">{preview}</p>
              </div>
            </button>
          );
        })
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserListSidebar;
