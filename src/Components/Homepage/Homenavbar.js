import React from "react";
import { NavLink } from "react-router-dom";

function Homenavbar() {
  // Function to add active class
  const getActiveClass = ({ isActive }) =>
    isActive ? "text-blue-700" : "text-black";

  return (
    <div className=" font-medium flex flex-col  pl-4 pr-4">
      <li className="flex gap-6">
        <NavLink
          exact
          to="/home"
          className={({ isActive }) =>
            `font-medium flex gap-2 items-center ${getActiveClass({
              isActive,
            })}`
          }
        >
          Jobs
        </NavLink>
        <NavLink
          to="/collabration"
          className={({ isActive }) =>
            `font-medium flex gap-2 items-center ${getActiveClass({
              isActive,
            })}`
          }
        >
          Collabration
        </NavLink>
      </li>
      <div className="bg-gray-300 w-full mt-2 border-t"></div>
    </div>
  );
}

export default Homenavbar;
