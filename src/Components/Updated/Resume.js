import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import {
  EllipsisVertical,
  Github,
  GraduationCap,
  Linkedin,
  MapPin,
  Pencil,
  School,
  SquarePen,
} from "lucide-react";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import Background from "../Background/Background";

const Resume = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null; // Decode JWT to get user info
  const isAdmin = user?.role === "admin";
  const isStudent = user?.role === "student";
  const isAlumni = user?.role === "alumni";
  const [profileData, setProfileData] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const token = localStorage.getItem("token");

    try {
      const endpoint = isAdmin
        ? "/api/auth/profile"
        : "/api/auth/profile-alumni"; // Use profile-alumni if applicable
      const res = await axios.get(apiUrl + `${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authorization
        },
      });

      setProfileData(res.data[0]);
      console.log(res.data[0]);
      // Set the profile data based on the response
    } catch (err) {
      console.error(
        "Failed to fetch profile data:",
        err.response ? err.response.data : err.message
      );
    }
  };
  return (
    <div className="max-w-3xl mt-[50px] mx-auto min-h-[750px] mb-[100px] bg-white border border-gray-300 p-6 rounded-md shadow-md">
      {/* Header Section */}
      <div className="text-center border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {profileData?.name || "Your Name"}
        </h1>
        <p className="text-gray-700">
          {profileData?.role || "Your Role / Job Title"}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          {profileData?.location || "City, Country"}
        </p>
        <p className="text-sm text-gray-600">
          {profileData?.email || "you@example.com"} |{" "}
          {profileData?.phone || "(123) 456-7890"}
        </p>
        {profileData?.linkedin && (
          <p className="text-sm text-blue-600">
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </p>
        )}
      </div>

      {/* Summary / About */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-1">
          Summary
        </h2>
        <p className="text-sm text-gray-700 mt-2">
          {profileData?.about || "A brief professional summary about yourself."}
        </p>
      </div>

      {/* Skills Section */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-1">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2 mt-2 text-sm">
          {profileData?.skills?.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 border border-gray-400 rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-1">
          Work Experience
        </h2>
        {profileData?.jobs?.map((job, index) => (
          <div key={index} className="mt-3">
            <p className="font-semibold text-gray-800">{job.title}</p>
            <p className="text-sm text-gray-600">
              {job.company} | {new Date(job.startDate).toLocaleDateString()} -{" "}
              {job.endDate
                ? new Date(job.endDate).toLocaleDateString()
                : "Present"}
            </p>
            <p className="text-sm text-gray-700 mt-1">{job.description}</p>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-1">
          Education
        </h2>
        {profileData?.education?.map((edu, index) => (
          <div key={index} className="mt-3">
            <p className="font-semibold text-gray-800">{edu.degree}</p>
            <p className="text-sm text-gray-600">
              {edu.name} | {edu.year}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Resume;
