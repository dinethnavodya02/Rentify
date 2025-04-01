import axios from "axios";
import React, { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";

const Tool_bookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // or wherever your token is stored

    axios
      .get("http://localhost:5000/user-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBookings(res.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, []);

  const handleDelete = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      axios
        .delete(`http://localhost:5000/booking/${bookingId}`)
        .then(() => {
          setBookings((prev) =>
            prev.filter((booking) => booking._id !== bookingId)
          );
        })
        .catch((error) => {
          console.error("Error deleting booking:", error);
        });
    }
  };

  return (
    <>
      <NavBar />
      <h2 className="m-8 text-4xl font-bold text-gray-800">My Rentals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-8 my-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-background shadow-lg rounded-lg overflow-hidden border border-gray-200 transform hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Tool Image */}
              <Link to={`/booking/${booking._id}`} className="block">
                <img
                  src={
                    booking.tool && booking.tool.tool_photos?.length > 0
                      ? `http://localhost:5000/uploads/${booking.tool.tool_photos[0]}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={booking.tool?.tool_title || "Tool"}
                  className="w-full h-48 object-cover"
                />
              </Link>

              {/* Booking Information */}
              <div className="p-4 space-y-2">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {booking.tool.tool_title}
                </h3>

                <div className="flex items-center text-gray-600 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-1 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25M12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM12 10.5h.008v.008H12v-.008zM9.75 12h.008v.008H9.75v-.008zM7.5 12h.008v.008H7.5v-.008zM16.5 15h.008v.008H16.5v-.008zM16.5 10.5h.008v.008H16.5v-.008zM16.5 12h.008v.008H16.5v-.008z"
                    />
                  </svg>
                  {new Date(booking.rentFrom).toLocaleDateString()} →{" "}
                  {new Date(booking.rentTo).toLocaleDateString()}
                </div>

                <div className="flex items-center text-gray-600 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-1 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 10-7.5 0 3.75 3.75 0 007.5 0z"
                    />
                  </svg>
                  {differenceInCalendarDays(
                    new Date(booking.rentTo),
                    new Date(booking.rentFrom)
                  )}{" "}
                  Days
                </div>

                <div className="flex items-center text-gray-600 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-1 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  Total Price: Rs. {booking.rentPrice}.00
                </div>
              </div>

              {/* Cancel Booking Button */}
              <button
                onClick={() => handleDelete(booking._id)}
                className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-b-lg p-2 w-full transition-colors duration-300 mt-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancel Booking
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mx-8 my-4 text-lg">No bookings found.</p>
        )}
      </div>
    </>
  );
};

export default Tool_bookings;
