const express = require('express');
const keepNote_routes = express.Router()

const getNotes = require('../controllers/getNotes')
const keepNote = require('../controllers/keepNote')
const deleteNote = require('../controllers/deleteNote')
const updateNote = require('../controllers/updateNote')

keepNote_routes.get("/getNotes" , getNotes)
keepNote_routes.post("/keepNote" , keepNote)
keepNote_routes.post("/deleteNote:id", deleteNote)
keepNote_routes.post("/updateNote:id", updateNote)


module.exports = keepNote_routes