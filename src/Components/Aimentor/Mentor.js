import React from "react";
import Navbar from "../Navbar/Navbar";
import Chatbot from "./Chatbot";
import Sidebar from "../Sidebar/Sidebar";
import Background from "../Background/Background";

function Mentor() {
  return (
    <div className="">
      <Background className="">
        <div>
          <Navbar />
        </div>

        <div className="flex w-full">
          <div className="w-1/5">
            <Sidebar />
          </div>
          <div className="justify-center w-4/5 items-center flex bg-zinc-100 ">
            <Chatbot />
          </div>
        </div>
      </Background>
    </div>
  );
}

export default Mentor;
