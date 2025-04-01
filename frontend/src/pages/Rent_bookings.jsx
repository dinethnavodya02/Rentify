import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBar from "../components/AdminNavBar";

const Rent_bookings = () => {
  const { toolId } = useParams();
  const [tool, setTool] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch tool details
    axios.get(`http://localhost:5000/tools/${toolId}`).then(({ data }) => {
      setTool(data);
    });

    // Fetch bookings related to the tool
    axios
      .get(`http://localhost:5000/tools/${toolId}/bookings`)
      .then(({ data }) => {
        setBookings(data.bookings); // Assuming the response contains the bookings
      });
  }, [toolId]);

  if (!tool) return <p className="text-center">Loading tool...</p>;
  if (!bookings) return <p className="text-center">Loading bookings...</p>;

  return (
    <>
      <NavBar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-background shadow-lg rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <img
              src={
                tool.tool_photos.length > 0
                  ? `http://localhost:5000/uploads/${tool.tool_photos[0]}`
                  : "https://via.placeholder.com/150"
              }
              alt={tool.tool_title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="col-span-2">
              <h2 className="text-3xl font-bold text-[#16423C]">
                {tool.tool_title}
              </h2>
              <p className="mt-2 text-[#6A9C89] overflow-hidden text-ellipsis whitespace-nowra">
                {tool.tool_description}
              </p>
              <p className="mt-4 text-lg font-semibold">
                Price:{" "}
                <span className="text-[#16423C]">Rs. {tool.tool_price}</span>
              </p>
              <p className="mt-2 text-sm text-[#16423C]">
                Max Rental Days: {tool.tool_maxDays}
              </p>
            </div>
          </div>
        </div>

        <h3 className="mt-4 text-2xl font-semibold text-[#16423C]">
          Bookings:
        </h3>
        <ul className="mt-4 space-y-4">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col md:flex-row items-start justify-between"
            >
              <div className="flex-1">
                <div className="font-semibold text-lg text-[#16423C]">
                  {booking.tool.tool_title}
                </div>
                <div className="text-[#16423C] mt-1 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1 text-[#6A9C89]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M8 14h.01M4 6h16M4 12h16M4 18h16M5 6h.01M5 12h.01M5 18h.01"
                    />
                  </svg>
                  <span>
                    From: {new Date(booking.rentFrom).toLocaleDateString()} To:{" "}
                    {new Date(booking.rentTo).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-lg font-semibold mt-2 text-[#6A9C89]">
                  Price: Rs. {booking.rentPrice}
                </p>
              </div>
              <div className="mt-4 md:mt-0 md:ml-4">
                <p className="text-lg font-semibold text-[#16423C]">
                  Renter: {booking.rentName}
                </p>
                <p className="text-lg font-semibold text-[#16423C]">
                  Mobile: {booking.rentMobile}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Rent_bookings;
