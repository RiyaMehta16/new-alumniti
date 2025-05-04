import React from "react";
import StartNavbar from "./StartNavbar";
import StartHero from "./StartHero";
import Question from "./Question";
import Program from "./Program";
import Categories from "./Categories";

function Start() {
  return (
    <div className="">
      <div>
        <StartHero />
      </div>
      <div className="mt-[250px]">{/* <Program/> */}</div>
    </div>
  );
}

export default Start;
