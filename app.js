const express= require("express")
const connectDb=require("./config/db")
const CustomerRouter= require("./routes/CustomerRoute")
const GroundRouter= require("./routes/GroundRoute")
const BookingRouter= require("./routes/BookingRoute")

const app=express();


connectDb();


app.use(express.json());

app.use("/api/customer",CustomerRouter);
app.use("/api/ground",GroundRouter);
app.use("/api/booking",BookingRouter);




const port= 3000;
app.listen(port,()=>{
    console.log('Server running at http://localhost:${port}')
})