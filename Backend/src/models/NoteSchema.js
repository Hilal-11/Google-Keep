import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    note_title: { type: String, trim: true, required: true},
    note_discription: { type: String , trim: true , required: true},
    note_color: { type: String , default: "#ffffff", trim: true},
    note_mediaFile: { type: [String] , default: [] },
    deleteAt: { type: Date , default: null},
    isNoteDeleted: { type: Boolean , default: false },
    isArchiveNote: { type: Boolean , default: false },
    isPinnedNote: { type: Boolean , default: false }
}, { timestamps: true} )

export default Note = mongoose.model("Note" , NoteSchema)