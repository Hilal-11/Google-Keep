import Note from "../models/NoteSchema.js";
import { asyncHandler } from "../utils/async-handler.js";
import ApiError from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import {redis} from "../../main.js"

//          BASIC CRUD FUNCTIONALITY
const createNote = asyncHandler(async (req , res) => {
    const { note_title , note_discription , note_color , note_mediaFile } = req.body;

    try {
        const createNote = await Note.create({
            note_title,
            note_discription,
            note_color,
            note_mediaFile,
        })
        const response = await createNote.save();
        return res.status(200).json( 
            new ApiResponse(
                200,
                "Note create successfully",
                response
            )
        )
    }catch(error) {
        return res.status(400).json(
            new ApiError(
                400,
                "Could't create a note",
                error.message
            )
        )
    }
})

const getNotes = asyncHandler(async (req , res) => {
    try {
        const cachedNotes = await redis.get("cachedAllNotes")
        if(cachedNotes) {
            return res.status(200).json(
                new ApiResponse(
                    200,
                    "Welcome cache hit ---- Note get successfully from cache",
                    JSON.parse(cachedNotes)
                )
            )
        }
        const getAllNotesResponse = await Note.find({});
        //set the cache
        await redis.set("cachedAllNotes" , JSON.stringify(getAllNotesResponse), 'EX', 20);
        console.log("Cache miss");

        return res.status(200).json(
            new ApiResponse(
                200,
                "Note get successfully",
                getAllNotesResponse
            )
        )
    }catch(error) {
        return res.status(400).json(
            new ApiError(
                400,
                "Could't get the notes",
                error.message
            )
        )
    }
})

const updateNote = asyncHandler(async (req , res) => {
    const { note_id } = req.params;
    const { note_title , note_discription , note_color } = req.body;
    try{

        const note = await Note.findById(note_id);
        if(!note) {
            throw new ApiError(
                401,
                "note not found"
            )
        }

        note.note_title = note_title;
        note.note_discription = note_discription;
        note.note_color = note_color;
        
        const updatedNote = await note.save();

        res.status(200).json(
            new ApiResponse(
                200,
                "Note update successfully",
                updatedNote
            )
        )
        
    }catch(error) {
        return res.status(401).json(
            new ApiError(
                401,
                "Could't update the notes",
                error.message
            )
        )
    }
})

const deleteNote = asyncHandler(async (req , res) => {
    const note_id = req.params;

    try{
        if(!note_id) {
            throw new ApiError(
                401,
                "note id is not defined"
            )
        }
        const note = await Note.findById(note_id); // soft delection , i want to add in on bin for one week
        note.isNoteDeleted = true;
        note.deleteAt = Date.now();

        if(!note) {
            throw new ApiError(401, "note not found")
        }

        res.status(200).json(
            new ApiResponse(200, "Note deleted and added to bin successfully", note)
        )
    }catch(error) {
        return res.status(401).json(
            new ApiError(
                401,
                "Could't delete the note",
                error.message
            )
        )
    }
    
})

        // BIN FUNCTIONALITY
        // BIN FUNCTIONALITY

const getBinNotes = asyncHandler(async (req , res) => {
    try {
        const getAllBinNotes = await Note.find({ isNoteDeleted: true });
        return res.status(200).json(
            new ApiResponse(
                200,
                "Bin Note get successfully",
                getAllBinNotes
            )
        )
    }catch(error) {
        return res.status(400).json(
            new ApiError(
                400,
                "Could't get the notes",
                error.message
            )
        )
    }
})

const restoreNoteFromBin = asyncHandler(async (req , res) => {
    const { note_id } = req.params;
    try{
        const note = await Note.findById(note_id);
        if(!note) {
            throw new ApiError(401, "note not found in bin")
        }

        note.isNoteDeleted = false;
        await note.save();

        res.status(200).json(
            new ApiResponse(200, "note restore from bin successfully" , note)
        )
    }catch(error) {
        return res.status(501).json(
            new ApiError(
                401,
                "Could't restore note from the bin",
                error.message
            )
        )
    }
})  

const deleteNotePermanentFromBin = asyncHandler(async (req , res) => {
    const { note_id } = req.params;
    try{
        const note = await Note.findById(note_id);
        if(!note) {
            throw new ApiError(401, "note not found")
        }
        const deleteNotePerminent = await note.deleteOne();

        res.status(200).json(
            new ApiResponse(200 , "note delete perminently" , deleteNotePerminent)
        )
    }catch(error) {
        return res.status(401).json(
            new ApiError(
                401,
                "Could't permanent delete the note",
                error.message
            )
        )
    }
})

const emptyBin = asyncHandler(async (req , res) => {
    try{

        const deleteAllBinNotes = await Note.deleteMany({ isNoteDeleted: true })
         
        return res.status(200).json(
            new ApiResponse(200,  "bin empty successfully", deleteAllBinNotes)
        )

    }catch(error) {
        return res.status(501).json(
            new ApiError(
                401,
                "Could't empty the bin",
                error.message
            )
        )
    }
})


//          ARCHIVE NOTES FUNCTIONALITY
//          ARCHIVE NOTES FUNCTIONALITY


const archiveNote = asyncHandler(async (req , res) => {
    const { note_id } = req.params;
    if(!note_id) {
        throw new ApiError(500, "note id is not defined")
    }
    try{

        const note = await Note.findById(note_id);
        if(!note) {
            return new ApiError(401 , "Note not found")
        }

        note.isArchiveNote = true;
        await note.save();


        res.status(200).json(
            new ApiResponse(200 , "Note archived")
        )
    }catch(error) {
        return res.status(401).json(
            new ApiError(
                401,
                "Could't archive the note",
                error.message
            )
        )
    }
})

const getArchiveNotes = asyncHandler(async (req , res) => {
   try {
        const getArchiveNotes = await Note.find({ isArchiveNote: true });
        return res.status(200).json(
            new ApiResponse(
                200,
                "Archive Note get successfully",
                getArchiveNotes
            )
        )
    }catch(error) {
        return res.status(400).json(
            new ApiError(
                400,
                "Could't get the archive notes",
                error.message
            )
        )
    }
})

const unArchiveNote = asyncHandler(async (req , res) => {
    const { note_id } = req.params;
    if(!note_id) {
        throw new ApiError(500, "note id is not defined")
    }
    try{

        const note = await Note.findById(note_id);
        if(!note) {
            throw new ApiError(401 , "Note not found")
        }

        note.isArchiveNote = false;
        await note.save();


        res.status(200).json(
            new ApiResponse(200 , "Note unarchived")
        )
    }catch(error) {
        return res.status(401).json(
            new ApiError(
                401,
                "Could't unarchive the note",
                error.message
            )
        )
    }
})



export { 
    createNote,
    getNotes,
    updateNote,
    deleteNote,
    getBinNotes,
    restoreNoteFromBin,
    deleteNotePermanentFromBin,
    emptyBin,
    archiveNote,
    getArchiveNotes,
    unArchiveNote
}