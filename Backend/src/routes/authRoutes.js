import express from'express';
const router = express.Router()

import signUp from '../controllers/signUp'
import login from '../controllers/login'
import getUser from '../controllers/getUser'

router.post("/signUp" , signUp);
router.post("/login" , login);
router.get("/getUserInfo" , getUser);

module.exports = router