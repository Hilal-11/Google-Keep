
const express = require('express');
const connectDB = require('./config')
const app_routes = require('./routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));
app.use(cookieParser())
app.use('api/auth' , app_routes);
app.get('/' , (req , res) => {
    res.send("<h1>Authentication and Autherization for Google keep</h1>")
})

app.listen(PORT , () => {
    console.log(`App is running on PORT:${PORT}`)
})


connectDB();


