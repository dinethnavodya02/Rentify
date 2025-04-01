import axios from "axios";
import React, { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Link, useParams } from "react-router-dom";
import jsPDF from "jspdf"; // Import jsPDF
import NavBar from "../components/Navbar";

const BookingDetail = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/booking/${id}`);
        setBooking(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching booking:", error);
      }
    };

    fetchBooking();
  }, [id]);

  // Check if booking and its tool are defined
  if (!booking || !booking.tool) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  // Function to download booking details as a PDF
  // Function to download booking details as a PDF
  const downloadBookingDetailsAsPDF = () => {
    const doc = new jsPDF();

    // Add a header
    doc.setFontSize(24);
    doc.text("Booking Report", 14, 20);

    // Add a line
    doc.setDrawColor(0, 0, 0);
    doc.line(14, 22, 200, 22); // Horizontal line

    // Set font for details
    doc.setFontSize(16);
    let y = 30; // Start position for the text

    // Booking ID
    doc.text(`Booking ID: ${booking._id}`, 14, y);
    y += 10;

    // Tool Title
    doc.text(`Tool Title: ${booking.tool.tool_title}`, 14, y);
    y += 10;

    // Description with text wrapping
    const descriptionLines = doc.splitTextToSize(
      booking.tool.tool_description,
      180
    );
    doc.text(descriptionLines, 14, y);
    y += descriptionLines.length * 10 + 5; // Adjust y based on the number of lines

    // Rent Period
    const rentPeriodText = `Rent Period: From ${new Date(
      booking.rentFrom
    ).toLocaleDateString()} to ${new Date(
      booking.rentTo
    ).toLocaleDateString()}`;
    doc.text(rentPeriodText, 14, y);
    y += 10;

    // Total Price
    doc.text(`Total Price: Rs. ${booking.rentPrice}.00`, 14, y);
    y += 10;

    // Duration
    const durationText = `Duration: ${differenceInCalendarDays(
      new Date(booking.rentTo),
      new Date(booking.rentFrom)
    )} days`;
    doc.text(durationText, 14, y);
    y += 10;

    // Renter Details
    doc.text(`Renter Name: ${booking.rentName}`, 14, y);
    y += 10;
    doc.text(`Contact: ${booking.rentMobile}`, 14, y);
    y += 10;

    // Add a footer
    doc.setFontSize(10);
    doc.text("Thank you for choosing our service!", 14, y + 20);
    doc.text("Contact us: support@Rentify.com", 14, y + 30);

    // Save the PDF
    doc.save(`Booking_Details_${booking._id}.pdf`);
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-semibold mb-4">
          {booking.tool.tool_title}
        </h1>
        <div className="flex mb-4">
          <div className="w-1/2 h-64 mr-4">
            {booking.tool.tool_photos && booking.tool.tool_photos.length > 0 ? (
              <img
                src={
                  "http://localhost:5000/uploads/" + booking.tool.tool_photos[0]
                }
                alt={booking.tool.tool_title}
                className="object-cover w-full h-full rounded-lg shadow-lg"
                style={{ objectFit: "cover", aspectRatio: "16/9" }}
              />
            ) : (
              <p className="text-[#16423C] text-sm">No Image</p>
            )}
          </div>
          <div className="w-1/2">
            <p className="text-lg font-semibold">Description:</p>
            <p className="text-md text-[#6A9C89] mb-4 overflow-hidden text-ellipsis whitespace-nowrap">
              {booking.tool.tool_description}
            </p>
            <p className="text-lg font-semibold">Rent Period:</p>
            <p className="text-md mb-4">
              From: {new Date(booking.rentFrom).toLocaleDateString()} to{" "}
              {new Date(booking.rentTo).toLocaleDateString()}
            </p>
            <p className="text-lg font-semibold">Total Price:</p>
            <p className="text-md mb-4">Rs. {booking.rentPrice}.00 </p>
            <p className="text-lg font-semibold">Duration:</p>
            <p className="text-md">
              {differenceInCalendarDays(
                new Date(booking.rentTo),
                new Date(booking.rentFrom)
              )}{" "}
              days
            </p>
          </div>
        </div>
        <div className="text-xl font-semibold">Additional Details:</div>
        <div className="bg-[#E9EFEC] p-4 rounded-lg shadow-md mt-4">
          <p className="m-2 flex">
            Booking ID: <div className="font-semibold mx-2">{booking._id}</div>
          </p>
          <p className="m-2 flex">
            Renter Name:{" "}
            <div className="font-semibold mx-2">{booking.rentName}</div>
          </p>
          <p className="m-2 flex">
            Contact:{" "}
            <div className="font-semibold mx-2">{booking.rentMobile}</div>
          </p>
        </div>
        <button
          onClick={downloadBookingDetailsAsPDF}
          className="mt-6 bg-[#16423C] text-white py-2 px-4 rounded-lg"
        >
          Download Booking Details as PDF
        </button>
        <Link to={"/booking"}>
          <button className="mt-6 bg-[#C4DAD2] py-2 px-4 rounded-lg ml-4">
            Rent more
          </button>
        </Link>
      </div>
    </>
  );
};

export default BookingDetail;
