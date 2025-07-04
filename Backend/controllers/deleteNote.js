const Note = require('../models/NoteSchema')
const deleteNote = async (req , res) => {
    try{
        const { id } = req.params;
        const deleteNote = await Note.findByIdAndDelete(id)

        res.json({
            success: true,
            message: "Note deleted successfully"
        })

    }catch(error){
        console.log(error.message);
        res.status({
            success: false,
            error: error.message,
            message: `could't delete the note of ${id}`
        })
    }
}

module.exports = deleteNote