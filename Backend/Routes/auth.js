const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const router = express.Router()
const User = require("../Models/User")

router.post("/register",async (req,res)=>{
    const {username, password} = req.body;
    const hashed = await bcrypt.hash(password,10);

    try {
      const user = await User.create({username,password:hashed})
      res.json({message:'User created',user})
    } catch (error) {
        res.status(400).json({error:"User already exists"})
    }
})

router.post("/login",async (req,res)=>
{
    const {username,password} = req.body;

    const user = await User.findOne({username})

    if(!user || !(await bcrypt.compare(password,user.password)))
    {
        return res.status(401).json({error:"Invalid credentials"})
    }
    const token = jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET)
    res.json({token});
})

module.exports = router