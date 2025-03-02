const jwt=require("jsonwebtoken")
const SECRET_KEY="7b10cd1acd4fffea63c3e04acd8fd40f98299df8bcda8ae53a19aa88f4f4f8ae"

function authenticateToken(req,res,next){
    const token =req.header("Authorization")?.split(" ")[1];
    if(!token){
        return res.status(401).send("Access Denied: No token provided")
    }

    try{
    const verified= jwt.verify(token,SECRET_KEY)
    req.user=verified;
    next()
    }catch (e){
        res.status(400).send("Invalid token")
    }
}

// function authorizeRole(role){
//     return(req,res,next)=>{
//         if(req.user.role!==role){
//             return res.status(403).send("Access Denied: Insufficient Permissions")
//         }

//         next();
//     }
// }



// module.exports={authenticateToken,authorizeRole}
module.exports={authenticateToken}