const joi=require("joi");


const customerSchema=joi.object({
    firstName:joi.string().required(),
    lastName:joi.string().required(),
    email:joi.string().required().email(),
    PhoneNumber:joi.string().required()
})

function CustomerValidation(req,res,next){
    const{firstName,lastName,email,PhoneNumber}=req.body;
    const{error}=customerSchema.validate({firstName,lastName,email,PhoneNumber})
    if(error){
      return  res.json(error)
    }
    next()
}

module.exports=CustomerValidation;