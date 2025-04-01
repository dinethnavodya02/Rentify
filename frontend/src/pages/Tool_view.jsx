import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import NavBar from "../components/Navbar";

const Tool_view = () => {
  const { id } = useParams();
  const [tool, setTool] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchTool = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/tools/${id}`);
        setTool(res.data);
      } catch (error) {
        console.error("Error fetching tool:", error);
      }
    };

    fetchTool();
  }, [id]);

  if (!tool) {
    return <div>Loading...</div>;
  }

  // Check if showAllPhotos is true to render full screen
  if (showAllPhotos) {
    return (
      <div className="relative inset-0 bg-black flex flex-col items-center justify-center z-50">
        <button
          onClick={() => setShowAllPhotos(false)}
          className="fixed flex gap-2 left-6 top-6 py-2 px-4 bg-white rounded-2xl shadow-md shadow-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
          close photos
        </button>
        <div className="p-1 grid gap-4 bg-black">
          {tool.tool_photos.length > 0 &&
            tool.tool_photos.map((photo) => (
              <img
                src={`http://localhost:5000/uploads/${photo}`}
                alt={tool.tool_title}
                className="w-screen h-auto max-h-screen object-contain"
              />
            ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="mt-4 bg-[#EFF4F2] mx-8 px-8 py-8 rounded-2xl">
        <h1 className="text-3xl font-bold">{tool.tool_title}</h1>

        {/* Custom Grid Container for Images */}
        <div className="relative">
          <div
            className="mt-4 grid gap-3"
            style={{
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gridTemplateRows: "25vh 50vh",
            }}
          >
            <div className="col-span-2 row-span-2">
              {tool.tool_photos?.[0] && (
                <img
                  src={`http://localhost:5000/uploads/${tool.tool_photos[0]}`}
                  alt={tool.tool_title}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div className="col-span-2 row-span-1">
              {tool.tool_photos?.[1] && (
                <img
                  src={`http://localhost:5000/uploads/${tool.tool_photos[1]}`}
                  alt={tool.tool_title}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div className="col-span-2 row-span-1">
              {tool.tool_photos?.[2] && (
                <img
                  src={`http://localhost:5000/uploads/${tool.tool_photos[2]}`}
                  alt={tool.tool_title}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
          </div>
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute flex gap-1 bottom-2 right-1 py-2 px-4 bg-white rounded-2xl shadow-md shadow-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                clipRule="evenodd"
              />
            </svg>
            see more
          </button>
        </div>

        <div className=" max-w-full overflow-hidden">
          <div className="">
            <div className="w-full flex justify-between">
              <div className="mt-4 w-3/5">
                <h2 className="mt-2 font-semibold text-2xl">Description</h2>
                <p className="text-lg mt-2 break-words line-clamp-3">
                  {tool.tool_description}
                </p>
                <div className="mt-4">
                  <h2 className="mt-2 font-semibold text-2xl">Tool Perks</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tool.tool_perks &&
                      tool.tool_perks.map((perk, index) => (
                        <button
                          key={index}
                          className="bg-[#16423C] text-white rounded-full px-4 py-2  transition duration-200"
                        >
                          {perk}
                        </button>
                      ))}
                  </div>
                  <div className="mt-4 font-semibold text-xl">
                    Max number of Rent Days: {tool.tool_maxDays}
                  </div>
                </div>
              </div>
              <div className="py-4">
                <div className="bg-white p-4 rounded-2xl shadow">
                  <div className="text-center text-2xl font-semibold">
                    Price: Rs.{tool.tool_price} / Per day
                  </div>
                  <BookingWidget tool={tool} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tool_view;
