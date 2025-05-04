// src/hooks/useAuth.js
import { useState, useEffect } from "react";

const useAuth = () => {
  const [myId, setMyId] = useState(null);
  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const parts = token.split(".");
        if (parts.length === 3) {
          const decoded = JSON.parse(atob(parts[1]));
          setMyId(decoded.userId);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (myId) {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/api/auth/profile-alumni`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const data = await res.json();
          setMyUser(Array.isArray(data) && data.length > 0 ? data[0] : data);
        } catch (err) {
          console.error("Error fetching my profile:", err);
        }
      }
    };

    fetchProfile();
  }, [myId]);

  return { myId, myUser };
};

export default useAuth;
