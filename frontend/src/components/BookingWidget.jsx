import React, { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";

const BookingWidget = ({ tool }) => {
  const [rentFrom, setRentFrom] = useState("");
  const [rentTo, setRentTo] = useState("");
  const [rentName, setRentName] = useState("");
  const [rentMobile, setRentMobile] = useState("");
  const [redirect, setRedirect] = useState("");
  let numberOfDays = 0;

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/users/me",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setRentName(response.data.name); // Assuming user has a `name` field
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUser();
  }, []);

  // Calculate number of days only if both dates are selected
  if (rentFrom && rentTo) {
    numberOfDays = differenceInCalendarDays(
      new Date(rentTo),
      new Date(rentFrom)
    );
  }

  async function rentTool() {
    try {
      const token = localStorage.getItem("token"); // Get token from local storage or your preferred storage
      if (!token) {
        console.error("No token found");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/booking",
        {
          rentFrom,
          rentTo,
          rentName,
          rentMobile,
          tool: tool._id,
          rentPrice: numberOfDays * tool.tool_price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );

      const bookingId = res.data._id;
      setRedirect(`/booking/${bookingId}`);
    } catch (error) {
      console.error(
        "Error making booking:",
        error.response?.data || error.message
      );
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <div className="grid grid-cols-2 text-center border rounded-2xl mt-2 font-semibold">
        <div className="my-4 px-2">
          <label htmlFor="">Rent From : </label>
          <input
            type="Date"
            value={rentFrom}
            onChange={(e) => setRentFrom(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label htmlFor="">Rent To : </label>
          <input
            type="Date"
            value={rentTo}
            onChange={(e) => setRentTo(e.target.value)}
          />
        </div>
      </div>
      <div>
        {/* Show total price and renter details only if numberOfDays is positive */}
        {numberOfDays > 0 ? (
          <>
            {tool.tool_maxDays > numberOfDays ? (
              <div className="my-4 text-lg">
                <div className="m-2">
                  <label htmlFor="">Name :</label>
                  <input
                    type="text"
                    value={rentName}
                    onChange={(e) => setRentName(e.target.value)}
                    className="border p-1 mx-2 rounded-lg"
                  />
                </div>
                <div className="m-2">
                  <label htmlFor="">Mobile no :</label>
                  <input
                    type="text"
                    value={rentMobile}
                    onChange={(e) => setRentMobile(e.target.value)}
                    className="border p-1 mx-2 rounded-lg"
                  />
                </div>
                <div className="text-2xl text-right">
                  Total(Rs.) : {numberOfDays * tool.tool_price}.00
                </div>
              </div>
            ) : (
              <div className="text-red-500 my-4">
                <p>
                  Sorry, you cannot rent this tool for more than{" "}
                  {tool.tool_maxDays} days.
                </p>
              </div>
            )}
          </>
        ) : null}{" "}
        {/* Do not show error message when numberOfDays is zero */}
      </div>

      <button
        onClick={rentTool}
        className="w-full bg-[#16423C] flex gap-4 justify-center  text-white p-4 rounded-2xl text-xl mr-3 mt-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
          <path
            fillRule="evenodd"
            d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
            clipRule="evenodd"
          />
        </svg>
        Rent now
      </button>
    </div>
  );
};

export default BookingWidget;
