import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Background from "../Background/Background";
function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [topic, setTopic] = useState("");
  const [organizedBy, setOrganizedBy] = useState("");
  const [format, setFormat] = useState("");
  const [joinLink, setJoinLink] = useState("");
  const [description, setDescription] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        apiUrl + "/api/auth/createevent",
        { title, dateTime, topic, organizedBy, format, joinLink, description },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authentication
          },
        }
      );
      if (res.data) {
        alert("event create successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Background>
      <Navbar />
      <h1 className="text-3xl  mt-10 text-white font-bold mb-8 text-center">
        Create a Job Post
      </h1>
      <div className=" flex justify-center ">
        <form
          onSubmit={handleSubmit}
          className="shadow-lgrounded-2xl p-6 text-white border rounded-lg border-indigo-300/20"
        >
          <div className="gap-10 grid grid-cols-2 ">
            <div>
              <label className="block  font-semibold ">Event Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-indigo-300/30 bg-white/10 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block  font-semibold ">Date & Time</label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full p-2 border border-indigo-300/30 bg-white/10 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block  font-semibold ">Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-2 border border-indigo-300/30 bg-white/10 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block  font-semibold ">Organized By</label>
              <input
                type="text"
                value={organizedBy}
                onChange={(e) => setOrganizedBy(e.target.value)}
                className="w-full p-2 border border-indigo-300/30 bg-white/10 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block  font-semibold ">Format</label>
              <input
                type="text"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full p-2 border border-indigo-300/30 bg-white/10 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block  font-semibold ">Join Link</label>
              <input
                type="url"
                value={joinLink}
                onChange={(e) => setJoinLink(e.target.value)}
                className="w-full p-2 border border-indigo-300/30 bg-white/10 rounded-lg"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block  font-semibold ">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-indigo-300/30 bg-white/10 rounded-lg"
                rows="4"
                required
              ></textarea>
            </div>
          </div>
          <div className="text-center mt-10">
            <button
              type="submit"
              className="font-semibold border-l-2 border-l-n-2 hover:font-extrabold  bg-gradient-to-b from-[#cdccd3] via-[#cdccd3] to-[#b6afd5] border-[#cdccd3] border hover:bg-gradient-to-b hover:from-white hover:via-white hover:to-[#b6afd5]  text-indigo-900  py-2 px-6 rounded"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </Background>
  );
}

export default CreateEventPage;
