// src/hooks/useChatMessages.js
import { useState, useEffect } from "react";
import socket from "../socket";

const useChatMessages = (recipientId, myId) => {
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    const handlePreviousMessages = (msgs) => {
      setMessages(msgs);
    };

    const handleReceiveMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setAllMessages((prev) => [...prev, message]);
    };

    socket.on("previousMessages", handlePreviousMessages);
    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("previousMessages", handlePreviousMessages);
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [recipientId]);

  useEffect(() => {
    const fetchAllMessages = async () => {
      if (myId) {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/api/auth/messages/${myId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const data = await res.json();
          setAllMessages(data);
        } catch (err) {
          console.error("Error fetching all messages:", err);
        }
      }
    };

    fetchAllMessages();
  }, [myId]);

  useEffect(() => {
    if (recipientId) {
      socket.emit("fetchMessages", { recipientId });
    }
  }, [recipientId]);

  return { messages, setMessages, allMessages };
};

export default useChatMessages;
