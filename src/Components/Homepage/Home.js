import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Homenavbar from "./Homenavbar";
import HeroJob from "./HeroJob";
import Sidebar from "../Sidebar/Sidebar";
import { Loader } from "lucide-react"; // Import your loader component
import Background from "../Background/Background";
function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set timeout to hide loader after 10 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  return (
    <div>
      <Background className="min-h-screen ">
        {loading ? (
          // Show Loader while loading
          <div className="flex items-center justify-center h-screen text-white">
            <Loader className="animate-spin duration-[2000ms] mr-2" /> Please
            Wait Your Dashboard is Rendering
          </div>
        ) : (
          // Show Home component after loading is complete
          <>
            <Navbar />
            <div className="flex w-full">
              <div className="w-1/5">
                <Sidebar />
              </div>
              <div className="pt-4 w-4/5">
                <Homenavbar />
                <HeroJob />
              </div>
            </div>
          </>
        )}
      </Background>
    </div>
  );
}

export default Home;
