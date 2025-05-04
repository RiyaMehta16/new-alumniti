import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Workflow } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import Background from "../Background/Background";

function Event() {
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(apiUrl + "/api/auth/getevents", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authorization
          },
        });
        setEvent(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvent();
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric", // Optional, include this if you want seconds
      hour12: true,
    });
  };

  return (
    <div className=" min-h-screen ">
      <Background className="">
        <div>
          <Navbar />
        </div>

        <div className="flex w-full">
          <div className="w-1/5">
            <Sidebar />
          </div>
          <div className="w-4/5">
            <div className="flex justify-between h-[40px] w-full mt-6 mb-6">
              <div className="font-medium text-white text-xl ml-[30px]">
                Recommended Events
              </div>
              <div className="flex mr-[30px] gap-4">
                <button
                  onClick={() => navigate("/createevent")}
                  className="bg-white text-indigo-950 rounded px-6 py-2 text-sm font-semibold shadow-lg hover:bg-indigo-300 hover:text-indigo-900 transition-transform transform hover:scale-105"
                >
                  Create Events
                </button>
                <div className="border-[1px] border-gray-400 hover:cursor-pointer rounded text-sm justify-center font-medium items-center text-gray-400 flex gap-2 p-1 pb-1 pl-2 pr-2">
                  Most recent <Workflow />
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="flex flex-col gap-2">
                {event.map((event, index) => (
                  <div className="bg-white/10  shadow-lg w-5/6 mx-auto rounded-2xl p-6 text-indigo-200 border border-gray-200">
                    <p className="mb-2 flex gap-1">
                      {event.postedBy.name}
                      <span>({event.postedBy.role})</span>
                    </p>
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-2xl font-bold text-indigo-400">
                        {event.title}
                      </h2>
                      <span className="text-sm text-indigo-100">
                        {formatDate(event.dateTime)}
                      </span>
                    </div>

                    <div className="mb-1">
                      <h3 className="text-lg font-semibold text-indigo-300">
                        Topic:
                      </h3>
                      <p className="text-indigo-100">{event.topic}</p>
                    </div>

                    <div className="mb-1">
                      <h3 className="text-lg font-semibold text-indigo-300">
                        Organized by:
                      </h3>
                      <p className="text-indigo-100">{event.organizedBy}</p>
                    </div>

                    <div className="mb-1">
                      <h3 className="text-lg font-semibold text-indigo-300">
                        Format:
                      </h3>
                      <p className="text-indigo-100">{event.format}</p>
                    </div>

                    <div className="mb-1">
                      <h3 className="text-lg font-semibold text-indigo-300">
                        Join Link:
                      </h3>
                      <a
                        href={event.joinLink}
                        className="text-indigo-100 font-bold hover:underline"
                      >
                        Click here to join
                      </a>
                    </div>
                    <div className="mb-1">
                      <h3 className="text-lg font-semibold text-indigo-300">
                        About:
                      </h3>
                      <p className="text-indigo-100">{event.description}</p>
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

export default Event;
