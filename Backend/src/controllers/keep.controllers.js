import Note from "../models/NoteSchema";
import { asyncHandler } from "../utils/async-handler";
import ApiError from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";


//          BASIC CRUD FUNCTIONALITY
const createNote = asyncHandler(async (req , res) => {
    
})

const getNotes = asyncHandler(async (req , res) => {

})

const updateNote = asyncHandler(async (req , res) => {

})

const deleteNote = asyncHandler(async (req , res) => {

})

const serachNote = asyncHandler(async (req , res) => {

})


        // BIN FUNCTIONALITY
        // BIN FUNCTIONALITY

const getBinNotes = asyncHandler(async (req , res) => {

})

const restoreNoteFromBin = asyncHandler(async (req , res) => {

})

const deleteNotePermenentFromBin = asyncHandler(async (req , res) => {

})

const emptyBin = asyncHandler(async (req , res) => {

})


//          ARCHIVE NOTES FUNCTIONALITY
//          ARCHIVE NOTES FUNCTIONALITY


const archiveNote = asyncHandler(async (req , res) => {

})
const getArchiveNotes = asyncHandler(async (req , res) => {

})

const unArchiveNote = asyncHandler(async (req , res) => {

})



export default { 
    createNote,
    getNotes,
    updateNote,
    deleteNote,
    serachNote,
    getBinNotes,
    restoreNoteFromBin,
    deleteNotePermenentFromBin,
    emptyBin,
    archiveNote,
    getArchiveNotes,
    unArchiveNote
}