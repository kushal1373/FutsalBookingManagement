// controllers/CourtController.js
const Court = require("../model/Court"); // Ensure your Court model is in model/Court.js

// Create a new court
const createCourt = async (req, res) => {
  try {
    const { name, imageUrl, price, phone } = req.body;
    if (!name || !imageUrl || !price || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newCourt = new Court({ name, imageUrl, price, phone });
    await newCourt.save();
    res.status(201).json({ message: "Court created successfully", court: newCourt });
  } catch (error) {
    console.error("Error creating court:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all courts
const getCourts = async (req, res) => {
  try {
    const courts = await Court.find({});
    res.json({ message: "Courts fetched successfully", courts });
  } catch (error) {
    console.error("Error fetching courts:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a court by ID
const updateCourt = async (req, res) => {
  try {
    const courtId = req.params.id;
    const { name, imageUrl, price, phone } = req.body;
    const updatedCourt = await Court.findByIdAndUpdate(
      courtId,
      { name, imageUrl, price, phone },
      { new: true, runValidators: true }
    );
    if (!updatedCourt) {
      return res.status(404).json({ error: "Court not found" });
    }
    res.json({ message: "Court updated successfully", court: updatedCourt });
  } catch (error) {
    console.error("Error updating court:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a court by ID
const deleteCourt = async (req, res) => {
  try {
    const courtId = req.params.id;
    const deletedCourt = await Court.findByIdAndDelete(courtId);
    if (!deletedCourt) {
      return res.status(404).json({ error: "Court not found" });
    }
    res.json({ message: "Court deleted successfully", court: deletedCourt });
  } catch (error) {
    console.error("Error deleting court:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createCourt, getCourts, updateCourt, deleteCourt };
