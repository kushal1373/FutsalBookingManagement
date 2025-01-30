// login ra registration ko api aauxa esma chai

const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const SECRET_KEY="7b10cd1acd4fffea63c3e04acd8fd40f98299df8bcda8ae53a19aa88f4f4f8ae"
const Credential=require("../model/Credential")




const register=async (req,res)=>{
    const {username, password, role}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);
    const cred= new Credential({username, password:hashedPassword,role})
    cred.save();
    res.status(201).send(cred);
};


const login=async(req,res)=>{
    const{username, password}= req.body;
    const cred = await Credential.findOne({username});
    if(!cred || !(await bcrypt.compare(password, cred.password))){
        return res.status(403).send('Invalid username or password');

    }

    const token = jwt.sign({username: cred.username, role: cred.role},
         SECRET_KEY,
         {expiresIn: '1h'});
    res.json({token});
};

module.exports={
    login,
    register
}