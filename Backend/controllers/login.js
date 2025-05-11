const Model = require('../models/authSchema')
const bcrypt = require('bcrypt')
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
        const isMatch = bcrypt.compare(userExists.password);
        if(!isMatch) {
            return res.json({
                success: false,
                message: "incorrect password"
            })
        }
                                        // GENERATE JWT( JSON WEB TOKEN )
        res.json({
            success: true,
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