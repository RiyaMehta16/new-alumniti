import { Github, Linkedin, Mail } from "lucide-react";
import React from "react";
import logo from "../Assets/alumnitiLogo.png";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <div className="h-[70px] mt-[40px]">
      <div className=" h-[1px] w-full"></div>
      <div className="">
        <div className="flex flex-col justify-center items-center mt-[100px]">
          <p className="">
            <img src={logo} alt="logo" className="h-8" />
          </p>
          <div className="flex mt-3 gap-6">
            <div>
              <Github
                size={30}
                className="text-indigo-200 hover:cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>
            <div>
              <Linkedin
                size={30}
                className="text-indigo-200 hover:cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>
            <div>
              <Mail
                size={30}
                className="text-indigo-200 hover:cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
