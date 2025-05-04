import { ArrowRight, GraduationCap, MoveRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import ThreeScene from "./threejs/threeCanvas";
function StartHero() {
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
  return (
    <div className="-translate-y-12 pt-40 flex">
      {/* hero text */}
      <div className="pl-44 -m-10 -mr-60">
        <div className="z-10 flex mt-[130px] items-center justify-center "></div>
        <div className="flex justify-center text-center mt-6 flex-col items-center ">
          <p className=" font-semibold   text-6xl w-[800px] text-transparent bg-clip-text   bg-gradient-to-b from-[#cdccd3] via-[#b6afd5] to-[#cdccd3]">
            {/* Connect. Learn. Succeed. Alumni & Mentors Guiding Your Future */}
            <p> Stronger Networks, </p>
            <span className="text-indigo-500">Brighter Futures </span>
          </p>
          <h1 className=" font-semibold mt-1 py-2  text-6xl w-[800px] text-transparent bg-clip-text   bg-gradient-to-b from-[#cdccd3] via-[#b6afd5] to-[#cdccd3]">
            Connect with Alumni
          </h1>
          <h1 className=" font-semibold mt-1  text-6xl w-[800px] text-transparent bg-clip-text   bg-gradient-to-b from-[#cdccd3] via-[#b6afd5] to-[#cdccd3]">
            & Mentors{" "}
          </h1>
          <div className="flex justify-center mt-3 font-medium text-indigo-300/50 items-center">
            <p className="font-sans w-[800px] text-center text-[17px]">
              Welcome to{" "}
              <span className="text-white font-medium">Alumniti</span> Where
              Experience Fuels Growth! Seamlessly connect with accomplished
              alumni and expert mentors to unlock your potential. Explore
              tailored guidance across various fields and leverage our 'Perfect
              Match' feature to find mentors aligned with your goals. Begin your
              journey to success today!
            </p>
          </div>
        </div>
        {token ? (
          <div className="flex justify-center mt-6 space-x-4">
            <button
              className=" flex gap-4 justify-center items-center bg-gradient-to-b from-[#cdccd3] via-[#cdccd3] to-[#b6afd5] border-[#cdccd3] border pt-2 pb-2 h-[50px] pl-8 pr-8 rounded text-indigo-900 hover:shadow-lg"
              onClick={handleDashboardRedirect}
            >
              Build Network <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div className="flex justify-center mt-6 space-x-4">
            <button className="bg-gradient-to-b from-[#cdccd3] via-[#cdccd3] to-[#b6afd5] border-[#cdccd3] border hover:bg-gradient-to-b hover:from-white hover:via-white hover:to-[#b6afd5]  text-indigo-900  py-2 px-6 rounded  ">
              Register as Alumni
            </button>
            <button className="border border-[#cdccd3] hover:bg-gradient-to-b hover:from-[#cdccd3] hover:via-[#cdccd3]  hover:to-[#b6afd5] text-[#cdccd3] py-2 px-6 rounded  transition hover:text-indigo-900">
              Register as Student
            </button>
          </div>
        )}
      </div>
      {/* threejs component */}
      <div>
        <ThreeScene />
      </div>
    </div>
  );
}

export default StartHero;
