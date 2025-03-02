// const mongoose=require("mongoose")

// const bookSchema= new mongoose.Schema({
//     customerId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"customers"
//     },
   
//     groundId:{
//        type:mongoose.Schema.Types.ObjectId,
//         ref:"grounds"
//     },
//    date:{
//         type:String,
//         required:true

//     },
//     day:{
//         type:String,
//         required:true

//     },
//     timeFrom:{
//         type:String,
//         required:true

//     },
//     timeTo:{
//         type:String,
//         required:true

//     },
//     status:{
//         type:String,
//         required:true

//     }
// })
// const Book= mongoose.model("books", bookSchema);

// module.exports=Book;

// model/Booking.js (adjusted to match the frontend)
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  courtName: { type: String, required: true },
  dateTime: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  userId: { type: String }, // or ObjectId if referencing a User model
  status: { type: String, default: "PENDING" },
});

const Book = mongoose.model("books", bookSchema);
module.exports = Book;
