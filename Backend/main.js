import express from 'express';
import connectDB from './src/config/database'
import app_routes from './src/routes/authRoutes';
import keepNotes_routes from './src/routes/keepNotes'

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
app.use('/api/auth' , app_routes);
app.use('/api/keep' , keepNotes_routes)
app.get('/' , (req , res) => {
    res.send("<h1>Authentication and Autherization for Google keep</h1>")
})

app.listen(PORT , () => {
    console.log(`App is running on PORT:${PORT}`)
})

connectDB();