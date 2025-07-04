const Note = require("../models/NoteSchema")
const getNotes = async (req , res) => {
    try{
        const getNotes = await Note.find({})
        res.json({
            success: true,
            message: "All Notes are fetched"
        })

    }catch(error) {
        console.log(error.message)
        res.json({
            success: false,
            error: error.message,
            message: "Failed to getch the Notes"
        })
    }
}

module.exports = getNotes