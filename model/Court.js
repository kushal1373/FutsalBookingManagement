// // model/Court.js
// const mongoose = require("mongoose");

// const CourtSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   imageUrl: { type: String },
//   ownerId: { type: String }  // Changed from ObjectId to String
//   // You can also leave it as ObjectId if you later want to reference a User model
// });

// module.exports = mongoose.model("Court", CourtSchema);
const mongoose = require("mongoose");

const courtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  phone: { type: String, required: true }
});

module.exports = mongoose.model("Court", courtSchema);
