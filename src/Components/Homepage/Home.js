import React from "react";
import Navbar from "../Navbar/Navbar";
import Homenavbar from "./Homenavbar";
import HeroJob from "./HeroJob";
import Sidebar from "../Sidebar/Sidebar";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex bg-zinc-100 w-full">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className=" pt-4 w-4/5">
          <Homenavbar />
          <HeroJob />
        </div>
      </div>
    </div>
  );
}

export default Home;
