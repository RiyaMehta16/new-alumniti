import React from "react";
import { NavLink, useLocation, matchPath } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const getActiveClass = ({ isActive, paths }) =>
    isActive || paths.some((path) => matchPath(path, location.pathname))
      ? "text-blue-700 bg-indigo-100 transition-colors duration-300 ml-[50px] bg-black pt-3 pb-3  pl-5 rounded pr-[60px] "
      : "text-indigo-100 ml-[70px] transition-colors duration-300";

  return (
    <div className=" h-screen sticky top-0 flex flex-col gap-8 pt-8 min-w-[450px] ">
      <div className="mt-20">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            getActiveClass({ isActive, paths: ["/home", "/collabration"] })
          }
        >
          Home
        </NavLink>
      </div>
      <div className="h-[1px] ml-[50px] bg-indigo-100/20 w-[200px]"></div>
      <div className="">
        <NavLink
          to="/Events"
          className={({ isActive }) =>
            getActiveClass({ isActive, paths: ["/Events"] })
          }
        >
          Events
        </NavLink>
      </div>
      <div className="h-[1px] ml-[50px] bg-indigo-100/20 w-[200px]"></div>
      <div className="">
        <NavLink
          to="/connection"
          className={({ isActive }) =>
            getActiveClass({ isActive, paths: ["/connection"] })
          }
        >
          Network
        </NavLink>
      </div>
      <div className="h-[1px] ml-[50px] bg-indigo-100/20 w-[200px]"></div>

      <div className="">
        <NavLink
          to="/aimentor"
          className={({ isActive }) =>
            getActiveClass({ isActive, paths: ["/aimentor"] })
          }
        >
          AI Mentor
        </NavLink>
      </div>
      <div className="h-[1px] ml-[50px] bg-indigo-100/20 w-[200px]"></div>

      <div className=" rounded-md">
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            getActiveClass({ isActive, paths: ["/chat"] })
          }
        >
          Messages
        </NavLink>
      </div>
      <div className="h-[1px] ml-[50px] bg-indigo-100/20 w-[200px]"></div>

      <div className=" rounded-md">
        <NavLink
          onClick={() => {
            localStorage.removeItem("token"); // Remove token
            // Redirect to login page
          }}
          to="/login"
          className={({ isActive }) =>
            getActiveClass({ isActive, paths: ["/login"] })
          }
        >
          Log Out
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
