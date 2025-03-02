// const express=require("express");
// const router=express.Router();
// const { findAll, save} = require("../controller/BookingController");



// router.get("/", findAll);
// router.post("/", save);






// module.exports=router;
// routes/BookingRoute.js

// routes/BookingRoute.js
const express = require("express");
const router = express.Router();
const Booking = require("../model/Booking"); // or wherever your Booking model is
const { deleteBooking } = require("../controller/BookingController");

// GET /api/booking/court?courtName=...&date=YYYY-MM-DD
router.get("/court", async (req, res) => {
  try {
    const { courtName, date } = req.query;
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const bookings = await Booking.find({
      courtName,
      dateTime: { $gte: startOfDay, $lte: endOfDay }
    });

    const bookedSlots = bookings.map(b => b.timeSlot);
    return res.json({ bookedSlots });
  } catch (error) {
    console.error("Error fetching booked slots:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/booking/user/:userId
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId });
    return res.json({ bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/booking (for creating a booking)
router.post("/", async (req, res) => {
  try {
    const { courtName, dateTime, timeSlot, userId } = req.body;
    // Additional validations if needed
    const newBooking = new Booking({
      courtName,
      dateTime,
      timeSlot,
      userId,
      status: "PENDING"
    });
    await newBooking.save();
    return res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

router.delete("/:id", deleteBooking);

module.exports = router;
