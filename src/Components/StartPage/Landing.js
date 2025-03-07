import React from "react";
import Start from "./Start";
import Categories from "./Categories";
import Question from "./Question";
import Footer from "./Footer";
import StartNavbar from "./StartNavbar";
import Background from "../Background/Background";
import { ParallaxScrollDemo } from "./parallaxEffect/ParallaxScrollDemo";
function Landing() {
  return (
    <div>
      <Background>
        <StartNavbar />

        <Start />
        {/* <Categories /> */}
        <ParallaxScrollDemo />
        <Question />
        <Footer />
      </Background>
    </div>
  );
}

export default Landing;
