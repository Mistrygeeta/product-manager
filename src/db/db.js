const mongoose = require("mongoose");
require ("dotenv").config()

function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("DB is connected")
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports = connectDB;
