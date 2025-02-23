const mongoose=require("mongoose")

const bookSchema= new mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"customers"
    },
   
    groundId:{
       type:mongoose.Schema.Types.ObjectId,
        ref:"grounds"
    },
   date:{
        type:String,
        required:true

    },
    day:{
        type:String,
        required:true

    },
    timeFrom:{
        type:String,
        required:true

    },
    timeTo:{
        type:String,
        required:true

    },
    status:{
        type:String,
        required:true

    }
})
const Book= mongoose.model("books", bookSchema);

module.exports=Book;