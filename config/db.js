const mongoose= require("mongoose");

const connectDB=async()=>{

    try{
        await mongoose.connect("mongodb://localhost:27017/db_futsal_management_system");
        console.log("MongoDb Connected")
    }catch(e){
        console.log("MongoDb not Connected");

    }
}

module.exports=connectDB;