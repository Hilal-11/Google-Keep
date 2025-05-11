const mongoose = require('mongoose');


const NoteSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: '#ffffff'
    },
})

module.exports = mongoose.model('Note' , NoteSchema);
