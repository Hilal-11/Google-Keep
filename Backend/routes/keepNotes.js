const express = require('express');
const keepNote_routes = express.Router()

const keepNote = require('../controllers/keepNote')

keepNote_routes.post("/keepNote" , keepNote)

module.exports = keepNote_routes