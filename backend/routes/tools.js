const express = require("express");
const ToolModel = require("../models/tools");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const imageDownloader = require("image-downloader");
const booking = require("../models/bookings");
const BookingModel = require("../models/bookings");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// File upload middleware
const photosMiddleware = multer({ dest: "uploads/" });

// Route to upload an image by link
router.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  const uploadPath = path.join(__dirname, "../uploads", newName);

  try {
    await imageDownloader.image({
      url: link,
      dest: uploadPath,
    });
    res.json(newName);
  } catch (error) {
    console.error("Error downloading the image:", error);
    res.status(500).json({ message: "Image download failed." });
  }
});

// Route to upload multiple photos
router.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});

// Route to create a new tool
router.post("/tools", async (req, res) => {
  try {
    const {
      tool_title,
      tool_photos,
      tool_description,
      tool_perks,
      tool_price,
      tool_maxDays,
    } = req.body;
    const toolDoc = await ToolModel.create({
      tool_title,
      tool_photos,
      tool_description,
      tool_perks,
      tool_price,
      tool_maxDays,
    });
    res.status(201).json(toolDoc);
  } catch (error) {
    console.error("Error creating tool:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to fetch a specific tool by ID
router.get("/tools/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tool = await ToolModel.findById(id);
    if (!tool) {
      return res.status(404).json({ message: "Tool not found" });
    }
    res.json(tool);
  } catch (error) {
    console.error("Error fetching tool:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/tools/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await ToolModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking" });
  }
});

// Backend API endpoint to get a tool and its bookings
router.get("/tools/:toolId/bookings", async (req, res) => {
  try {
    const tool = await ToolModel.findById(req.params.toolId).populate(
      "bookings"
    ); // Populate if you have the bookings array in Tool
    if (!tool) {
      return res.status(404).json({ message: "Tool not found" });
    }
    const bookings = await BookingModel.find({ tool: tool._id }); // This will give you bookings for that tool
    res.json({ tool, bookings });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tool details", error });
  }
});

// Route to fetch all tools
router.get("/tools", async (req, res) => {
  try {
    const tools = await ToolModel.find();
    res.status(200).json(tools);
  } catch (error) {
    console.error("Error fetching tools:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to create a new booking
router.post("/booking", protect, async (req, res) => {
  const { tool, rentFrom, rentTo, rentName, rentMobile, rentPrice } = req.body;

  try {
    const newBooking = await BookingModel.create({
      user: req.user._id, // Get user ID from token (protect middleware)
      tool,
      rentFrom,
      rentTo,
      rentName,
      rentMobile,
      rentPrice,
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to fetch a specific booking by ID
router.get("/booking/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await BookingModel.findById(id).populate("tool");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/booking/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;
    await BookingModel.findByIdAndDelete(bookingId);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking" });
  }
});

// Route to fetch all bookings
router.get("/booking", protect, async (req, res) => {
  try {
    const bookings = await BookingModel.find().populate("tool");
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/user-bookings", protect, async (req, res) => {
  try {
    // Assuming the user is authenticated and their ID is stored in req.user
    const userId = req.user._id; // You can get the user's ID from the `req.user` if they are authenticated

    const bookings = await BookingModel.find({ user: userId }).populate("tool");

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to update a tool
router.put("/tools/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const {
      tool_title,
      tool_photos,
      tool_description,
      tool_perks,
      tool_price,
      tool_maxDays,
    } = req.body;
    const toolDoc = await ToolModel.findById(id);
    if (!toolDoc) {
      return res.status(404).json({ message: "Tool not found" });
    }
    toolDoc.tool_title = tool_title;
    toolDoc.tool_photos = tool_photos;
    toolDoc.tool_description = tool_description;
    toolDoc.tool_perks = tool_perks;
    toolDoc.tool_price = tool_price;
    toolDoc.tool_maxDays = tool_maxDays;
    await toolDoc.save();
    res.json({ message: "Tool updated successfully" });
  } catch (error) {
    console.error("Error updating tool:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
