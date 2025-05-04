import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import Background from "../Background/Background";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [jobs, setJobs] = useState([
    { title: "", company: "", startDate: "", endDate: "", description: "" },
  ]);
  const [education, setEducation] = useState([
    { name: "", year: "", degree: "" },
  ]);
  const [skills, setSkills] = useState([""]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");
  const [currentjob, setCurrentjob] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [github, setGithub] = useState("");
  const [linkdin, setLinkdin] = useState("");
  const [img, setImg] = useState(null);
  const [imgLoad, setImgLoad] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const imgChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  //dom60njrq

  const uploadImg = async () => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "evagczqi");
    try {
      setImgLoad(true);
      let response = await fetch(
        "https://api.cloudinary.com/v1_1/dom60njrq/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      let urlData = response.json();
      setImgLoad(false);
      return urlData;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(apiUrl + "/api/auth/profile-alumni", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = response.data[0];
        setName(userData.name);
        setEmail(userData.email);
        setCollege(userData.college);
        setJobs(userData.jobs || []);
        setEducation(userData.education || []);
        setSkills(userData.skills || [""]);
        setAbout(userData.about || [""]);
        setCurrentjob(userData.currentjob || [""]);
        setGithub(userData.github || [""]);
        setLocation(userData.location || [""]);
        setPortfolio(userData.portfolio || [""]);
        setLinkdin(userData.linkdin || [""]);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleJobChange = (index, field, value) => {
    const updatedJobs = [...jobs];
    updatedJobs[index][field] = value;
    setJobs(updatedJobs);
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const addJob = () => {
    setJobs([
      ...jobs,
      { title: "", company: "", startDate: "", endDate: "", description: "" },
    ]);
  };

  const addEducation = () => {
    setEducation([...education, { name: "", year: "", degree: "" }]);
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const removeJob = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
  };

  const removeEducation = (index) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const url = await uploadImg(img);
      const token = localStorage.getItem("token");
      const response = await axios.put(
        apiUrl + "/api/auth/update",
        {
          name,
          email,
          college,
          jobs,
          education,
          skills,
          about,
          location,
          currentjob,
          portfolio,
          github,
          linkdin,
          img: url.url,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccessMessage("Profile updated successfully!");
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.log(err.response.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background className="">
      <Navbar />

      <div className="flex w-full">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 bg-zinc-100 pl-20 pt-10">
          <h2 className="text-indigo-700 font-bold text-2xl">Edit Profile</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <form className="w-4/5 flex-col mx-3" onSubmit={handleSubmit}>
            <div className="w-full flex mt-4 justify-between items-center gap-2 ">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white text-gray-500 focus:text-gray-900 pt-2 rounded-md pb-2 pl-2 pr-2 w-1/2"
                required
              />
            </div>
            <div className="h-[1px] w-full bg-zinc-200  rounded-md mt-3 mb-10"></div>
            <div className="w-full justify-between items-center flex mt-2 gap-2">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-gray-500 focus:text-gray-900 pt-2 rounded-md pb-2 pl-2 pr-2 w-1/2"
                required
              />
            </div>
            <div className="h-[1px] w-full bg-zinc-200  rounded-md mt-3 mb-10"></div>
            <div className="w-full justify-between items-center flex mt-2 gap-2">
              <label>College</label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="bg-white text-gray-500 focus:text-gray-900 pt-2 rounded-md pb-2 pl-2 pr-2 w-1/2"
                required
              />
            </div>
            <div className="h-[1px] w-full bg-zinc-200  rounded-md mt-3 mb-10"></div>

            <div className="w-full flex mt-4 justify-between items-center gap-2 ">
              <h3>Jobs</h3>
              {jobs.map((job, index) => (
                <div key={index} className="flex flex-col ml-10">
                  <div className="flex flex-col ">
                    <label className="ml-2">Job Title</label>
                    <input
                      type="text"
                      value={job.title}
                      onChange={(e) =>
                        handleJobChange(index, "title", e.target.value)
                      }
                      className="bg-white text-gray-500 focus:text-gray-900 pt-2 rounded-md pb-2 pl-2 pr-2 w-[470px] mt-1 mb-2"
                      required
                    />
                  </div>
                  <div className="">
                    <label className="ml-2">Company</label>
                    <input
                      type="text"
                      value={job.company}
                      onChange={(e) =>
                        handleJobChange(index, "company", e.target.value)
                      }
                      className="bg-white text-gray-500 focus:text-gray-900 pt-2 rounded-md pb-2 pl-2 pr-2 w-full mt-1 mb-2"
                      required
                    />
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <label className="ml-2">Start Date</label>
                    <input
                      type="date"
                      value={job.startDate}
                      onChange={(e) =>
                        handleJobChange(index, "startDate", e.target.value)
                      }
                      className="bg-white text-gray-500 focus:text-gray-900 pt-2 rounded-md pb-2 pl-2 pr-2 w-[470px] mt-1 mb-2"
                      required
                    />
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <label className="ml-2">End Date</label>
                    <input
                      type="date"
                      value={job.endDate}
                      onChange={(e) =>
                        handleJobChange(index, "endDate", e.target.value)
                      }
                      className="bg-white text-gray-500 focus:text-gray-900 pt-2 rounded-md pb-2 pl-2 pr-2 w-[470px] mt-1 mb-2"
                      required
                    />
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <label className="ml-2">Description</label>
                    <textarea
                      value={job.description}
                      onChange={(e) =>
                        handleJobChange(index, "description", e.target.value)
                      }
                      className="bg-white text-gray-500 focus:text-gray-900 pt-2 rounded-md pb-2 pl-2 pr-2 w-[470px] mt-1 mb-2"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    className="text-indigo-700 w-full  px-7 h-[50px] mt-8 rounded-md bg-indigo-200"
                    onClick={() => removeJob(index)}
                  >
                    Remove this Job
                  </button>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button
                type="button"
                className="w-1/2 pt-2 pb-2 bg-indigo-700 text-indigo-50  rounded-md  hover:bg-indigo-900 transition-colors duration-300"
                onClick={addJob}
              >
                + Add a New Job
              </button>
            </div>
            <div className="h-[1px] w-full bg-zinc-200  rounded-md mt-3 mb-10"></div>

            <div className="w-full flex mt-4 justify-between items-center gap-2 ">
              <h3>Education</h3>
              {education.map((edu, index) => (
                <div key={index} className="flex flex-col ml-10">
                  <div className="w-1/2 flex flex-col">
                    <label>College Name</label>
                    <input
                      type="text"
                      value={edu.name}
                      onChange={(e) =>
                        handleEducationChange(index, "name", e.target.value)
                      }
                      className="bg-white text-gray-500 focus:text-gray-900 pt-2 rounded-md pb-2 pl-2 pr-2 w-[470px] mt-1 mb-2"
                      required
                    />
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <label>Year</label>
                    <input
                      type="number"
                      value={edu.year}
                      onChange={(e) =>
                        handleEducationChange(index, "year", e.target.value)
                      }
                      className="bg-white text-gray-500 focus:text-gray-900 pt-2 rounded-md pb-2 pl-2 pr-2 w-[470px] mt-1 mb-2"
                      required
                    />
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <label>Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(index, "degree", e.target.value)
                      }
                      className="bg-white text-gray-500 focus:text-gray-900 pt-2 rounded-md pb-2 pl-2 pr-2 w-[470px] mt-1 mb-2"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    className="text-indigo-700  px-7 h-[40px] mt-7 rounded-md  bg-indigo-200"
                    onClick={() => removeEducation(index)}
                  >
                    Remove Education
                  </button>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button
                type="button"
                className="w-1/2 pt-2 pb-2 bg-indigo-700 text-indigo-50  rounded-md  hover:bg-indigo-900 transition-colors duration-300"
                onClick={addEducation}
              >
                + Add Education
              </button>
            </div>
            <div className="h-[1px] w-full bg-zinc-200  rounded-md mt-3 mb-10"></div>

            <div className="w-full flex  mt-4 justify-between items-center gap-2 ">
              <h3>Skills</h3>
              <div className="">
                {skills.map((skill, index) => (
                  <div key={index} className="flex flex-col ml-10">
                    <div className="w-1/2 flex flex-col ">
                      <label className="mt-2">Skill</label>
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) =>
                          handleSkillChange(index, e.target.value)
                        }
                        className="bg-white text-gray-500 focus:text-gray-900 pt-2 rounded-md pb-2 pl-2 pr-2 w-[470px] mt-1 mb-2"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-indigo-700  px-7 h-[40px] mt-2 rounded-md  bg-indigo-200"
                    >
                      Remove Skill
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-10">
              <button
                type="button"
                className="w-1/2 pt-2 pb-2 bg-indigo-700 text-indigo-50  rounded-md  hover:bg-indigo-900 transition-colors duration-300"
                onClick={addSkill}
              >
                + Add Skill
              </button>
            </div>
            <div className="h-[1px] w-full bg-zinc-200  rounded-md mt-3 mb-10"></div>

            <div className="w-full justify-between items-center flex mt-2 gap-2">
              <h3>About</h3>
              <textarea
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="bg-white text-gray-500 focus:text-gray-900 pt-2 rounded-md pb-2 pl-2 pr-2 w-1/2 min-h-28"
                placeholder="Hello, I am Yogesh Kumar"
                required
              />
            </div>
            <div className="h-[1px] w-full bg-zinc-200  rounded-md mt-3 mb-10"></div>

            <div className="w-full justify-between items-center flex mt-2 gap-2">
              <h3>Location</h3>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-white text-gray-500 focus:text-gray-900 pt-2 rounded-md pb-2 pl-2 pr-2 w-1/2"
                placeholder="Bathinda, Punjab"
                required
              />
            </div>
            <div className="h-[1px] w-full bg-zinc-200  rounded-md mt-3 mb-10"></div>

            <div className="w-full justify-between items-center flex mt-2 gap-2">
              <h3>Current Job</h3>
              <input
                type="text"
                value={currentjob}
                onChange={(e) => setCurrentjob(e.target.value)}
                className="bg-white text-gray-500 focus:text-gray-900 pt-2 rounded-md pb-2 pl-2 pr-2 w-1/2"
                placeholder="Full Stack Developer || Company Name"
                required
              />
            </div>
            <div className="h-[1px] w-full bg-zinc-200  rounded-md mt-3 mb-10"></div>

            <div className="w-full justify-between items-center flex mt-2 gap-2">
              <h3>Portfolio</h3>
              <input
                type="url"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                className="bg-white text-gray-500 focus:text-gray-900 pt-2 rounded-md pb-2 pl-2 pr-2 w-1/2"
                placeholder="portfolio link"
                required
              />
            </div>
            <div className="h-[1px] w-full bg-zinc-200  rounded-md mt-3 mb-10"></div>

            <div className="w-full justify-between items-center flex mt-2 gap-2">
              <h3>Github</h3>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="bg-white text-gray-500 focus:text-gray-900 pt-2 rounded-md pb-2 pl-2 pr-2 w-1/2"
                placeholder=" github link"
                required
              />
            </div>
            <div className="h-[1px] w-full bg-zinc-200  rounded-md mt-3 mb-10"></div>

            <div className="w-full justify-between items-center flex mt-2 gap-2">
              <h3>Linkdin</h3>
              <input
                type="url"
                value={linkdin}
                onChange={(e) => setLinkdin(e.target.value)}
                className="bg-white text-gray-500 focus:text-gray-900 pt-2 rounded-md pb-2 pl-2 pr-2 w-1/2"
                placeholder="linkdin link"
                required
              />
            </div>
            <div className="h-[1px] w-full bg-zinc-200  rounded-md mt-3 mb-10"></div>

            <div className="w-full justify-between items-center flex mt-2 gap-2">
              <label className=" mt-2 mb-1">Profile pic</label>
              <input
                type="file"
                onChange={imgChange}
                className="border border-white outline-none rounded w-1/2 bg-white text-gray-500 focus:text-gray-900 pl-2 pr-2 pt-1 pb-1"
                required
              />
            </div>

            <button
              type="submit"
              className="mb-20 mt-6 w-full pt-2 pb-2 bg-indigo-950 text-indigo-50  rounded-md hover:bg-indigo-900 transition-colors duration-300"
              disabled={loading}
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </Background>
  );
};

export default UpdateProfile;
