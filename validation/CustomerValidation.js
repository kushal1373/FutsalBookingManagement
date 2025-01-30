const joi=require("joi");


const customerSchema=joi.object({
    first_name:joi.string().required(),
    last_name:joi.string().required(),
    email:joi.string().required().email(),
    contact_number:joi.string().required()
})

function CustomerValidation(req,res,next){
    const{first_name,last_name,email,contact_number}=req.body;
    const{error}=customerSchema.validate({first_name,last_name,email,contact_number})
    if(error){
      return  res.json(error)
    }
    next()
}

module.exports=CustomerValidation;