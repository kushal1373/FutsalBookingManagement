// // login ra registration ko api aauxa esma chai

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const SECRET_KEY = "7b10cd1acd4fffea63c3e04acd8fd40f98299df8bcda8ae53a19aa88f4f4f8ae"
// const Credential = require("../model/Credential")




// const register = async (req, res) => {
//     console.log("Register endpoint called. Request body:",req.body);
//     const { username, password} = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const cred = new Credential({ username, password: hashedPassword })
//     cred.save();
//     console.log("User registered successfully:",cred);
//     res.status(201).send(cred);
// };


// const login = async (req, res) => {
//     const { username, password} = req.body;
//     const cred = await Credential.findOne({ username });
//     if (!cred || !(await bcrypt.compare(password, cred.password))) {
//         return res.status(403).send('Invalid username or password');

//     }

//     const token = jwt.sign({ username: cred.username},
//         SECRET_KEY,
//         { expiresIn: '1h' });
//     res.json({ token });
// };

// const dashboard= async(req,res)=> {
//     res.json({
//         message: "Dashboard data Fetched successfully",
//         stats:{
//             totalUsers:100,
//             totalBookings:25,
//         },
//     });
// };

// module.exports = {
//     login,
//     register,
//     dashboard,

// };


// authcontroller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Credential = require("../model/Credential");

const SECRET_KEY = "7b10cd1acd4fffea63c3e04acd8fd40f98299df8bcda8ae53a19aa88f4f4f8ae";

const register = async (req, res) => {
  try {
    console.log("Register endpoint called. Request body:", req.body);
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }
    // Check if the username already exists
    const existingUser = await Credential.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const cred = new Credential({ username, password: hashedPassword });
    await cred.save();
    console.log("User registered successfully:", cred);
    res.status(201).json({ message: "User registered successfully", user: cred });
  } catch (error) {
    console.error("Error in register endpoint:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const login = async (req, res) => {
    const { username, password } = req.body;
    const cred = await Credential.findOne({ username });
    console.log("Login attempt for:", username);
    if (!cred) {
      console.log("User not found for:",username);
      return res.status(403).json('Invalid username or password');
    }
    console.log("Stored hash:", cred.password);
    console.log("Entered password:", password);
    const passwordMatches = await bcrypt.compare(password.trim(), cred.password);
    if (!passwordMatches) {
      console.log("Password does not match for:", username);
      return res.status(403).json('Invalid username or password');
    }
    const token = jwt.sign({ username: cred.username }, SECRET_KEY, { expiresIn: '1d' });
    res.json({ token });
  };
  

const dashboard = async (req, res) => {
  try {
    res.json({
      message: "Dashboard data fetched successfully",
      stats: {
        totalUsers: 100,
        totalBookings: 25,
      },
    });
  } catch (error) {
    console.error("Error in dashboard endpoint:", error);
    res.status(500).json({ error: "Invalid username and password" });
  }
  const token = jwt.sign({username: cred.username}, SECRET_KEY, {expiresIn: '1d'});
  res.json({token});
};

module.exports = {
  register,
  login,
  dashboard,
};
