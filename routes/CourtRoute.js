// routes/CourtRoute.js
const express = require("express");
const router = express.Router();
const { createCourt, getCourts, updateCourt, deleteCourt } = require("../controller/CourtController");

// Create a new court
router.post("/", createCourt);

// Get all courts
router.get("/", getCourts);

// Update a court by ID
router.put("/:id", updateCourt);

// Delete a court by ID
router.delete("/:id", deleteCourt);

module.exports = router;
