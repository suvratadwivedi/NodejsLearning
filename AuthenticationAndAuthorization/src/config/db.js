const mongoose = require('mongoose');

const dbConnect = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb connectivity established");
    }
    catch(err){
        console.log("Could not connect to db due to error "+err);
        process.exit(1);
    }  
}

module.exports = dbConnect;