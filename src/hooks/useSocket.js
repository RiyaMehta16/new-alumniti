// src/hooks/useSocket.js
import { useState, useEffect } from "react";
import socket from "../socket";

const useSocket = (recipientId) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [otherTyping, setOtherTyping] = useState(false);

  useEffect(() => {
    const handleUpdateOnlineUsers = (onlineList) => {
      setOnlineUsers(onlineList);
    };

    const handleTyping = ({ senderId }) => {
      if (recipientId && senderId === recipientId) {
        setOtherTyping(true);
      }
    };

    const handleStopTyping = ({ senderId }) => {
      if (recipientId && senderId === recipientId) {
        setOtherTyping(false);
      }
    };

    socket.on("updateOnlineUsers", handleUpdateOnlineUsers);
    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);

    return () => {
      socket.off("updateOnlineUsers", handleUpdateOnlineUsers);
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, [recipientId]);

  const sendMessage = (recipientId, content, setContent) => {
    if (content.trim() && recipientId) {
      socket.emit("sendMessage", {
        recipientId,
        content,
      });
      setContent("");
    }
  };

  const handleTyping = (recipientId) => {
    if (recipientId) socket.emit("typing", { recipientId });
  };

  const handleStopTyping = (recipientId) => {
    if (recipientId) socket.emit("stopTyping", { recipientId });
  };

  return {
    onlineUsers,
    otherTyping,
    sendMessage,
    handleTyping,
    handleStopTyping,
  };
};

export default useSocket;
