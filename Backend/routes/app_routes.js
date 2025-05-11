const express = require('express');
const router = express.Router()

const signUp = require('../controllers/signUp')
const login = require('../controllers/login')
const getUser = require('../controllers/getUser')
const keepNote = require('../controllers/keepNote')

router.post("/signUp" , signUp);
router.post("/login" , login);
router.get("/getUserInfo" , getUser);
router.post("/keepNote" , keepNote)

module.exports = router