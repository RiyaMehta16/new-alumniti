import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import pic from "../Assets/yogesh dp.jpg";
import { ExternalLink } from "lucide-react";
import bgpic from "../Assets/bg pic.jpg";
import "./Connection.css";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import Background from "../Background/Background";

function Connection() {
  const [users, setUsers] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(apiUrl + "/api/auth/get-all-users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);
  return (
    <>
      <Background className="-mt-40">
        <div className=" w-full">
          <Navbar />
          <div className="flex w-full">
            <div className="w-1/5">
              <Sidebar />
            </div>
            <div className="w-4/5 p-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">BFCET Alumni</h1>
                <button className=" bg-white text-indigo-950 rounded px-6 py-2 text-sm font-semibold shadow-lg hover:bg-indigo-300 hover:text-indigo-900 transition-transform transform hover:scale-105">
                  Explore more
                </button>
              </div>
              <div className="mt-4 h-[1px] w-full bg-gray-300"></div>
              <div className="mt-8 flex flex-wrap gap-12 items-center justify-center">
                {users.length === 0 ? (
                  <p>No users found.</p>
                ) : (
                  users.map((user) => (
                    <Link
                      key={user._id}
                      to={`/otheruser/${user._id}`}
                      className="user-card border-2 w-[300px] rounded-lg flex flex-col items-center h-[340px] border-gray-300 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl bg-indigo-900/80"
                    >
                      <div className="w-full h-[100px] bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-t-lg"></div>
                      <div className="flex items-center justify-center mt-[-60px]">
                        <img
                          className="h-[120px] w-[120px] rounded-full border-4 border-white"
                          src={user.img || "avatar.png"} // Optional chaining for a dynamic profile picture if available
                          alt="Profile"
                        />
                      </div>
                      <div className="font-bold mt-5 text-white text-lg">
                        {user.name}
                      </div>
                      <div className="text-sm text-indigo-300">
                        {user.currentjob}
                      </div>
                      <div className="text-sm text-indigo-300">
                        {user.college}
                      </div>
                      <div className="text-sm text-indigo-300">{user.role}</div>
                      <div className="text-sm text-indigo-300">
                        {user.location}
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </Background>
    </>
  );
}

export default Connection;
