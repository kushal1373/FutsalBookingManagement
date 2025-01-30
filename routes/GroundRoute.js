const express=require("express");
const router=express.Router();
const { findAll, save, findById, deleteById, update} = require("../controller/GroundController");

const multer=require("multer")
const storage= multer.diskStorage({
   destination : function(req,res,cb){
    cb(null,'ground_images')
   },
   filename:function(req,file,cb){
    cb(null,file.originalname)
   }
})
const upload=multer({storage })

router.get("/", findAll);
router.post("/",upload.single('file'),save);
router.get("/:id", findById)
router.delete("/:id", deleteById)
router.put("/:id", update)





module.exports=router;