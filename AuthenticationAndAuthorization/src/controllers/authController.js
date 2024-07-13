const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async(req,res) =>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({error: "Passwords do not match"});
        }
        const payload = {
            user :{
                id: user.id,
                role: user.role
            }
        };

        const token = jwt.sign(payload,process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
        res.json(token);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({error: "Server error"});
    }
   
}
const register = async (req,res)=>{
     const {username,email,password}  = req.body;
     try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({error: "User already exists"});
        }
        user = new User({
            username,
            email,
            password
        });
        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();

        res.status(201).json({message: "User registered successfully"});
     }
     catch(err){
        console.log(err.message);
        res.status(500).json({error:"Server Error"});
     }
}

module.exports = {register,login};