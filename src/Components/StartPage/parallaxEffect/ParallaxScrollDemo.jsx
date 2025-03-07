"use client";
import { ParallaxScroll } from "./ParallaxScroll";

export function ParallaxScrollDemo() {
  return (
    <div>
      <h1 className="font-extrabold text-[48px] text-white pl-10 translate-y-28 translate-x-15 bg-gradient-to-r from-n-1 to-n-3 bg-clip-text text-transparent leading-normal -mt-52">
        Features
      </h1>
      <ParallaxScroll />
    </div>
  );
}
