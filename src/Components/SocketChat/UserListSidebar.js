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
    <div className="min-h-screen border-r mt-5 rounded-md ml-2 border-gray-800 p-4 bg-gray-900 rounded-l-md shadow-md flex flex-col">
      <div className="flex gap-8 rounded-md  bg-black/40 py-2 px-3">
        <button
          className=" text-xl font-semibold  text-indigo-300"
          onClick={() => navigate("/home")}
        >
          &larr;
        </button>
        <span className="text-xl font-semibold text-indigo-300">Users</span>
      </div>
      <div className="flex-1 space-y-5 overflow-y-auto ">
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
                className={`btn btn-ghost p-2 w-full rounded-md  flex items-center space-x-2 hover:bg-gray-950 hover:p-2 focus:ring-inset focus:ring-2  focus:ring-indigo-500 `}
                onClick={() => navigate(`/chat/${user._id}`)}
              >
                <div className="relative ">
                  <img
                    src={getValidImgSrc(user.img)}
                    alt={user.name || "Default avatar"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-gray-900 bg-green-500 border-2 border-green-500"></span>
                  )}
                </div>
                <div className="flex-1  overflow-hidden ">
                  <span className="block ml-3 text-start text-indigo-100 font-medium truncate">
                    {user.name}
                  </span>
                  <p className="text-xs text-gray-500 ml-3 text-start truncate">
                    {preview}
                  </p>
                </div>
              </button>
            );
          })
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UserListSidebar;
