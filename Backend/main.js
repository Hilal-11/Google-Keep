
const express = require('express');
const connectDB = require('./config')
const app_routes = require('./routes')
const cors = require('')
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json())