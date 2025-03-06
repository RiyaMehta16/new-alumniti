import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import logo from "../Assets/logo2.jpg";
import { useEffect } from "react";
import axios from "axios";

function Navbar() {
  // Function to add active class
  const getActiveClass = ({ isActive }) =>
    isActive ? "text-blue-700" : "text-black";
  const [profiledata, setProfileData] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(apiUrl + `/api/auth/profile-alumni`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authorization
        },
      });

      setProfileData(res.data[0]); // Set the profile data based on the response
    } catch (err) {
      console.error(
        "Failed to fetch profile data:",
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <>
      <div className="flex justify-between h-[60px] items-center bg-white">
        <div className="ml-12">
          <NavLink to="/">
            <img
              src={logo}
              className="h-[150px] mix-blend-multiply"
              alt="logo"
            />
          </NavLink>
        </div>
        {/*<div>
        <li className='flex gap-[60px] text-[17px]'>
            <NavLink exact 
          to="/home"
          className={({ isActive }) => `font-medium flex gap-2 items-center ${getActiveClass({ isActive })}`}>Home</NavLink>
            <NavLink to='/Events' className={({ isActive }) => `font-medium flex gap-2 items-center ${getActiveClass({ isActive })}`}>Events</NavLink>
            <NavLink to='/connection' className={({ isActive }) => `font-medium flex gap-2 items-center ${getActiveClass({ isActive })}`}>Network</NavLink>
            <NavLink to='/aimentor' className={({ isActive }) => `font-medium flex gap-2 items-center ${getActiveClass({ isActive })}`}>AI Mentor</NavLink>
        </li>
      </div>*/}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `font-medium flex gap-4 mr-12 items-center ${getActiveClass({
              isActive,
            })}`
          }
        >
          <p>Welcome, {profiledata?.name}!</p>
          <img
            className="h-[45px] w-[45px] rounded-full"
            src={profiledata?.img}
          ></img>
        </NavLink>
      </div>
      <div className="h-[1px] w-full bg-gray-300"></div>
    </>
  );
}

export default Navbar;
