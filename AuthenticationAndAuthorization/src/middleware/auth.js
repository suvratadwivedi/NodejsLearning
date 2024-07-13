
const jwt = require('jsonwebtoken');
const auth = (req,res,next) =>{
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({error: "No token: Access denied"});
    }

    try{
        const decoded =  jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log("Decoded ",decoded);
        req.user = decoded.user;
        next();
    }
    catch(err){
        console.log(err.message);
        res.status(401).json({error: "Invalid token"});
    }
}

module.exports = auth;