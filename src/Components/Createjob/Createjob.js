import React, { useState } from "react";
import axios from "axios";
import Background from "../Background/Background";
import Navbar from "../Navbar/Navbar";
function CreateJobPage() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    companyWebsite: "",
    jobType: "",
    salary: "",
    jobDescription: "",
    jobApplyLink: "",
  });

  const [message, setMessage] = useState(null);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Assuming you're using JWT stored in localStorage
      const response = await axios.post(
        apiUrl + "/api/auth/createpost", // Adjust the URL to your backend
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authentication
          },
        }
      );
      setMessage("Job posted successfully!");

      alert("Job posted successfully!");
    } catch (error) {
      setMessage("Error creating job post");
    }
  };

  return (
    <Background>
      <Navbar />
      <h1 className="text-3xl  mt-10 text-white font-bold mb-8 text-center">
        Create a Job Post
      </h1>
      <div className="flex-1 flex justify-center">
        <div className="p-10 flex justify-center rounded-lg  items-center border border-indigo-300/10 text-white">
          <div className=" w-full rounded-md">
            {message && <p>{message}</p>}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2  w-full gap-6 "
            >
              <div>
                <p>Job Title</p>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Job Title"
                  required
                  className="bg-white/10 mt-2 pt-2 pb-2 pl-2 pr-2 rounded-md w-full"
                />
              </div>
              <div>
                <p>Company Name</p>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Company Name"
                  required
                  className="bg-white/10 mt-2 pt-2 pb-2 pl-2 pr-2 rounded-md w-full"
                />
              </div>
              <div>
                <p>Location</p>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  required
                  className="bg-white/10 mt-2 pt-2 pb-2 pl-2 pr-2 rounded-md w-full"
                />
              </div>
              <div>
                <p>Website link</p>
                <input
                  type="text"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  placeholder="Company Website"
                  required
                  className="bg-white/10 mt-2 pt-2 pb-2 pl-2 pr-2 rounded-md w-full"
                />
              </div>
              <div>
                <p>Job Type</p>
                <input
                  type="text"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  placeholder="Job Type (e.g., Full-time)"
                  required
                  className="bg-white/10 mt-2 pt-2 pb-2 pl-2 pr-2 rounded-md w-full"
                />
              </div>
              <div>
                <p>Salary</p>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="Salary"
                  required
                  className="bg-white/10 mt-2 pt-2 pb-2 pl-2 pr-2 rounded-md w-full"
                />
              </div>
              <div>
                <p>Job Description</p>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleChange}
                  placeholder="Job Description"
                  required
                  className="bg-white/10 mt-2 p-2 max-h-10 rounded-md w-full"
                ></textarea>
              </div>
              <div>
                <p>Job Apply link</p>
                <input
                  type="text"
                  name="jobApplyLink"
                  value={formData.jobApplyLink}
                  onChange={handleChange}
                  placeholder="Job Apply Link"
                  required
                  className="bg-white/10 mt-2 pt-2 pb-2 pl-2 pr-2 rounded-md w-full"
                />
              </div>
            </form>
            <div className="text-center mt-10">
              <button
                type="submit"
                className="font-semibold border-l-2 border-l-n-2 hover:font-extrabold  bg-gradient-to-b from-[#cdccd3] via-[#cdccd3] to-[#b6afd5] border-[#cdccd3] border hover:bg-gradient-to-b hover:from-white hover:via-white hover:to-[#b6afd5]  text-indigo-900  py-2 px-6 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
}

export default CreateJobPage;
