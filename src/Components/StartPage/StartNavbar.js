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

  const navigation = [
    { id: 1, title: "Home", url: "/" },
    { id: 2, title: "Services", url: "/" },
    { id: 3, title: "Pricing", url: "/" },
    { id: 5, title: "Contact Us", url: "/" },
  ];

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

        <nav className=" flex space-x-10  justify-center lg:flex-row cursor-pointer backdrop-blur-2xl  px-5 py-4  border border-[n-3] rounded-full -translate-x-6">
          {navigation.map((item) => (
            <a
              href={item.url}
              key={item.id}
              onClick={() => navigate(item.url)}
              className={`text-white  text-sm transition-colors hover:font-extrabold uppercase  ${
                item.url === pathname.pathname ? "text-bold" : ""
              }`}
            >
              {item.title}
            </a>
          ))}
        </nav>

        {!user ? (
          <div className="backdrop-blur-2xl border border-n-2 flex text-center  bg-[#101743]/20 translate-y-1 -translate-x-16 rounded-full ">
            <a
              href="/register"
              onClick={() => navigate("/register")}
              className="mr-5  text-white translate-y-0 px-4 py-3  translate-x-4 font-code font-medium   hover:cursor-pointer transition-colors hover:font-extrabold lg:block"
            >
              Register
            </a>
            <button
              className="hidden lg:flex bg-gradient-to-r px-4 py-3 from-[#403242] via-[#101743]/60 to-[#403242] font-semibold rounded-full border border-l-2 border-l-n-2 hover:font-extrabold  text-white"
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
