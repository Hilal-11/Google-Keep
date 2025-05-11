const Model = require('../models/authSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const signUp = async (req , res) => {
    const { username , email , password } = req.body;
    if(!username || !email || !password) {
        return res.json({
            success: false,
            message: "Please fill properly the cradientils"
        })
    }
    try{
        // CHECK EXIST USER
        const userExists = await Model.findOne({ email })
        if(userExists) {
            return res.json({
                success: false,
                message: "User already exists"
            })
        }
        // const salt_round = bcrypt.genSalt(20)
        const hash_password = await bcrypt.hash(password , 10);

        const user = await Model.create({
            username,
            email,
            password: hash_password,
        })

                                    // GENERATE JWT( JSON WEB TOKEN )
        const token = await jwt.sign(
            { userId: user._id , email: user.email},
            process.env.SECRET_KEY,
            { expiresIn: '5d' }
        )

        return res.json({
            success: true,
            token: token,
            message: "user created successfully"
        })
    }catch(error) {
        console.log(error.message)
        return res.json({
            message: error,
            success: false,
            message: "Failed to sign Up"
        })
    }
}

module.exports = signUp