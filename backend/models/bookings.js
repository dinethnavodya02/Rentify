const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  tool: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Tool" },
  rentFrom: { type: Date, required: true },
  rentTo: { type: Date, required: true },
  rentName: { type: String, required: true },
  rentMobile: { type: String, required: true },
  rentPrice: Number,
});

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
