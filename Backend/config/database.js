const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connection successfully")
    }catch(error){
        console.log(error.message)
        console.log("Failed to connect with database")
        process.exit(1);
    }
}

module.exports = connectDB;