import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Background from "../Background/Background";
function CreateCollaboration() {
  const [collabTitle, setCollabTitle] = useState("");
  const [RoleNeed, setRoleNeed] = useState("");
  const [skills, setSkills] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        apiUrl + "/api/auth/createcollab",
        { collabTitle, RoleNeed, skills, startDate, endDate },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authentication
          },
        }
      );
      if (res.data) {
        alert("collabration create successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Background>
      <div className="">
        <Navbar />

        <div className="text-white pt-4 pb-20 flex flex-col items-center">
          <div className="w-full max-w-2xl px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">
              Create Collaboration
            </h1>
            <div className="shadow-lg rounded-2xl p-8 border border-indigo-300/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="projectName"
                    className="block text-sm font-medium "
                  >
                    Project Name
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    onChange={(e) => setCollabTitle(e.target.value)}
                    className="mt-1 bg-white/10 block outline-none p-1 w-full border border-indigo-300/30 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="rolesNeeded"
                    className="block text-sm font-medium "
                  >
                    Roles Needed
                  </label>
                  <textarea
                    id="rolesNeeded"
                    onChange={(e) => setRoleNeed(e.target.value)}
                    rows="4"
                    className="mt-1 bg-white/10 block p-1 outline-none w-full border border-indigo-300/30 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="skillsRequired"
                    className="block text-sm font-medium "
                  >
                    Skills Required
                  </label>
                  <textarea
                    id="skillsRequired"
                    onChange={(e) => setSkills(e.target.value)}
                    rows="4"
                    className="mt-1 bg-white/10 block w-full outline-none p-1 border border-indigo-300/30 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 text-white">
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium "
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="mt-1 bg-white/10 block w-full p-1 border border-indigo-300/30 rounded-md  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder:text-white"
                      required
                    />
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="endDate"
                      className="block text-sm font-medium "
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="mt-1 bg-white/10 block w-full border p-1 border-indigo-300/30 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className=" font-semibold border-l-2 border-l-n-2 hover:font-extrabold  bg-gradient-to-b from-[#cdccd3] via-[#cdccd3] to-[#b6afd5] border-[#cdccd3] border hover:bg-gradient-to-b hover:from-white hover:via-white hover:to-[#b6afd5]  text-indigo-900  py-2 px-6 rounded"
                  >
                    Create Collaboration
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
}

export default CreateCollaboration;
