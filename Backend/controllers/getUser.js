const Model = require('../models/authSchema');

const getUser = async (req , res) => {
    const { userId } = req.body;
    try {
        const user = await Model.findById({ userId });
        if(!user) {
            return res.json( {
                success: false,
                message: "User not found"
            }) 
        }
        res.json({
            userData: {
                username: user.username,
                email: user.email
            },
            success: true,
            message: "user info get successfully"
        }) 
    }catch(error) {
        return res.json({
            success: false,
            message: "Failed to get the user info"
        })
    }
}
module.exports = getUser