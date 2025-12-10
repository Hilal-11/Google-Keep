import express from 'express';
import connectDB from './src/config/database.js'
import cloudinaryConnect from './src/config/cloudinary.js'
import Redis from 'ioredis';
import auth_routes from './src/routes/authRoutes.js';
import keep_routes from './src/routes/keepNotes.js'
import fileUpload from "express-fileupload"

import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:3000',
        //procuction IP ( URL or IP or Domain )
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
}));


export const redis = new Redis({ host: "localhost", port: 6379 })
redis.on('error', (err) => {
  console.error('Redis error:', err);
});



app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true,              // Required for Cloudinary
    tempFileDir: "/tmp/",            // Temporary folder for uploads
}))
app.use('/api/v1/users' , auth_routes);
app.use('/api/v1/keep' , keep_routes)
app.get('/' , (req , res) => {
    res.send("<h1>Authentication and Autherization for Google keep</h1>")
})


connectDB()
    .then(() => {
        app.listen(PORT , "0.0.0.0", () => {
            console.log(`App is running on PORT:${PORT}`)
        })
    }).catch((error) => {
        console.log(error.message);
    })
cloudinaryConnect()
    .then(() => {
        console.log("Cloudinary is connected successful")
    }).catch((error) => {
        console.log(error.message);
    })