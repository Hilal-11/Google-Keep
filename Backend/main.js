import express from 'express';
import connectDB from './src/config/database.js'
import cloudinaryConnect from './src/config/cloudinary.js'

import auth_routes from './src/routes/authRoutes.js';
import keep_routes from './src/routes/keepNotes.js'
import fileUpload from "express-fileupload"

import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT;
const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        //procuction IP ( URL )
    ],
    credentials: true,
}));

app.use(express.json())
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
        app.listen(PORT , () => {
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