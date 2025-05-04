// src/Components/SocketChat/Chat.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Background from "../Background/Background";
import UserListSidebar from "./UserListSidebar";
import ChatArea from "./ChatArea";
import useAuth from "../../hooks/useAuth";
import useFetchUsers from "../../hooks/useFetchUsers";
import useSocket from "../../hooks/useSocket";
import useChatMessages from "../../hooks/useChatMessages";
import { extractId, getValidImgSrc } from "../utils/utils";

const Chat = () => {
  const { recipientId } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState("");

  const { myId, myUser } = useAuth();
  const { users, setUsers } = useFetchUsers();
  const {
    onlineUsers,
    otherTyping,
    sendMessage: sendSocketMessage,
    handleTyping: sendTyping,
    handleStopTyping: sendStopTyping,
  } = useSocket(recipientId);
  const { messages, allMessages } = useChatMessages(recipientId, myId);

  /**
   * Helper function to retrieve the details (name and image) of a sender based on their ID.
   * @param {string} senderId - The ID of the sender.
   * @returns {object} An object containing the sender's name and image, or default values.
   */
  const getSenderDetails = (senderId) => {
    const user = users.find(
      (u) => u._id === senderId || u._id === extractId(senderId)
    );
    return (
      user || {
        name: "Unknown",
        img: "https://static.vecteezy.com/system/resources/thumbnails/021/548/095/small/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
      }
    );
  };

  /**
   * Helper function to get the latest message in the conversation between the current user and another user.
   * @param {string} userId - The ID of the other user.
   * @returns {object|null} The latest message object or null if no messages are found.
   */
  const getLatestConversationMessage = (userId) => {
    if (!myId) return null;
    const conversation = allMessages.filter((msg) => {
      const senderId = extractId(msg.senderId);
      const recipientIdFromMsg = extractId(msg.recipientId);
      return (
        (senderId === userId && recipientIdFromMsg === myId) ||
        (senderId === myId && recipientIdFromMsg === userId)
      );
    });
    if (conversation.length === 0) return null;
    conversation.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return conversation[0];
  };

  /**
   * Sorts the list of users based on the timestamp of the latest message.
   */
  const sortedUsers = [...users].sort((a, b) => {
    const msgA = getLatestConversationMessage(a._id);
    const msgB = getLatestConversationMessage(b._id);
    const timeA = msgA ? new Date(msgA.timestamp).getTime() : 0;
    const timeB = msgB ? new Date(msgB.timestamp).getTime() : 0;
    return timeB - timeA;
  });

  const handleSendMessage = () => {
    sendSocketMessage(recipientId, content, setContent);
  };

  const handleStartTyping = () => {
    sendTyping(recipientId);
  };

  const handleStopTyping = () => {
    sendStopTyping(recipientId);
  };

  return (
    <div>
      <Background className="">
        <Navbar />
        <div className="flex h-screen">
          <UserListSidebar
            users={sortedUsers}
            onlineUsers={onlineUsers}
            myId={myId}
            navigate={navigate}
            getValidImgSrc={getValidImgSrc}
            getLatestConversationMessage={getLatestConversationMessage}
            extractId={extractId}
          />

          <div className="w-3/4 p-4 flex flex-col">
            {recipientId ? (
              <ChatArea
                recipientId={recipientId}
                messages={messages}
                content={content}
                setContent={setContent}
                sendMessage={handleSendMessage}
                handleTyping={handleStartTyping}
                handleStopTyping={handleStopTyping}
                otherTyping={otherTyping}
                myId={myId}
                myUser={myUser}
                users={users}
                onlineUsers={onlineUsers}
                getSenderDetails={getSenderDetails}
                getValidImgSrc={getValidImgSrc}
                extractId={extractId}
              />
            ) : (
              <div className="flex items-center justify-center text-indigo-100 h-full">
                <p>Select a user to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </Background>
    </div>
  );
};

export default Chat;
