const mongoose=require("mongoose")

const customerSchema= new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact_number:{
        type:String,
        required:true

    }
})
const Customer= mongoose.model("customers", customerSchema);

module.exports=Customer;