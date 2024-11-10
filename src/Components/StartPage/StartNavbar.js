import React from "react";
import { Activity, Gem, Lightbulb, PenLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo alumni.png";

function StartNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null; // Decode JWT to get user info
  const isAdmin = user?.role === "admin";
  const isStudent = user?.role === "student";
  const isAlumni = user?.role === "alumni";

  const handleDashboardRedirect = () => {
    if (isAdmin) {
      navigate("/admin");
    } else if (isStudent) {
      navigate("/home");
    } else if (isAlumni) {
      navigate("/home");
    }
  };

  console.log(token);

  return (
    <div className="sticky top-0">
      <div className="flex justify-between bg-white h-[60px] items-center pl-10 pr-10 w-full">
        <img src={logo} className="h-[150px] ml-4"></img>

        <div className="mr-10 flex gap-8 justify-center items-center w-1/4">
          <div>
            <li className="list-none flex gap-8 font-medium text-base">
              <a className="hover:text-blue-700 text-[15px] hover:cursor-pointer hover:underline flex gap-2">
                {" "}
                Events
              </a>
              <a className="hover:text-blue-700 text-[15px] hover:cursor-pointer flex gap-2 hover:underline">
                Jobs
              </a>
              <a className="hover:text-blue-700 text-[15px] hover:cursor-pointer flex gap-2 hover:underline">
                {" "}
                Categories
              </a>
            </li>
          </div>
          {token?(<button
            className=" bg-blue-700 pt-1 pb-1 h-[40px] pl-6 pr-6 rounded text-white"
            onClick={handleDashboardRedirect}
          >
            Dashboard
          </button>):(
            <a
            className=" bg-blue-700 pt-1 pb-1 flex justify-center items-center h-[40px] pl-6 pr-6 rounded text-white"
            href="/login"
          >
            Login
          </a>
          )}
          
        </div>
      </div>
      <div>
        <div className="bg-zinc-200 h-[1px] w-full"></div>
      </div>
    </div>
  );
}

export default StartNavbar;
