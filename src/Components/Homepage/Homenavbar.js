import React from "react";
import { NavLink } from "react-router-dom";

function Homenavbar() {
  // Function to add active class
  const getActiveClass = ({ isActive }) =>
    isActive ? "text-blue-400 font-bold" : "text-white/70 font-medium";

  return (
    <div className="font-medium flex flex-col pl-4 pr-4">
      <div className="flex justify-center gap-6 text-white/70 font-medium">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex gap-2 items-center hover:cursor-pointer ${getActiveClass({
              isActive,
            })}`
          }
        >
          Jobs
        </NavLink>
        <NavLink
          to="/collabration"
          className={({ isActive }) =>
            `flex gap-2 items-center hover:cursor-pointer ${getActiveClass({
              isActive,
            })}`
          }
        >
          Collaboration
        </NavLink>
      </div>
      <div className="bg-gray-300 w-full mt-2 border-t"></div>
    </div>
  );
}

export default Homenavbar;
