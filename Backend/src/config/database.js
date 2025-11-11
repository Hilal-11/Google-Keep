import mongoose from 'mongoose'
import dotenv from 'dotenv'
import logger from "../logger/winston.logger.js"
dotenv.config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        logger.info("Database connection successfully")
    }catch(error){
        logger.error("Database connection failed", { error: error.message })
        process.exit(1);
    }
    mongoose.connection.on("connected" , () => {
        logger.info("MongoDB connected")
    })
    mongoose.connection.on("error", (error) => {
        logger.error("MongoDB connection error", { error: error.message })
    })
    mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected');
    });

    process.on("SIGINT" , async () => {
        await mongoose.connection.close();
        logger.info('MongoDB connection closed due to app termination');
        process.exit(0);
    })

}


export default connectDB