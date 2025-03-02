// // routes/OwnerRoute.js
// const express = require("express");
// const router = express.Router();
// const Court = require("../model/Court"); // Ensure the path is correct

// // Existing GET endpoint for owner courts...
// router.get("/courts", async (req, res) => {
//   try {
//     const courts = await Court.find();
//     res.json({ courts });
//   } catch (error) {
//     console.error("Error fetching owner courts:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // NEW: POST endpoint to create a new court
// router.post("/courts", async (req, res) => {
//   try {
//     const newCourt = new Court(req.body);
//     await newCourt.save();
//     res.status(201).json(newCourt);
//   } catch (error) {
//     console.error("Error creating court:", error);
//     res.status(500).json({ error: "Failed to create court" });
//   }
// });

// module.exports = router;
