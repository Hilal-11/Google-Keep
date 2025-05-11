const Model = require('../models/authSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req , res) => {
    const { email , password } = req.body;
    if(!email || !password) {
        return res.json({
            success: true,
            message: "form details missing"
        })
    }
    try {
        // CHECK IF USER EXISTS
        const userExists = await Model.findOne({ email })
        if(!userExists) {
            return res.json( {
                success: false,
                message: "incorrect email and password"
            })
        }

        //  IF USER EXISTS THEN 
        const isMatch = await bcrypt.compare(password , userExists.password);
        if(!isMatch) {
            return res.json({
                success: false,
                message: "incorrect password"
            })
        }
                    // GENERATE JWT( JSON WEB TOKEN )
        const token = await jwt.sign(
            {
                userId: userExists._id ,
                email: userExists.email,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '5d'
            }
        )
        res.json({
            success: true,
            token: token,
            message: "Login successfully"
        })
    }catch(error) {
        return res.json({
            success: false,
            message: "Failed to login, incorrect emial and password"
        })
    }
}

module.exports = login