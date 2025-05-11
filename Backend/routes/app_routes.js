const express = require('express');
const router = express.Router()

const signUp = require('../controllers/signUp')
const login = require('../controllers/login')
const getUser = require('../controllers/getUser')

router.post("/signUp" , signUp);
router.post("/login" , login);
router.get("/getUserInfo" , getUser);

module.exports = router