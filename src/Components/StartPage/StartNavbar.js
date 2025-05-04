import React from "react";
import { useState, useEffect } from "react";

import { Activity, Gem, Lightbulb, PenLine } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../Assets/alumnitiLogo.png";
import { NavLink } from "react-router-dom";

function StartNavbar() {
  const navigate = useNavigate();
  const pathname = useLocation();
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null; // Decode JWT to get user info
  const [scrollingUp, setScrollingUp] = useState(true); // Initially true to show navbar on load
  const [lastScrollY, setLastScrollY] = useState(0); // To track scroll position

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
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setScrollingUp(false);
      } else {
        // Scrolling up
        setScrollingUp(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  console.log(token);

  return (
    <div
      className={`fixed ${
        scrollingUp ? "top-3" : "-top-[200px]"
      } left-[32px]  w-full px-4  h-20 justify-center z-50 text-center pl-4 pr-4 transition-all duration-300 ease-in-out`}
    >
      <div className=" flex  items-center justify-between px-10 py-3">
        <NavLink to="/">
          <img
            src={logo}
            alt="alumniti"
            width={150}
            height={50}
            className=" mr-2"
          />
        </NavLink>

        {!user ? (
          <div className="backdrop-blur-2xl border border-n-2 flex text-center bg-black/30 translate-y-1 -translate-x-16 rounded-md ">
            <a
              href="/register"
              onClick={() => navigate("/register")}
              className="mr-5  text-white translate-y-0 px-3 py-2  translate-x-4 font-code font-medium   hover:cursor-pointer transition-colors hover:font-extrabold lg:block"
            >
              Register
            </a>
            <button
              className=" font-semibold border-l-2 border-l-n-2 hover:font-extrabold  bg-gradient-to-b from-[#cdccd3] via-[#cdccd3] to-[#b6afd5] border-[#cdccd3] border hover:bg-gradient-to-b hover:from-white hover:via-white hover:to-[#b6afd5]  text-indigo-900  py-2 px-6 rounded"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </div>
        ) : (
          <a
            href="/home"
            onClick={() => {
              navigate("/home");
            }}
            className="hidden mr-8 text-white transition-colors hover:cursor-pointer hover:font-extrabold lg:block"
          >
            Dashboard
          </a>
        )}
      </div>
    </div>
  );
}

export default StartNavbar;
