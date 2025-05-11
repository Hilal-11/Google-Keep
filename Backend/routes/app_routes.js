const express = require('express');
const router = express.Router()

const signUp = require('../controllers/signUp')
const login = require('../controllers/login')
const getUser = require('../controllers/getUser')

router.post("/SignUp" , signUp);
router.post("/Login" , login);
router.get("/getUserInfo" , getUser);

module.exports = router