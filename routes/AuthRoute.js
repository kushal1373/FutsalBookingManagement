const express = require("express");
const router = express.Router();
const { login, register, dashboard} = require("../controller/AuthController");
const{authenticateToken}=require("../security/Auth");



router.post("/login", login);
router.post("/register", register);

router.get("/dashboard", authenticateToken, dashboard);






module.exports = router;