
// const Booking = require("../model/Booking")

// const findAll = async (req, res) => {
//     try {
//         const books = await Booking.find().populate(["customerId","groundId"]);
//         res.status(200).json(books);
//     } catch (e) {
//         res.json(e)
//     }
// }

// const save = async (req, res) => {
//     try {
//         const books = new Booking(req.body);
//         await books.save();
//         res.status(201).json(books)
//     } catch (e) {
//         res.json(e)
//     }
// }

// const Booking = require("../model/Booking");

// // Delete a booking by ID
// const deleteBooking = async (req, res) => {
//   try {
//     const bookingId = req.params.id;
//     const deletedBooking = await Booking.findByIdAndDelete(bookingId);
//     if (!deletedBooking) {
//       return res.status(404).json({ error: "Booking not found" });
//     }
//     res.json({ message: "Booking deleted successfully", booking: deletedBooking });
//   } catch (error) {
//     console.error("Error deleting booking:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };


// module.exports = {
//     findAll,
//     save
// }

// controllers/BookingController.js
const Booking = require("../model/Booking");

const findAll = async (req, res) => {
  try {
    const books = await Booking.find().populate(["customerId", "groundId"]);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings", details: error });
  }
};

const save = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: "Failed to save booking", details: error });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully", booking: deletedBooking });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Server error", details: error });
  }
};

module.exports = { findAll, save, deleteBooking };
