require('dotenv').config();
const express = require('express');
const app = express();
const dbConnect = require('./config/db');
const authController = require('./controllers/authController');
const auth = require('./middleware/auth');
const authorize = require('./middleware/authorize');

const PORT = 3000;

dbConnect();
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Hello World!");
})

app.post('/register', authController.register);
app.post('/login', authController.login);
app.get('/protected',auth,authorize("user","admin"),(req,res)=>{
     res.json({message: "Protected route", "user":req.user});
})


app.get('/admin', auth,authorize("admin"),(req,res) =>{
    res.json({message: "This is an admin only route", user: req.user});
})
app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`);
})