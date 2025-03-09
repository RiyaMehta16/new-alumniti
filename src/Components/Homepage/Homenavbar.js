import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
function Homenavbar() {
  // Function to add active class
  const navigate = useNavigate();
  const getActiveClass = ({ isActive }) =>
    isActive ? "text-white font-bold" : "text-indigo-100";

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
          // onClick={() => navigate("/collabration")}
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
