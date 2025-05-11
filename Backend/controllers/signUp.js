const Model = require('../models/authSchema')
const bcrypt = require('bcrypt')
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
        const salt_round = bcrypt.genSalt(20)
        const hash_password = bcrypt.hash(password , salt_round);

        const user = await Model.create({
            username,
            email,
            password: hash_password,
        })

                                    // GENERATE JWT( JSON WEB TOKEN )
        
        return res.json({
            success: true,
            message: "user created successfully"
        })
    }catch(error) {
        console.log(error.message)
        return res.json({
            success: false,
            message: "Failed to sign Up"
        })
    }
}

module.exports = signUp