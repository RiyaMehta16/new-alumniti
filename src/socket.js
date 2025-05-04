// src/socket.js
import { io } from "socket.io-client";

// Retrieve the token from localStorage (or however you store it)
// Ensure you have the token from login before connecting.
const token = localStorage.getItem("token");

const socket = io(`${process.env.REACT_APP_API_URL}`, {
  auth: { token },
  withCredentials: true,
  transports: ["polling", "websocket"],
});

export default socket;
