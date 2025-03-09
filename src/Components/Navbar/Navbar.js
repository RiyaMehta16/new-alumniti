import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import logo from "../Assets/alumnitiLogo.png";
import { useEffect } from "react";
import axios from "axios";
import Background from "../Background/Background";
function Navbar() {
  // Function to add active class
  const getActiveClass = ({ isActive }) =>
    isActive ? "text-indigo-800" : "text-indigo-100";
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
      <div className="flex justify-between py-3 items-center ">
        <div className="ml-12">
          <NavLink to="/">
            <img
              src={logo}
              className="h-[40px] mix-blend-multiply"
              alt="logo"
            />
          </NavLink>
        </div>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `font-medium flex gap-4 mr-12 items-center ${getActiveClass({
              isActive,
            })}`
          }
        >
          <p className="text-white/90">Welcome, {profiledata?.name}!</p>
          <img
            className="h-[45px] w-[45px] rounded-full"
            src={profiledata?.img}
            alt="profile"
          ></img>
        </NavLink>
      </div>
      <div className="h-[1px] w-full bg-indigo-100"></div>
    </>
  );
}

export default Navbar;
