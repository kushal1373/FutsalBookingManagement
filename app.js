// const express= require("express")
// const connectDb=require("./config/db")
// const DashboardRouter= require("./routes/DashboardRoute");
// const CustomerRouter= require("./routes/CustomerRoute")
// const GroundRouter= require("./routes/GroundRoute")
// const BookingRouter= require("./routes/BookingRoute")
// const AuthRouter= require("./routes/AuthRoute")
// const OwnerRoute= require('./routes/OwnerRoute');
// const path = require('path');
// const cors = require("cors");

// const app=express();


// connectDb();


// app.use(express.json());

// app.use("/api/customer",CustomerRouter);
// app.use("/api/ground",GroundRouter);
// app.use("/api/booking",BookingRouter);
// app.use("/api/dashboard", DashboardRouter);
// app.use('/api/owner', OwnerRoute);
// app.use("/api/auth",AuthRouter);

// // Serve images from public/images
// app.use("/images", express.static(path.join(__dirname, "public/images")));



// const port= 3000;
// app.listen(port,()=>{
//     console.log(`Server running at http://localhost:${port}`);
// })

const express = require("express");
const cors = require("cors"); // Import cors
const path = require("path");
const connectDb = require("./config/db");

// ... other route imports
const AuthRoute = require("./routes/AuthRoute");
const BookingRoute = require("./routes/BookingRoute");
const CustomerRoute = require("./routes/CustomerRoute");
const DashboardRoute = require("./routes/DashboardRoute");
const GroundRoute = require("./routes/GroundRoute");
// const OwnerRoute = require("./routes/OwnerRoute");
const CourtRoute = require("./routes/CourtRoute");

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectDb();

// Enable CORS for all requests
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static images
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Mount routes
app.use("/api/auth", AuthRoute);
app.use("/api/booking", BookingRoute);
// app.use("/api/booking", require("./routes/BookingRoute"));
app.use("/api/customer", CustomerRoute);
app.use("/api/dashboard", DashboardRoute);
app.use("/api/ground", GroundRoute);
// app.use("/api/owner", OwnerRoute);
app.use("/api/courts", CourtRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
