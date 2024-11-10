import { ArrowRight, GraduationCap, MoveRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

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
    <>
      <div className="z-10 flex mt-[130px] items-center justify-center">
        <div className="group rounded-full border border-black  text-base text-white transition-all ease-in ">
          <div className="flex items-center justify-center pl-4 pr-2 py-2 transition ease-out text-black ">
            <span className="flex gap-2 text-sm">
              ✨ Introducing Alumनीति <ArrowRight size={20} />
            </span>
            <div className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
      <div className="flex justify-center text-center mt-6 flex-col items-center ">
        <h1 className=" font-semibold   text-6xl w-[1000px] text-transparent bg-clip-text   bg-gradient-to-b from-[rgb(28,28,28)] via-[rgb(28,28,28)] to-[rgb(83,83,92)]">
          Your <span className="text-blue-700">Network</span> for Success:
        </h1>
        <h1 className=" font-semibold mt-1 py-2  text-6xl w-[1000px] text-transparent bg-clip-text   bg-gradient-to-b from-[rgb(28,28,28)] via-[rgb(28,28,28)] to-[rgb(83,83,92)]">
          Alumni and Mentors Guiding the
        </h1>
        <h1 className=" font-semibold mt-1  text-6xl w-[1000px] text-transparent bg-clip-text   bg-gradient-to-b from-[rgb(28,28,28)] via-[rgb(28,28,28)] to-[rgb(83,83,92)]">
          Next Generation
        </h1>
      </div>
      <div className="flex justify-center mt-3 font-medium text-gray-500 items-center">
        <p className="font-sans w-[1000px] text-center text-[17px]">
          Welcome to <span className="text-black font-medium">Alumniti</span>{" "}
          Where Experience Fuels Growth! Seamlessly connect with accomplished
          alumni and expert mentors to unlock your potential. Explore tailored
          guidance across various fields and leverage our 'Perfect Match'
          feature to find mentors aligned with your goals. Begin your journey to
          success today!
        </p>
      </div>
      {token ? (
        <div className="flex justify-center mt-6 space-x-4">
        <button
            className=" flex gap-4 justify-center items-center bg-gradient-to-b from-[rgb(28,28,28)] via-[rgb(28,28,28)] to-[rgb(83,83,92)] border-[rgb(28,28,28)] border pt-2 pb-2 h-[50px] pl-8 pr-8 rounded text-white hover:shadow-lg"
            onClick={handleDashboardRedirect}
          >
            Build Network <ArrowRight size={20}/>
          </button>
          </div>
      ) : (
        <div className="flex justify-center mt-6 space-x-4">
          <button className="bg-gradient-to-b from-[rgb(28,28,28)] via-[rgb(28,28,28)] to-[rgb(83,83,92)] border-[rgb(28,28,28)] border hover:bg-gradient-to-b hover:from-white hover:via-white hover:to-white  hover:text-black text-white py-2 px-6 rounded  ">
            Register as Alumni
          </button>
          <button className="border border-[rgb(28,28,28)] hover:bg-gradient-to-b hover:from-[rgb(28,28,28)] hover:via-[rgb(28,28,28)] hover:to-[rgb(83,83,92)] text-[rgb(28,28,28)] py-2 px-6 rounded  transition hover:text-white">
            Register as Student
          </button>
        </div>
      )}
    </>
  );
}

export default StartHero;
