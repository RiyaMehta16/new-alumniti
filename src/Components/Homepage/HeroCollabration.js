import React from "react";
import Navbar from "../Navbar/Navbar";
import Homenavbar from "./Homenavbar";
import { Linkedin } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Workflow } from "lucide-react";
import pic from "../Assets/yogesh dp.jpg";
import yadav from "../Assets/yadavmana.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Background from "../Background/Background";

function HeroCollabration() {
  const navigate = useNavigate();
  const [collab, setCollab] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(apiUrl + "/api/auth/getcollabs", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authorization
          },
        });
        setCollab(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJob();
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <Background className="">
        <Navbar />
        <div className="flex w-full">
          <div className="w-1/5">
            <Sidebar />
          </div>
          <div className="w-4/5">
            <div className=" pt-4">
              <Homenavbar />
            </div>

            <div className="  min-h-screen pt-4 pb-20 flex  flex-col items-center">
              <div className="flex justify-between items-center w-full">
                <div className="font-medium text-indigo-100 text-xl ml-[30px]">
                  Recommended Collabrations
                </div>
                <div className="flex mr-[30px] gap-4">
                  <button
                    onClick={() => navigate("/createcollab")}
                    className="bg-white text-indigo-950 rounded px-6 py-2 text-sm font-semibold shadow-lg hover:bg-indigo-300 hover:text-indigo-900 transition-transform transform hover:scale-105"
                  >
                    Create Collabrations
                  </button>
                  <div className="border-[1px] border-gray-400 hover:cursor-pointer rounded text-sm justify-center font-medium items-center text-gray-400 flex gap-2 p-1 pb-1 pl-2 pr-2">
                    Most recent <Workflow />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap  mt-8 gap-6 justify-center items-center">
                {collab.map((collab, index) => (
                  <div className=" shadow-lg w-[400px] min-h-[480px] rounded-md p-6 text-indigo-200 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={collab.postedBy.img}
                        className="h-16 w-16 rounded-full border-4 border-white shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out"
                        alt="Profile"
                      />
                      <div>
                        <h2 className="text-xl font-semibold">
                          {collab.postedBy.name}({collab.postedBy.role})
                        </h2>
                        <span className="text-sm text-white/50">21m ago</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold ">
                        {collab.collabTitle}
                      </h3>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-indigo-300">
                        Roles Needed:
                      </h4>
                      <ul className="ml-4 list-disc list-inside text-white/50">
                        <li>{collab.RoleNeed}</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-indigo-300">
                        Skills Required:
                      </h4>
                      <p className="text-white/50 ml-4">{collab.skills}</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-indigo-300">
                        Timeline:
                      </h4>
                      <p className="ml-4 text-white/50">
                        Start Date: {formatDate(collab.startDate)}
                      </p>
                      <p className="ml-4 text-white/50">
                        End Date: {formatDate(collab.startDate)}
                      </p>
                    </div>
                    <div className="mt-6">
                      <button className="bg-white text-indigo-950 w-full py-2 rounded font-semibold  duration-200 shadow-lg hover:bg-indigo-300 hover:text-indigo-900 transition-transform transform hover:scale-105">
                        Apply now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Background>
    </div>
  );
}

export default HeroCollabration;
