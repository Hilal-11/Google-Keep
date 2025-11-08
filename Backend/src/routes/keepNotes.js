import express from 'express';
const router = express.Router()
import { createNoteValidator , updateNoteValidator } from '../validation/keepValidation'
import { 
    createNote,
    getNotes,
    updateNote,
    deleteNote,
    searchNote,
    getBinNotes,
    restoreNoteFromBin,
    deleteNotePermanentFromBin,
    emptyBin,
    archiveNote,
    getArchiveNotes,
    unArchiveNote }
 from "../controllers/keep.controllers"
import validator from '../middlewares/validate';


router.route("/create-note").post(createNoteValidator(), validator, createNote);
router.route("/get-notes").get(getNotes);
router.route("/update-note/:id").patch(updateNoteValidator() , validator, updateNote);
router.route("/delete-note/:id").delete(deleteNote);
router.route("/search-note").get(searchNote);
router.route("/get-bin-notes").get(getBinNotes);
router.route("/restore-note-from-bin/:id").post(restoreNoteFromBin);
router.route("/delete-note-permanent/:id").delete(deleteNotePermanentFromBin)
router.route("/empty-bin").post(emptyBin);
router.route("/archive-note/:id").post(archiveNote)
router.route("/get-archive-notes").get(getArchiveNotes);
router.route("/unarchive-note/:id").post(unArchiveNote)

export default router