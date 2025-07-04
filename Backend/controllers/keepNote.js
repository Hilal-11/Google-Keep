const Note = require('../models/NoteSchema');

const keepNote = async (req , res) => {
    const { title , content , color } = req.body;
    if(!title || !content) {
        return res.json({
            success: false,
            message: "Missing note requirements"
        })
    }
    try{
        const response = await Note.create({
            title,
            content,
            color,
        })

        return res.json({
            success: true,
            message: "Successfully create a keep note on DB"
        })

    }catch(error) {
        return res.json({
            success: false,
            message: "Failed to create Note"
        })
    }
}

module.exports = keepNote